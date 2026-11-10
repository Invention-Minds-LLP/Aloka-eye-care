// Shared by the design-option pages: a simple before/after photo slider.
(function () {
  var base = '../images/gallery/surgical-outcomes/';
  var photos = [
    ['01', 'Before and after squint correction in an adult'],
    ['06', 'Before and after squint correction'],
    ['07', 'Before and after squint correction'],
    ['08', 'Before and after squint correction'],
    ['09', 'Before and after squint correction'],
    ['10', 'Before and after squint correction'],
    ['04', 'Head posture in nystagmus, before and after surgery'],
    ['03', 'A child’s squint before glasses, and the eyes straight with glasses on'],
  ];
  document.querySelectorAll('[data-slider]').forEach(function (root) {
    var img = root.querySelector('[data-img]');
    var cap = root.querySelector('[data-cap]');
    var count = root.querySelector('[data-count]');
    var dots = root.parentElement.querySelector('[data-dots]');
    var i = 0, touched = false;
    function show(n) {
      i = (n + photos.length) % photos.length;
      img.src = base + photos[i][0] + '.webp';
      img.alt = photos[i][1];
      if (cap) cap.textContent = photos[i][1];
      if (count) count.textContent = i + 1 + ' / ' + photos.length;
      if (dots) [].forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === i); });
    }
    if (dots) photos.forEach(function (_, k) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Show result ' + (k + 1));
      b.onclick = function () { touched = true; show(k); };
      dots.appendChild(b);
    });
    root.querySelector('[data-prev]').onclick = function () { touched = true; show(i - 1); };
    root.querySelector('[data-next]').onclick = function () { touched = true; show(i + 1); };
    show(0);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
      setInterval(function () { if (!touched && !document.hidden) show(i + 1); }, 4500);
  });
})();
