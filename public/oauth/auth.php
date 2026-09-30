<?php
/**
 * GitHub login for the blog editor (Decap CMS) on plain cPanel hosting.
 *
 * Decap opens this page in a popup. It sends the editor to GitHub to sign in,
 * receives GitHub's one-time code back here, swaps it for an access token,
 * and hands the token to the editor window. Nothing is stored on the server.
 *
 * Setup (once):
 *  1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
 *       Homepage URL:               https://dralokaseyecare.com
 *       Authorization callback URL: https://dralokaseyecare.com/oauth/auth.php
 *  2. Create the file  decap-oauth-config.php  in the hosting account's HOME folder
 *     (one level ABOVE public_html, so it can never be downloaded):
 *
 *       <?php return [
 *         'client_id'     => 'xxxxxxxxxxxxxxxxxxxx',
 *         'client_secret' => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
 *         'site_origin'   => 'https://dralokaseyecare.com',
 *       ];
 *
 *     (Environment variables GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET / SITE_ORIGIN also work.)
 */

declare(strict_types=1);

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

$config = [];
foreach ([dirname(__DIR__, 2) . '/decap-oauth-config.php', dirname(__DIR__) . '/../decap-oauth-config.php'] as $file) {
    if (is_readable($file)) {
        $config = require $file;
        break;
    }
}
$clientId     = getenv('GITHUB_CLIENT_ID') ?: ($config['client_id'] ?? '');
$clientSecret = getenv('GITHUB_CLIENT_SECRET') ?: ($config['client_secret'] ?? '');
$origin       = getenv('SITE_ORIGIN') ?: ($config['site_origin'] ?? 'https://dralokaseyecare.com');

/** Tell the editor window how it went, then close. Only the site's own origin may receive it. */
function reply(string $status, array $content, string $origin): never
{
    $message = json_encode('authorization:github:' . $status . ':' . json_encode($content), JSON_UNESCAPED_SLASHES);
    $target  = json_encode($origin, JSON_UNESCAPED_SLASHES);
    header('Content-Type: text/html; charset=utf-8');
    echo <<<HTML
<!doctype html><meta charset="utf-8"><title>Signing in…</title>
<p style="font:16px system-ui;padding:2rem">Signing you in to the blog editor…</p>
<script>
(function () {
  var target = {$target};
  function receive(e) {
    if (e.origin !== target) return;
    window.opener.postMessage({$message}, target);
    window.removeEventListener('message', receive, false);
    setTimeout(function () { window.close(); }, 300);
  }
  window.addEventListener('message', receive, false);
  window.opener && window.opener.postMessage('authorizing:github', target);
})();
</script>
HTML;
    exit;
}

if ($clientId === '' || $clientSecret === '') {
    http_response_code(500);
    reply('error', ['message' => 'The blog editor login is not set up yet (missing GitHub OAuth app details).'], $origin);
}

session_set_cookie_params(['secure' => true, 'httponly' => true, 'samesite' => 'Lax']);
session_start();

$self = $origin . '/oauth/auth.php';

// Step 1: send the editor to GitHub.
if (!isset($_GET['code'])) {
    $_SESSION['decap_state'] = bin2hex(random_bytes(16));
    $query = http_build_query([
        'client_id'    => $clientId,
        'redirect_uri' => $self,
        'scope'        => 'repo,user',
        'state'        => $_SESSION['decap_state'],
    ]);
    header('Location: https://github.com/login/oauth/authorize?' . $query, true, 302);
    exit;
}

// Step 2: GitHub sent us back with a code. Check it's our own request, then swap the code for a token.
$state = (string)($_GET['state'] ?? '');
if ($state === '' || !hash_equals((string)($_SESSION['decap_state'] ?? ''), $state)) {
    reply('error', ['message' => 'The sign-in link expired. Please try again.'], $origin);
}
unset($_SESSION['decap_state']);

$ch = curl_init('https://github.com/login/oauth/access_token');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_HTTPHEADER     => ['Accept: application/json', 'User-Agent: dralokaseyecare-decap-oauth'],
    CURLOPT_POSTFIELDS     => http_build_query([
        'client_id'     => $clientId,
        'client_secret' => $clientSecret,
        'code'          => (string)$_GET['code'],
        'redirect_uri'  => $self,
    ]),
]);
$response = curl_exec($ch);
$error    = curl_error($ch);
curl_close($ch);

$data = is_string($response) ? json_decode($response, true) : null;
if (!is_array($data) || empty($data['access_token'])) {
    reply('error', ['message' => 'GitHub did not accept the sign-in. ' . ($data['error_description'] ?? $error)], $origin);
}

reply('success', ['token' => $data['access_token'], 'provider' => 'github'], $origin);
