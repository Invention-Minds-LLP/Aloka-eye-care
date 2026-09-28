// All facts below come from dralokaseyecare.com (Home, About, Services,
// Surgeries, FAQ). Keep them in sync with the clinic; never embellish.

export const CLINIC = {
  name: "Dr. Aloka's Eye Care",
  doctor: 'Dr. Aloka Hedau',
  phoneDisplay: '+91 74164 27503',
  phoneHref: 'tel:+917416427503',
  whatsappHref:
    'https://wa.me/917416427503?text=' +
    encodeURIComponent("Hello Dr. Aloka's Eye Care, I'd like to book an appointment for my child."),
  email: 'dralokaseyecare@gmail.com',
  bookingHref: 'https://appointmentpluginprod.azurewebsites.net/Appointment/0ZGZEJP2/1',
  address: [
    'Third Floor, Plot no 6, Survey No 1009',
    '9th Phase Road, near Forum Srujana Mall',
    'KPHB Phase 6, Kukatpally',
    'Hyderabad 500085',
  ],
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Dr+Aloka%27s+Eye+Care+KPHB+Phase+6+Kukatpally+Hyderabad',
  mapsEmbed:
    'https://www.google.com/maps?q=Dr+Aloka%27s+Eye+Care,+KPHB+Phase+6,+Kukatpally,+Hyderabad+500085&output=embed',
  legacySite: 'https://dralokaseyecare.com',
} as const;

/** Mon–Sat 10:00–17:00, Sunday closed. Index matches Date#getDay(). */
export const HOURS = [
  { day: 'Sun', open: false },
  { day: 'Mon', open: true },
  { day: 'Tue', open: true },
  { day: 'Wed', open: true },
  { day: 'Thu', open: true },
  { day: 'Fri', open: true },
  { day: 'Sat', open: true },
] as const;

export const SIGNS = [
  { title: 'One eye wanders', body: 'In photographs, or when your child is tired, one eye turns in, out, up or down.' },
  { title: 'Squeezing and watering', body: 'Frequent eye squeezing or watering can point to a refractive error.' },
  { title: 'A tilted head', body: 'Tilting or turning the head to read or watch is the body working around the eyes.' },
  { title: 'Double vision in adults', body: 'Seeing two of everything, headaches and strain while reading.' },
] as const;

export const TIMELINE = [
  { year: '2005', text: 'MBBS, Pune' },
  { year: '2007–09', text: 'Post-graduation in Ophthalmology, Aravind Eye Hospital, Madurai' },
  { year: '2010', text: 'FICO, conferred by the International Council of Ophthalmology' },
  { year: '2010–11', text: 'Fellowship in Paediatric Ophthalmology and Adult Squint, Aravind' },
  { year: '2012', text: 'Chief Paediatric Ophthalmologist in Hyderabad: Care Hospitals, Vasan Eye Care, Win Vision' },
  { year: '2015', text: 'Special training in Nystagmus Surgery with Dr. Richard Hertle' },
] as const;

export const THERAPY = [
  {
    title: 'Vision therapy',
    body: 'Fusion work with ocular flippers and fusion cards, plus Bynocs binocular software. Sessions take 30–45 minutes; 10–15 are usually enough.',
  },
  {
    title: 'Orthoptic & binocularity assessment',
    body: 'Titmus Fly, Worth 4 Dot, convergence and motility testing for headaches, strain and reading trouble.',
  },
  { title: 'Paediatric eye evaluation', body: 'Children from six months are tested with the Optokinetic Drum and Lea picture charts.' },
  { title: 'Retinopathy of prematurity', body: 'Screening for babies born before 34 weeks or under 1750 g, by four weeks of age.' },
  { title: 'Myopia clinic', body: 'Refraction and axial-length tracking, lifestyle advice and medication where it helps.' },
  { title: 'Low vision & CVI', body: 'Magnifiers, CCTV, telescopes and vision-stimulation work for cortical visual impairment.' },
] as const;

export const SURGERY = [
  { title: 'Squint surgery for children', body: 'Ideally before age 8, while binocular vision is still developing. Safe anaesthesia, pain-free.' },
  { title: 'Squint surgery for adults', body: 'Sutureless, micro-incision and adjustable-suture techniques, including paralytic squint, Duane’s and Brown’s syndrome.' },
  { title: 'Paediatric cataract', body: 'Phacoemulsification with intraocular lens, done promptly to protect developing vision.' },
  { title: 'Nystagmus surgery', body: 'Eases the head posture children adopt to see, reducing strain and neck discomfort.' },
  { title: 'Also', body: 'Botox for paralytic squint · ptosis correction · probing & syringing · chalazion · pterygium.' },
] as const;

export const ANSWERS = [
  { q: 'Will it hurt?', a: 'Surgery is done under local or general anaesthesia and is not painful at all.' },
  { q: 'Will there be scars?', a: 'Minimal-incision, fornix-based absorbable sutures leave no external scarring.' },
  { q: 'Isn’t it only cosmetic?', a: 'No. It restores binocularity, depth perception and visual acuity, and helps reverse lazy eye.' },
  { q: 'I’m 40. Is it too late?', a: 'Age is no bar. Before 8 is ideal for vision; at any age alignment can be corrected.' },
] as const;

export const FIGURES = [
  { value: '350K+', label: 'happy patients' },
  { value: '20K+', label: 'paediatric & adult squint surgeries' },
  { value: '10,000+', label: 'paediatric cataract surgeries' },
  { value: '20K+', label: 'vision therapies' },
] as const;

export const VOICES = [
  { quote: 'My entire family consults Dr. Aloka, which includes my kids, mother and mother-in-law.', name: 'Priyanka Malhotra' },
  { quote: 'Dr. Aloka Ma’am is very kind and helpful. She listens to the parents with all the empathy.', name: 'Pratiksha Tripathi' },
  { quote: 'Dr. Aloka is very approachable and patient with the kids.', name: 'Prashant Saddi' },
] as const;

/** Telugu lines. Wording to be confirmed by the clinic before launch. */
export const TELUGU = {
  welcome: 'మీ పిల్లల చూపు, మా బాధ్యత',
  welcomeEn: "Your child's sight is our responsibility",
  squint: 'మెల్ల కన్ను',
  myth: 'మెల్ల కన్ను అదృష్టం కాదు, చికిత్స చేయాలి',
  mythEn: 'A squint is not luck. It needs treatment.',
} as const;

export const SPECIALITIES = {
  children: [
    'Paediatric eye check-ups from six months of age',
    'Squint (crossed eyes): therapy and surgery',
    'Lazy eye and vision therapy (Bynocs)',
    'Retinopathy of prematurity screening',
    'Paediatric cataract surgery',
    'Myopia control',
    'Cortical visual impairment and low vision',
    'Droopy eyelid (ptosis) and blocked tear ducts',
  ],
  adults: [
    'Adult squint correction, cosmetic and paralytic',
    'Nystagmus surgery',
    'Double vision, eye strain and reading trouble',
    'Botox for paralytic squint',
    'Chalazion and pterygium surgery',
  ],
} as const;

/** Written for how Hyderabad families decide: together, by trust, by word of mouth. */
export const TRUST = [
  {
    title: 'Trained at Aravind, Madurai',
    body: 'Post-graduation and fellowship at Aravind Eye Hospital, Madurai; FICO (UK); nystagmus surgery training with Dr. Richard Hertle.',
  },
  {
    title: 'Names you already trust',
    body: 'Affiliated with Rainbow Hospitals, Apollo Cradle, Little Star Children’s Hospital and Win Vision Eye Hospitals.',
  },
  {
    title: 'Therapy first, surgery only when it’s right',
    body: 'Non-surgical care for squint comes first where it can work: vision therapy and orthoptic exercises. Surgery is advised when it is needed.',
  },
  {
    title: 'No pain, no visible scar',
    body: 'Squint surgery is done under anaesthesia with absorbable sutures that leave no external scarring.',
  },
  {
    title: 'Bring the whole family',
    body: 'Grandparents’ questions are welcome. As one parent wrote: “My entire family consults Dr. Aloka, which includes my kids, mother and mother-in-law.”',
  },
  {
    title: 'Open six days, easy to find',
    body: 'Monday to Saturday, 10 am to 5 pm, in KPHB Phase 6 near Forum Srujana Mall. Call or WhatsApp before you come.',
  },
] as const;
