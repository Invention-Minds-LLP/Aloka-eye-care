// Content for the About, Services and Surgeries pages, from the clinic's current site
// (dralokaseyecare.com/about-us, /services, /surgeries). Keep in sync with the clinic; never embellish.

export const SOCIAL = {
  facebook: 'https://www.facebook.com/aloka.hedau.9',
  instagram: 'https://www.instagram.com/dralokahedau/',
  youtube: 'https://www.youtube.com/channel/UC10KBSvf9x6KtNIIPz8ynLg',
} as const;

export const JOURNEY = [
  { year: '2005', title: 'MBBS, Pune', body: 'Medical degree, and the start of a life in medicine.' },
  {
    year: '2007–09',
    title: 'Ophthalmology at Aravind Eye Hospital, Madurai',
    body: 'Post-graduate training across cataract surgery, neuro-ophthalmology, cornea, refractive services, glaucoma and retina.',
  },
  { year: 'Aravind years', title: 'Over 100 eye camps', body: 'Eye camps in rural Tamil Nadu, taking care to families who could not reach a hospital.' },
  { year: '2010', title: 'FICO', body: 'Conferred by the International Council of Ophthalmology.' },
  {
    year: '2010–11',
    title: 'Fellowship: paediatric ophthalmology & adult squint',
    body: 'Complex squint and nystagmus surgery, low vision rehabilitation and paediatric cataract surgery.',
  },
  {
    year: 'Since 2012',
    title: 'Chief Paediatric Ophthalmologist in Hyderabad',
    body: 'At Care Hospitals, Vasan Eye Care and Win Vision Eye Hospitals, known for a friendly, approachable way with children and parents alike.',
  },
  { year: '2015', title: 'Nystagmus surgery training', body: 'Special training with Dr. Richard Hertle.' },
] as const;

export const AFFILIATIONS = ['Rainbow Hospitals', 'Little Star Children’s Hospital', 'Apollo Cradle', 'Win Vision Eye Hospitals'] as const;

export interface ServiceItem {
  id: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  points: string[];
  note?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'myopia-clinic',
    title: 'Myopia Clinic',
    lead: 'Myopia (short-sightedness) that keeps getting worse can thin and damage the retina. The myopia clinic tracks it and works to slow it.',
    image: 'images/blog/myopia-or-short-sightedness-in-children-4.webp',
    imageAlt: 'A pair of glasses bringing a blurred garden into focus',
    points: [
      'Glasses power and eye growth (axial length) measured over time on the Pristine OBM 12',
      'Corneal topography on the Sirius+, mapping the shape of the front of the eye',
      'Lifestyle and diet assessment',
      'Myopia control eye drops and glasses, where they are right for your child',
    ],
  },
  {
    id: 'low-vision-aids',
    title: 'Low vision aids',
    lead: 'For children and adults with poor vision, an assessment and the right aid can make everyday tasks easier. Children with cortical visual impairment (CVI) also get vision stimulation.',
    image: 'images/services/low-vision.webp',
    imageAlt: 'A boy with glasses at an eye-test instrument',
    points: [
      'Hand and stand magnifiers',
      'CCTV magnifiers and telescopes',
      'Tinted glasses',
      'Vision stimulation for CVI with lights, balls, vision cards and vision boxes, to improve fixing, eye contact, eye tracking and recognising faces',
    ],
  },
  {
    id: 'vision-therapy',
    title: 'Vision therapy',
    lead: 'Good vision needs both eyes to work together and send the brain one clear picture, for reading, 3D vision and coordination. Vision therapy trains that teamwork.',
    image: 'images/services/vision-therapy.webp',
    imageAlt: 'A close-up of an eye in front of an eye chart',
    points: [
      'For reading and learning difficulties, eye strain from screens, intermittent squint and lazy eye',
      'Starts with an orthoptic and binocularity assessment: stereoacuity, Worth 4 dot, convergence and accommodation',
      'Flippers, dot cards, fusion cards and prism exercises',
    ],
  },
  {
    id: 'online-vision-therapy',
    title: 'Online vision therapy programmes',
    lead: 'After the first sessions at the clinic, therapy can continue at home on a computer, so children keep training without travelling for every session.',
    image: 'images/services/orthoptic.webp',
    imageAlt: 'An eye chart seen through a lens',
    points: [
      'Bynocs: play-based binocular vision software',
      '30–45 minute sessions, usually 10–15 sessions',
      'Start at the clinic, then continue at home',
    ],
    note: 'Programme details, schedules and fees: please confirm with the clinic.',
  },
  {
    id: 'amblyopia-care',
    title: 'Amblyopia care',
    lead: 'In amblyopia (lazy eye), one eye sees less clearly and the brain starts to rely on the other. It is treated best in childhood, while vision is still developing.',
    image: 'images/services/paediatric-evaluation.webp',
    imageAlt: 'A girl covering one eye in front of an eye chart',
    points: [
      'Vision checked in each eye, with picture charts for children too young to read letters',
      'Glasses where they are needed',
      'Patching plans to make the weaker eye work',
      'Binocular vision therapy, at the clinic or online',
    ],
  },
];

export interface SurgeryItem {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  tags: string[];
}

export const SURGERIES: SurgeryItem[] = [
  {
    id: 'paediatric-cataract-surgery',
    title: 'Paediatric cataract',
    body: 'Children can be born with, or develop, a cataract. It needs early surgery to protect developing vision. Phacoemulsification with an intraocular lens (IOL) is available.',
    image: 'images/surgeries/paediatric-cataract.webp',
    imageAlt: 'Surgeons at an operating microscope',
    tags: ['Children'],
  },
  {
    id: 'probing-and-syringing',
    title: 'Paediatric probing',
    body: 'For babies and children with a blocked tear duct that causes constant watering: probing and syringing, with intubation when needed, to clear the duct.',
    image: 'images/surgeries/probing.webp',
    imageAlt: 'A baby lying down, looking up',
    tags: ['Children'],
  },
  {
    id: 'exotropia',
    title: 'Exotropia',
    body: 'A squint in which one or both eyes turn outward, often only at times at first, for example when the child is tired or looking far away. When glasses or therapy are not enough, surgery adjusts the eye muscles to bring the eyes straight.',
    image: 'images/surgeries/botox.webp',
    imageAlt: 'A boy with one eye turned outward',
    tags: ['Children', 'Adults'],
  },
  {
    id: 'esotropia',
    title: 'Esotropia',
    body: 'A squint in which one or both eyes turn inward. A child with a squint should ideally be operated on before the age of 8, while vision is still developing; waiting longer risks losing binocular vision for good. Pain-free, with safe anaesthesia.',
    image: 'images/surgeries/squint-child.webp',
    imageAlt: 'A boy resting his chin on his arms, one eye turned inward',
    tags: ['Children', 'Adults'],
  },
  {
    id: 'complex-squint',
    title: 'Complex squint disorders',
    body: 'Paralytic squint, Duane’s retraction syndrome and Brown’s syndrome need careful planning. A Botox injection can help align the eyes, as an alternative treatment for paralytic squint.',
    image: 'images/services/squint.webp',
    imageAlt: 'A toddler with one eye turned inward',
    tags: ['Children', 'Adults'],
  },
  {
    id: 'nystagmus-surgery',
    title: 'Nystagmus surgeries',
    body: 'Surgery for nystagmus (wobbling eyes) improves the head posture children take up to see, reduces strain and neck discomfort, and helps functional vision.',
    image: 'images/surgeries/nystagmus.webp',
    imageAlt: 'A child with pale hair and light eyes',
    tags: ['Children', 'Adults'],
  },
  {
    id: 'squint-surgery-adults',
    title: 'Adult squint corrections',
    body: 'Cosmetic correction and paralytic squint treatment for adults, with sutureless, micro-incision, absorbable and adjustable suture techniques.',
    image: 'images/surgeries/squint-adult.webp',
    imageAlt: 'A young woman with a squint',
    tags: ['Adults'],
  },
  {
    id: 'oculoplasty',
    title: 'Oculoplasty procedures',
    body: 'Surgery around the eye: correction of a droopy eyelid (ptosis) in children with good cosmetic results, sutureless chalazion (stye) removal, and pterygium removal with a transplantation technique.',
    image: 'images/surgeries/ptosis.webp',
    imageAlt: 'A woman with one drooping eyelid',
    tags: ['Children', 'Adults'],
  },
];

/* ---------- Gallery ---------- */

export type AlbumId = 'clinic' | 'equipment' | 'examination' | 'outcomes' | 'achievements';

/** The four albums of the clinic's old gallery page (dralokaseyecare.com/gallery-2/). */
export const ALBUMS: { id: AlbumId; title: string; lede: string }[] = [
  { id: 'clinic', title: 'The hospital', lede: 'The clinic, the operation theatre, and Dr. Aloka at work.' },
  { id: 'equipment', title: 'Equipment', lede: 'Diagnostic machines at the clinic.' },
  { id: 'examination', title: 'Eye examination', lede: 'Conditions Dr. Aloka sees and examines, from newborns to school children.' },
  { id: 'outcomes', title: 'Surgical outcomes', lede: 'Eyes before and after treatment, as published on the clinic’s website.' },
  { id: 'achievements', title: 'Talks and conferences', lede: 'Dr. Aloka presenting at national and international meetings.' },
];

export interface GalleryPhoto {
  album: AlbumId;
  src: string;
  thumb: string;
  w: number;
  h: number;
  caption: string;
}

/** Photos from the old gallery's Google Drive albums; each file has a provenance note beside it. */
export const GALLERY: GalleryPhoto[] = [
  { album: 'achievements', src: 'images/gallery/achievements/01.webp', thumb: 'images/gallery/achievements/01-sm.webp', w: 980, h: 650, caption: "Dr. Aloka with fellow ophthalmologists on stage at a conference" },
  { album: 'achievements', src: 'images/gallery/achievements/02.webp', thumb: 'images/gallery/achievements/02-sm.webp', w: 1050, h: 1400, caption: "Attending a symposium at AIIMS" },
  { album: 'achievements', src: 'images/gallery/achievements/03.webp', thumb: 'images/gallery/achievements/03-sm.webp', w: 720, h: 650, caption: "Dr. Aloka receiving a memento at a conference" },
  { album: 'achievements', src: 'images/gallery/achievements/04.webp', thumb: 'images/gallery/achievements/04-sm.webp', w: 720, h: 1280, caption: "Presentation at the Khammam Ophthalmology Association" },
  { album: 'achievements', src: 'images/gallery/achievements/05.webp', thumb: 'images/gallery/achievements/05-sm.webp', w: 1050, h: 1400, caption: "Presenting at the World Congress of Paediatric Ophthalmology and Strabismus" },
  { album: 'achievements', src: 'images/gallery/achievements/06.webp', thumb: 'images/gallery/achievements/06-sm.webp', w: 960, h: 960, caption: "Presenting a talk at the All India Ophthalmology Conference" },
  { album: 'achievements', src: 'images/gallery/achievements/07.webp', thumb: 'images/gallery/achievements/07-sm.webp', w: 980, h: 650, caption: "Presenting at the World Congress of Paediatric Ophthalmology and Strabismus" },
  { album: 'achievements', src: 'images/gallery/achievements/08.webp', thumb: 'images/gallery/achievements/08-sm.webp', w: 960, h: 650, caption: "Presenting a talk at an ophthalmology conference" },
  { album: 'achievements', src: 'images/gallery/achievements/09.webp', thumb: 'images/gallery/achievements/09-sm.webp', w: 1400, h: 788, caption: "With Dr. Richard Hertle" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/01.webp', thumb: 'images/gallery/surgical-outcomes/01-sm.webp', w: 1400, h: 490, caption: "Before and after squint correction in an adult" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/02.webp', thumb: 'images/gallery/surgical-outcomes/02-sm.webp', w: 1400, h: 996, caption: "A boy with a squint, before treatment" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/03.webp', thumb: 'images/gallery/surgical-outcomes/03-sm.webp', w: 1400, h: 1400, caption: "A child’s squint before glasses, and the eyes straight with glasses on" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/04.webp', thumb: 'images/gallery/surgical-outcomes/04-sm.webp', w: 600, h: 217, caption: "Head posture in nystagmus, before and after surgery" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/05.webp', thumb: 'images/gallery/surgical-outcomes/05-sm.webp', w: 600, h: 217, caption: "Nystagmus head posture, before and after surgery" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/06.webp', thumb: 'images/gallery/surgical-outcomes/06-sm.webp', w: 1400, h: 301, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/07.webp', thumb: 'images/gallery/surgical-outcomes/07-sm.webp', w: 1400, h: 288, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/08.webp', thumb: 'images/gallery/surgical-outcomes/08-sm.webp', w: 1400, h: 330, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/09.webp', thumb: 'images/gallery/surgical-outcomes/09-sm.webp', w: 1400, h: 325, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/10.webp', thumb: 'images/gallery/surgical-outcomes/10-sm.webp', w: 1400, h: 289, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/11.webp', thumb: 'images/gallery/surgical-outcomes/11-sm.webp', w: 1400, h: 327, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/12.webp', thumb: 'images/gallery/surgical-outcomes/12-sm.webp', w: 1400, h: 288, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/13.webp', thumb: 'images/gallery/surgical-outcomes/13-sm.webp', w: 1400, h: 321, caption: "Before and after squint correction" },
  { album: 'outcomes', src: 'images/gallery/surgical-outcomes/14.webp', thumb: 'images/gallery/surgical-outcomes/14-sm.webp', w: 1400, h: 305, caption: "Before and after squint correction" },
  { album: 'clinic', src: 'images/gallery/the-hospital/01.webp', thumb: 'images/gallery/the-hospital/01-sm.webp', w: 1400, h: 1050, caption: "Dr. Aloka at the clinic" },
  { album: 'clinic', src: 'images/gallery/the-hospital/02.webp', thumb: 'images/gallery/the-hospital/02-sm.webp', w: 1050, h: 1400, caption: "Examining a newborn baby's eyes" },
  { album: 'clinic', src: 'images/gallery/the-hospital/03.webp', thumb: 'images/gallery/the-hospital/03-sm.webp', w: 780, h: 1040, caption: "In the operation theatre" },
  { album: 'clinic', src: 'images/gallery/the-hospital/04.webp', thumb: 'images/gallery/the-hospital/04-sm.webp', w: 1280, h: 720, caption: "Operating on a baby with squint" },
  { album: 'clinic', src: 'images/gallery/the-hospital/05.webp', thumb: 'images/gallery/the-hospital/05-sm.webp', w: 1040, h: 480, caption: "Operating with a fantastic team" },
  { album: 'clinic', src: 'images/gallery/the-hospital/06.webp', thumb: 'images/gallery/the-hospital/06-sm.webp', w: 1280, h: 720, caption: "The clinic’s reception" },
  { album: 'clinic', src: 'images/gallery/the-hospital/07.webp', thumb: 'images/gallery/the-hospital/07-sm.webp', w: 1400, h: 1050, caption: "A recovery room" },
  { album: 'clinic', src: 'images/gallery/the-hospital/08.webp', thumb: 'images/gallery/the-hospital/08-sm.webp', w: 1050, h: 1400, caption: "An operation theatre" },
  { album: 'clinic', src: 'images/gallery/the-hospital/09.webp', thumb: 'images/gallery/the-hospital/09-sm.webp', w: 788, h: 1400, caption: "Dr. Aloka in the operation theatre" },
  { album: 'examination', src: 'images/gallery/eye-examination/01.webp', thumb: 'images/gallery/eye-examination/01-sm.webp', w: 1400, h: 788, caption: "Cataract in both eyes (bilateral cataract)" },
  { album: 'examination', src: 'images/gallery/eye-examination/02.webp', thumb: 'images/gallery/eye-examination/02-sm.webp', w: 600, h: 600, caption: "Congenital dacryocystitis, a blocked and infected tear duct" },
  { album: 'examination', src: 'images/gallery/eye-examination/03.webp', thumb: 'images/gallery/eye-examination/03-sm.webp', w: 1400, h: 709, caption: "Congenital cataract" },
  { album: 'examination', src: 'images/gallery/eye-examination/04.webp', thumb: 'images/gallery/eye-examination/04-sm.webp', w: 1400, h: 637, caption: "A child with a squint" },
  { album: 'examination', src: 'images/gallery/eye-examination/05.webp', thumb: 'images/gallery/eye-examination/05-sm.webp', w: 600, h: 600, caption: "Examining a newborn" },
  { album: 'examination', src: 'images/gallery/eye-examination/06.webp', thumb: 'images/gallery/eye-examination/06-sm.webp', w: 1172, h: 966, caption: "Head posture with nystagmus" },
  { album: 'examination', src: 'images/gallery/eye-examination/07.webp', thumb: 'images/gallery/eye-examination/07-sm.webp', w: 980, h: 650, caption: "Testing near focus with the RAF ruler" },
  { album: 'examination', src: 'images/gallery/eye-examination/08.webp', thumb: 'images/gallery/eye-examination/08-sm.webp', w: 788, h: 1400, caption: "An infant at an eye examination" },
  // added at the end so the gallery hero's fixed indices (FAN) stay the same
  { album: 'equipment', src: 'images/myopia/pristine-obm-12-900.webp', thumb: 'images/myopia/pristine-obm-12-520.webp', w: 900, h: 875, caption: "Pristine OBM 12, for measuring eye length and tracking myopia" },
  { album: 'equipment', src: 'images/myopia/sirius-plus-topographer-1200.webp', thumb: 'images/myopia/sirius-plus-topographer-640.webp', w: 1200, h: 817, caption: "Sirius+ corneal topography" },
];

/* ---------- FAQ ---------- */

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  /** a page on this site that says more */
  more?: { label: string; path: string; fragment?: string };
}

/** From the clinic's FAQ page (dralokaseyecare.com/faq/), lightly edited for clarity;
 *  the "Visiting the clinic" answers repeat the clinic's published details. */
export const FAQ_GROUPS: { id: string; title: string; items: FaqItem[] }[] = [
  {
    id: 'squint',
    title: 'Squint (crossed eyes)',
    items: [
      {
        id: 'what-is-squint',
        q: 'What is squint or crossed eyes?',
        a: 'When both the eyes do not focus together, it is known as squint or crossed eyes. One eye focuses on the object and the other does not, which can cause double vision or a lazy eye, leading to reading difficulties or cosmetic worries. In Telugu, a squint is called mella kannu.',
        more: { label: 'Squint treatment', path: '/services/', fragment: 'squint' },
      },
      {
        id: 'why-examination',
        q: 'Why does a squint patient need a full eye examination?',
        a: 'In many cases a squint may be a sign of a large glasses power (refractive error), deep amblyopia (lazy eye), cataract, corneal opacity or a problem in the retina. So a complete eye examination is essential to prevent irreversible vision loss.',
      },
      {
        id: 'squint-lucky',
        q: 'I have heard that squint is lucky and shouldn’t be corrected. Is this true?',
        a: 'No. A squint causes irreversible vision loss and harms the self-esteem of the patient. In today’s world it can also be a hindrance in marriage and in career growth. So a squint cannot be lucky for you.',
      },
    ],
  },
  {
    id: 'surgery',
    title: 'Squint surgery',
    items: [
      {
        id: 'cosmetic',
        q: 'Is squint surgery a cosmetic surgery?',
        a: 'Squint surgery is not just cosmetic surgery; this is misunderstood by many, even some doctors. Squint surgery re-establishes binocular vision, stereoacuity (3D vision), depth perception and visual acuity, helps reverse amblyopia, and improves eye contact, reading ability and freedom from eye strain.',
        more: { label: 'Squint surgery', path: '/surgeries/' },
      },
      {
        id: 'painful',
        q: 'Is squint surgery painful?',
        a: 'No. Surgery is done under local or general anaesthesia and is not painful at all.',
      },
      {
        id: 'scars',
        q: 'Will there be scars after squint surgery?',
        a: 'Dr. Aloka offers the latest type of squint surgery, done with a minimal incision and fornix-based absorbable sutures, which does not cause any external scarring.',
      },
      {
        id: 'age-40',
        q: 'I am 40 years old. Can I have a squint correction?',
        a: 'Yes. Age is no bar for the correction. A squint is best corrected before 8 years of age, but cosmetic benefits can be gained at any age.',
        more: { label: 'Squint surgery for adults', path: '/surgeries/' },
      },
    ],
  },
  {
    id: 'children',
    title: 'Your child’s eyes',
    items: [
      {
        id: 'first-examination',
        q: 'When should my child have their first eye examination?',
        a: 'If your child was born before 32 weeks, weighed less than 2 kg at birth or had any birth complications, the first eye check-up is essential in the first month of life. If the time around birth was uneventful, make sure the first eye check-up is done within the first 3 months of life.',
        more: { label: 'ROP screening', path: '/services/', fragment: 'retinopathy-of-prematurity' },
      },
      {
        id: 'vision-test-age',
        q: 'From what age can a child’s vision be tested?',
        a: 'Children can have their vision tested from six months of age, with charts made for children who can’t read letters yet: an optokinetic drum for babies, and the Lea picture chart and HOTV chart for young children.',
        more: { label: 'Paediatric eye evaluation', path: '/services/', fragment: 'paediatric-eye-evaluation' },
      },
      {
        id: 'parent-check',
        q: 'Can I find out as a parent if my child has an eye problem?',
        a: 'You can ask your child to close each eye in turn and read from a distance. Squeezing the eyes, watering of the eyes, or tilting the head to read may be signs of a refractive error, a need for glasses.',
      },
      {
        id: 'child-cataract',
        q: 'How can a child have a cataract?',
        a: 'Infections at birth, injury, metabolic diseases and genetic diseases can cause a cataract, a clouding of the lens seen as a white reflex in a child’s eye. Sometimes no cause is found. Any cataract in a child needs urgent surgery to prevent irreversible loss of vision.',
        more: { label: 'Cataract surgery for children', path: '/surgeries/' },
      },
    ],
  },
  {
    id: 'visiting',
    title: 'Visiting the clinic',
    items: [
      {
        id: 'timings',
        q: 'What are the clinic timings?',
        a: 'Monday to Saturday, 10 am to 5 pm. The clinic is closed on Sunday, and consultations are by appointment only.',
        more: { label: 'Book an appointment', path: '/contact-us/' },
      },
      {
        id: 'location',
        q: 'Where is the clinic?',
        a: 'Dr. Aloka’s Eye Care is on the third floor of Plot no 6, 9th Phase Road, near Forum Srujana Mall, KPHB Phase 6, Kukatpally, Hyderabad 500085.',
        more: { label: 'Map and directions', path: '/contact-us/' },
      },
      {
        id: 'adults',
        q: 'Does Dr. Aloka see adults too?',
        a: 'Yes. Alongside children’s eye care, Dr. Aloka treats squint in adults, and performs pterygium surgery, chalazion removal and Botox injection for squint.',
        more: { label: 'Surgeries', path: '/surgeries/' },
      },
    ],
  },
];
