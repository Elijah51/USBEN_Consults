// Centralized content for the GlobalStudy site.
// Edit the arrays below to add, remove, or change content —
// every section reads from this file.

export const heroSlides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
    heading: 'Explore the World, Expand Your Education',
    text: 'Your journey to studying abroad starts here.',
    buttonText: 'Get Started Today',
    buttonTarget: 'contact',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
    heading: 'Your Future Starts at the Right University',
    text: 'Discover world-class universities and programs designed around your goals.',
    buttonText: 'Explore Programs',
    buttonTarget: 'programs',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80',
    heading: 'Turn Your Study Abroad Dreams Into Reality',
    text: 'Get expert guidance from application to arrival.',
    buttonText: 'Start Your Journey',
    buttonTarget: 'how-it-works',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
    heading: 'Study. Grow. Succeed.',
    text: 'Take the next step toward an international education.',
    buttonText: 'Contact an Advisor',
    buttonTarget: 'contact',
  },
]

export const stats = [
  { id: 1, value: 500, suffix: '+', label: 'Students Assisted' },
  { id: 2, value: 50, suffix: '+', label: 'University Partners' },
  { id: 3, value: 15, suffix: '+', label: 'Study Destinations' },
  { id: 4, value: 95, suffix: '%', label: 'Successful Applications' },
]

export const services = [
  {
    id: 1,
    icon: '🎓',
    title: 'University Admissions',
    description: 'Guidance with applications, admission and enrollment.',
    buttonText: 'Apply',
    buttonLink: '/book',
  },
  {
    id: 2,
    icon: '🛂',
    title: 'Visa Application Support',
    description: 'Professional support with visa applications and documentation.',
    buttonText: 'Book Session',
    buttonLink: '/book',
  },
  {
    id: 3,
    icon: '🏠',
    title: 'Accommodation',
    description: 'Find safe and comfortable accommodation near your university.',
    buttonText: 'Book Session',
    buttonLink: '/book',
  },
  {
    id: 4,
    icon: '✈️',
    title: 'Fight Booking',
    description: 'Flights, airport guidance and pre-departure planning.',
    buttonText: 'Request Quote',
    buttonLink: '/flight-booking',
  },
  {
    id: 5,
    icon: '💰',
    title: 'Scholarship Guidance',
    description: 'Discover scholarship opportunities and funding options.',
    buttonText: 'Book session',
    buttonLink: '/book',
  },
  {
    id: 6,
    icon: '📈',
    title: 'Career Guidance',
    description: 'Choose programs and destinations aligned with your career goals.',
    buttonText: 'Book session',
    buttonLink: '/book',
  },
]

export const destinations = [
  {
    id: 1,
    flag: 'https://flagcdn.com/w80/us.png',
    country: 'United States ',
    description: 'Historic universities and globally recognised degrees.',
    image:
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    flag: 'https://flagcdn.com/w80/gb.png',
    country: 'United Kingdom',
    description: 'Welcoming campuses and strong post-study work options.',
    image:
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    flag: 'https://flagcdn.com/w80/ca.png',
    country: ' Canada',
    description: 'World-leading research universities and diverse programs.',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    flag: 'https://flagcdn.com/w80/au.png',
    country: 'Australia',
    description: 'Top-ranked institutions and a high quality of life.',
    image:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    flag: 'https://flagcdn.com/w80/nz.png',
    country: 'New Zealand',
    description: 'Low-cost, high-quality education across every field.',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    flag: 'https://flagcdn.com/w80/ie.png',
    country: 'Ireland',
    description: 'Prestigious programs at the heart of European culture.',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  },

  {
    id: 5,
    flag: 'https://flagcdn.com/w80/eu.png',
    country: 'Europe ',
    description: 'Low-cost, high-quality education across every field.',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    flag: 'https://flagcdn.com/w80/as.png',
    country: 'Asia',
    description: 'Prestigious programs at the heart of European culture.',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
  },
]

export const programs = [
  {
    id: 1,
    title: 'Undergraduate Programs',
    description: 'Build a strong foundation with a bachelor\u2019s degree abroad.',
    duration: '3–4 years',
    category: 'Undergraduate',
  },
  {
    id: 2,
    title: "Master's Programs",
    description: 'Advance your expertise with a globally recognised master\u2019s degree.',
    duration: '1–2 years',
    category: 'Postgraduate',
  },
  {
    id: 3,
    title: 'MBA & Business',
    description: 'Sharpen your leadership and business skills at top business schools.',
    duration: '1–2 years',
    category: 'Professional',
  },
  {
    id: 4,
    title: 'Engineering',
    description: 'Study cutting-edge engineering at internationally ranked faculties.',
    duration: '3–4 years',
    category: 'Undergraduate',
  },
  {
    id: 5,
    title: 'Computer Science & IT',
    description: 'Gain in-demand tech skills at innovation-focused universities.',
    duration: '1–4 years',
    category: 'Postgraduate',
  },
  {
    id: 6,
    title: 'Health Sciences',
    description: 'Pursue a career in medicine, nursing or allied health fields.',
    duration: '2–6 years',
    category: 'Professional',
  },
]

export const programFilters = ['All', 'Undergraduate', 'Postgraduate', 'Professional']

export const howItWorks = [
  {
    id: 1,
    number: '01',
    title: 'Choose Your Destination',
    description: 'Explore countries and cities that match your goals and budget.',
  },
  {
    id: 2,
    number: '02',
    title: 'Select Your Program',
    description: 'Find the course and university that fit your career path.',
  },
  {
    id: 3,
    number: '03',
    title: 'Apply With Our Guidance',
    description: 'Our advisors help you through applications, visas and paperwork.',
  },
  {
    id: 4,
    number: '04',
    title: 'Get Ready to Travel',
    description: 'Prepare for departure with our pre-arrival support and checklists.',
  },
]

export const whyChooseUs = [
  { id: 1, title: 'Expert Guidance', description: 'Advisors with years of hands-on placement experience.' },
  { id: 2, title: 'Trusted University Partners', description: 'Direct relationships with 50+ institutions worldwide.' },
  { id: 3, title: 'Visa Support', description: 'Step-by-step help with documentation and interviews.' },
  { id: 4, title: 'Personalized Counseling', description: 'A plan built around your goals, not a template.' },
  { id: 5, title: 'Transparent Process', description: 'Clear timelines, costs and next steps at every stage.' },
  { id: 6, title: 'Pre-Departure Support', description: 'Practical preparation so you arrive ready and confident.' },
]

export const testimonials = [
  {
    id: 1,
    name: 'Amara Chukwu',
    university: 'University of Toronto',
    country: 'Canada',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    quote:
      'Studying abroad was the best decision I ever made. The GlobalStudy team made the entire process simple and stress-free.',
  },
  {
    id: 2,
    name: 'David Okafor',
    university: 'University of Manchester',
    country: 'United Kingdom',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    quote:
      'From my first consultation to landing at the airport, my advisor was there for every step. I couldn\u2019t have done it alone.',
  },
  {
    id: 3,
    name: 'Grace Adeyemi',
    university: 'University of Melbourne',
    country: 'Australia',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
    quote:
      'The scholarship guidance alone saved me thousands of dollars. Professional, honest and genuinely invested in my success.',
  },
  {
    id: 4,
    name: 'Michael Eze',
    university: 'Technical University of Munich',
    country: 'Germany',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    quote:
      'I was overwhelmed by the visa process until GlobalStudy stepped in. Clear guidance made a confusing process feel manageable.',
  },
]
