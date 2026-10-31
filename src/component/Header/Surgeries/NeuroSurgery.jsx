import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  FaBrain,
  FaBone,
  FaGears,
  FaUserDoctor,
  FaKitMedical,
  FaStethoscope,
  FaClipboardCheck,
  FaHouse,
  FaShieldHalved,
  FaFileInvoiceDollar,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation,
  FaRotateLeft,
  FaPhone,
  FaWhatsapp,
  FaArrowRight,
  FaBedPulse,
  FaUsers,
} from 'react-icons/fa6'

import DoctorCard from '../DoctorCard.jsx'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'
const WHATSAPP_NUMBER = '919082097421'
const WHATSAPP_MESSAGE = 'Hello Mallika Hospital, I would like to consult a specialist about Neurosurgery.'

/* PLACEHOLDER DOCTORS: replace with real Neurosurgeons. */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Neurosurgery', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Neurosurgery', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Neurosurgery', display_available_days: 'Tuesday, Thursday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Neurosurgery', display_available_days: 'Tuesday, Thursday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
]

/* Quick facts */
const quickFacts = [
  { Icon: FaHouse, value: 'Advanced tech', label: 'High-definition microscopes & neuronavigation' },
  { Icon: FaUserDoctor, value: 'Expert team', label: 'Experienced and specialized neurosurgeons' },
  { Icon: FaClipboardCheck, value: 'Minimally invasive', label: 'Precision techniques for reduced trauma' },
  { Icon: FaShieldHalved, value: 'Cashless', label: 'Insurance and TPA options available' },
]

const conditions = [
  { Icon: FaBrain, title: 'Brain Tumors', text: 'Specialized management and surgical removal for gliomas, meningiomas, and pituitary tumors.' },
  { Icon: FaBrain, title: 'Cerebrovascular Disorders', text: 'Expert care for aneurysms, AVMs, and stroke management.' },
  { Icon: FaBrain, title: 'Traumatic Brain Injury', text: 'Emergency and critical care neurosurgical management for head trauma.' },
  { Icon: FaBone, title: 'Herniated Discs & Spinal Stenosis', text: 'Targeted surgical decompression and relief for pinched nerves and spinal narrowing.' },
  { Icon: FaBone, title: 'Spinal Deformities & Fusion', text: 'Corrective procedures for scoliosis and stabilization of spinal segments.' },
  { Icon: FaGears, title: 'Movement Disorders & Epilepsy', text: 'Functional neurosurgery including Deep Brain Stimulation (DBS) and seizure treatments.' },
]

const procedures = [
  { 
    Icon: FaBrain, 
    title: 'Brain Tumor Surgery', 
    text: 'Advanced removal of gliomas, meningiomas, and pituitary tumors using high-definition magnification and computer-assisted neuronavigation for maximum precision.' 
  },
  { 
    Icon: FaBrain, 
    title: 'Cerebrovascular Surgery', 
    text: 'Microsurgical interventions to treat complex vascular conditions like brain aneurysms and arteriovenous malformations (AVMs).' 
  },
  { 
    Icon: FaBone, 
    title: 'Minimally Invasive Spine Surgery', 
    text: 'Targeted micro-discectomies and robotic-assisted decompression designed to minimize tissue damage, reduce post-op pain, and accelerate recovery.' 
  },
  { 
    Icon: FaBone, 
    title: 'Spinal Fusion & Stabilization', 
    text: 'Surgical procedures to permanently join painful vertebrae, restoring structural stability and correcting spinal alignment deformities like scoliosis.' 
  },
  { 
    Icon: FaGears, 
    title: 'Deep Brain Stimulation (DBS)', 
    text: 'Cutting-edge functional neurosurgery placing neurostimulators to help control symptoms of Parkinson’s disease and chronic tremors.' 
  },
  { 
    Icon: FaGears, 
    title: 'Epilepsy & Pain Neurosurgery', 
    text: 'Specialized surgical options to target seizure foci or manage severe, treatment-resistant chronic pain conditions.' 
  },
]

const approach = [
  { Icon: FaStethoscope, title: 'Advanced Intra-Operative Tech', text: 'Utilizing high-definition microscopes and computer-assisted neuronavigation for high precision.' },
  { Icon: FaUserDoctor, title: 'Minimally Invasive Focus', text: 'Prioritizing less invasive approaches to reduce trauma, minimize pain, and accelerate recovery.' },
  { Icon: FaClipboardCheck, title: 'Multidisciplinary Collaboration', text: 'Collaborating closely with neurologists, oncologists, and critical care specialists for holistic care.' },
]

const journey = [
  { Icon: FaClipboardCheck, title: 'Consultation & Diagnostics', text: 'Comprehensive assessment using advanced imaging (MRI/CT), meeting your neurosurgeon, and planning treatment.' },
  { Icon: FaKitMedical, title: 'Day of Surgery', text: 'Our dedicated neuro-theatre and ICU nursing team guide you through admission, anesthesia, and precision intervention.' },
  { Icon: FaHouse, title: 'Recovery & Rehabilitation', text: 'Dedicated inpatient monitoring followed by customized rehabilitation plans, follow-ups, and at-home guidance.' },
]

const recovery = [
  {
    when: 'First few days (Inpatient ICU / Ward)',
    title: 'Immediate post-operative care',
    text: 'Close neurological monitoring in our dedicated ward or ICU unit to ensure stability and comfort.',
    dos: ['Follow prescribed pain management precisely', 'Perform light assisted breathing or gentle movements as instructed'],
    donts: ['Straining or sudden jerky head/neck movements', 'Lifting any heavy objects'],
  },
  {
    when: 'First 2 to 4 weeks',
    title: 'Initial healing at home',
    text: 'Wound healing and gradual restoration of light, independent daily routines at home.',
    dos: ['Get plenty of rest and eat a nutritious, healing diet', 'Keep incision areas clean and dry'],
    donts: ['Driving or operating machinery without clearance', 'Strenuous bending, twisting, or lifting'],
  },
  {
    when: 'Months 1 to 3',
    title: 'Progressive recovery & therapy',
    text: 'Rebuilding strength, balance, and endurance with physical or occupational therapy support.',
    dos: ['Gradually resume light household activities or desk work', 'Attend all scheduled neurosurgery follow-up appointments'],
    donts: ['Engaging in high-impact sports or heavy exercise too early'],
  },
  {
    when: 'After 3 months',
    title: 'Long-term evaluation & clearance',
    text: 'Review scans with your neurosurgeon to assess full functional recovery and return to normal lifestyle.',
    dos: ['Maintain regular check-ups if advised', 'Continue healthy lifestyle and recommended exercises'],
    donts: ['Ignoring any new neurological symptoms or warning signs'],
  },
]

const costPoints = [
  { Icon: FaShieldHalved, title: 'Cashless Treatment', text: 'Seamless coordination with major insurance providers and TPAs. Present your health card and ID at admission.' },
  { Icon: FaFileInvoiceDollar, title: 'Written Estimate', text: 'Transparent financial estimates provided by our billing team following your surgeon consultation.' },
  { Icon: FaCircleCheck, title: 'Government Schemes', text: 'Inquire about applicable government healthcare schemes and financial assistance programs.' },
]

const warningSigns = [
  'Sudden, severe, or unusually persistent headaches',
  'Unexplained weakness, numbness, or paralysis in limbs',
  'Sudden vision changes, double vision, or loss of balance',
  'New onset seizures or sudden neurological confusion',
  'Persistent neck or back pain radiating down the arms or legs',
  'Difficulty speaking, understanding speech, or swallowing',
  'Unexplained dizziness, loss of coordination, or difficulty walking',
  'Progressive memory decline or behavioral changes',
]

const emergencyNote =
  'Sudden loss of consciousness, acute stroke symptoms (facial drooping, sudden arm weakness), severe head trauma, or sudden paralysis require immediate critical care. Do not wait—call us or go to the nearest emergency department right away.'

const checklist = [
  'A valid photo ID for the patient and primary attendant',
  'All previous MRI scans, CT scans, X-rays, and medical reports',
  'Doctor consultation notes and complete list of current medications',
  'Record of known drug allergies or past reactions to anesthesia',
  'Insurance or TPA health card and pre-authorization documents',
  'Comfortable, loose clothing and essential personal care items',
  'Name and contact details of the primary family point of contact',
  'Written list of questions for your neurosurgeon and care team',
]

const related = [
  { Icon: FaKitMedical, title: 'Operating Theatre', text: 'State-of-the-art sterile surgical suites.', to: '/services/ot' },
  { Icon: FaBedPulse, title: 'Intensive Care Unit (ICU)', text: '24/7 advanced neurological critical care.', to: '/services/icu' },
  { Icon: FaUsers, title: 'Our Wards', text: 'Comfortable private and semi-private recovery rooms.', to: '/services/ward' },
  { Icon: FaShieldHalved, title: 'Pathology Lab', text: 'Comprehensive diagnostic testing facilities.', to: '/services/pathology-lab' },
]

function SectionHeading({ before, highlight, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-brand-blue-dark'
        }`}
      >
        {before} <span className={light ? 'text-brand-green' : 'text-brand-red'}>{highlight}</span>
      </h2>
      <div
        className={`mx-auto mt-4 h-1.5 w-24 rounded-full ${
          light ? 'bg-white/80' : 'bg-linear-to-r from-brand-blue via-brand-green to-brand-red'
        }`}
      />
    </div>
  )
}

const Neurosurgery = () => {
  const [checked, setChecked] = useState([])

  const toggleItem = (item) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))

  const allReady = checked.length === checklist.length
  const phoneHref = `tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, '')}`
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="w-full bg-white" id="neurosurgery">
      <Helmet>
        <title>Expert Neurosurgeons & Brain/Spine Surgery in Jogeshwari | Mallika Hospital</title>
        <meta name="description" content="Consult top neurosurgeons at Mallika Hospital, Jogeshwari West, Mumbai. Offering advanced brain tumor surgery, complex spine surgeries, decompression, Deep Brain Stimulation (DBS), and trauma care." />
        <link rel="canonical" href="https://mallikahospital.co.in/surgeries/neuro-surgery" />
      </Helmet>

      {/* Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Neurosurgery Department" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Neurosurgery</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Pioneering surgical solutions for the most complex conditions of the brain, spine, and nervous system.
          </p>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Neuro" highlight="Specialists" />

          {doctors.length === 0 ? (
            <p className="mt-10 text-center text-slate-600">Our specialist list will be updated soon.</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="Excellence in Neurological &amp;" highlight="Spinal Care" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our Neurosurgery department is at the forefront of treating disorders of the brain, spine, and peripheral nerves. 
            Our team of highly skilled neurosurgeons combines unparalleled expertise with the most advanced technology 
            to provide the safest and most effective care for our patients.
          </p>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {quickFacts.map(({ Icon, value, label }) => (
              <li
                key={value}
                className="flex flex-col items-center bg-white/10 px-3 py-5 text-center ring-1 ring-white/20 transition duration-300 hover:-translate-y-1 hover:bg-white/20 sm:py-6"
              >
                <Icon className="text-3xl text-white/90 sm:text-4xl" />
                <p className="mt-3 text-lg font-bold leading-tight sm:mt-4 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">{label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-white/70 sm:text-sm">
            Every patient and every surgery is different. Your neurosurgeon will explain what applies to you.
          </p>
        </div>
      </section>

      {/* Conditions We Treat */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Conditions We" highlight="Treat" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {conditions.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-t-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue sm:size-12 sm:text-xl">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Procedures Performed */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Areas of Surgical" highlight="Expertise" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
            {procedures.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-l-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue sm:size-12 sm:text-xl">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-base">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              Precision, Technology, and <span className="text-brand-red">Compassion</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />

            <ul className="mt-6 space-y-5">
              {approach.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-3 sm:gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue sm:size-11">
                    <Icon />
                  </span>
                  <p className="text-sm text-slate-700 sm:text-base">
                    <strong className="text-brand-blue-dark">{title}:</strong> {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-3 sm:mx-0">
            <div className="absolute -bottom-3 -right-3 size-full bg-brand-green/30 sm:-bottom-4 sm:-right-4" />
            <img
              src={img2}
              alt="Neurosurgeon using advanced technology"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Surgical journey */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Your Surgical" highlight="Journey" />

          <div className="relative mt-12">
            <span className="absolute left-[16.6%] right-[16.6%] top-7 hidden h-0.5 bg-brand-blue/20 md:block" />

            <ol className="relative grid gap-6 md:grid-cols-3">
              {journey.map(({ Icon, title, text }, i) => (
                <li key={title} className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-brand-blue text-xl text-white shadow-lg ring-4 ring-white">
                    <Icon />
                  </span>
                  <div className="-mt-7 w-full border-t-4 border-brand-blue bg-white px-5 pb-6 pt-11 shadow-md ring-1 ring-slate-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-red">Step {i + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-brand-blue-dark">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Recovery timeline */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Your Recovery" highlight="Timeline" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            A general guide to what recovery can look like. Your neurosurgeon's instructions always come first.
          </p>

          <ol className="relative mx-auto mt-10 max-w-3xl space-y-6 sm:mt-12">
            <span className="absolute bottom-2 left-6 top-2 w-0.5 -translate-x-1/2 bg-brand-blue/20" />
            {recovery.map(({ when, title, text, dos, donts }, i) => (
              <li key={title} className="relative pl-16">
                <span className="absolute left-0 top-0 flex size-12 items-center justify-center rounded-full bg-brand-blue text-lg font-bold text-white shadow-lg ring-4 ring-slate-50">
                  {i + 1}
                </span>

                <div className="border-t-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-red">{when}</p>
                  <h3 className="mt-1 text-lg font-bold text-brand-blue-dark sm:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{text}</p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-green-700">Do</p>
                      <ul className="mt-2 space-y-1.5">
                        {dos.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                            <FaCircleCheck className="mt-0.5 shrink-0 text-brand-green" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-red">Avoid</p>
                      <ul className="mt-2 space-y-1.5">
                        {donts.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-slate-700">
                            <FaCircleXmark className="mt-0.5 shrink-0 text-brand-red" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cost and insurance */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Cost &" highlight="Insurance" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            We want you to know what to expect before you are admitted.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {costPoints.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-t-4 border-brand-green bg-white p-4 text-center shadow-md ring-1 ring-slate-100 transition duration-300 last:odd:col-span-2 hover:-translate-y-1.5 hover:shadow-xl sm:p-6 sm:last:odd:col-span-1"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-50 text-xl text-brand-green sm:size-14 sm:text-2xl">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/cashless-&-tpa"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
            >
              Cashless &amp; TPA <FaArrowRight />
            </Link>
            <Link
              to="/govt.sch"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              Government Schemes <FaArrowRight />
            </Link>
          </div>

          <p className="mt-5 text-center text-xs text-slate-500 sm:text-sm">
            Coverage depends on your policy and your procedure. Our team will confirm it with you before admission.
          </p>
        </div>
      </section>

      {/* When to see a doctor / Warning signs */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="When to See" highlight="a Specialist" />

          <div className="mt-10 border-l-4 border-brand-red bg-white p-5 shadow-md ring-1 ring-slate-100 sm:mt-12 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl text-brand-red">
                <FaTriangleExclamation />
              </span>
              <div>
                <h3 className="text-xl font-bold text-brand-blue-dark sm:text-2xl">See a neurosurgeon if you notice</h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-slate-700 sm:grid-cols-2 sm:text-base">
                  {warningSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-red" />
                      {sign}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm font-medium text-red-800">{emergencyNote}</p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
                  >
                    Book an Appointment <FaArrowRight />
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-red px-6 py-3 font-semibold text-brand-red transition hover:bg-brand-red hover:text-white"
                  >
                    <FaPhone /> Call {HOSPITAL_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading before="Preparing for" highlight="Surgery" />
          <p className="mx-auto mt-5 max-w-xl text-center text-slate-600 sm:text-lg">
            Tick off what you have prepared before your neurosurgery.
          </p>

          <div className="mt-8 border-t-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 sm:mt-10 sm:p-8">
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-brand-blue-dark">
              <span>
                {checked.length} of {checklist.length} ready
              </span>
              {checked.length > 0 && (
                <button
                  type="button"
                  onClick={() => setChecked([])}
                  className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-brand-blue"
                >
                  <FaRotateLeft /> Reset
                </button>
              )}
            </div>
            <div
              className="mt-3 h-2 w-full bg-slate-200"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={checklist.length}
              aria-valuenow={checked.length}
            >
              <div
                className="h-full bg-brand-green transition-all duration-300"
                style={{ width: `${(checked.length / checklist.length) * 100}%` }}
              />
            </div>

            <ul className="mt-5 grid gap-2.5 sm:gap-3">
              {checklist.map((item) => {
                const isChecked = checked.includes(item)
                return (
                  <li key={item}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 border p-3 transition sm:p-4 ${
                        isChecked ? 'border-brand-green bg-green-50' : 'border-slate-200 hover:border-brand-blue/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item)}
                        className="mt-0.5 size-5 shrink-0 accent-brand-green"
                      />
                      <span className={`text-sm sm:text-base ${isChecked ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                        {item}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>

            {allReady && (
              <p className="mt-5 bg-green-50 p-4 text-center text-sm font-semibold text-green-800" aria-live="polite">
                You are all set. If you have any questions, call us before your surgery.
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              This is a general list. Always follow the specific instructions your neurosurgeon and anesthesia team give you
              for your own procedure, especially about eating, drinking and medications.
            </p>
          </div>
        </div>
      </section>

      {/* Related care */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Related" highlight="Care & Facilities" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {related.map(({ Icon, title, text, to }) => (
              <li key={title}>
                <Link
                  to={to}
                  className="group flex h-full flex-col border-t-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-6"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white sm:size-12 sm:text-xl">
                    <Icon />
                  </span>
                  <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-base">{title}</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{text}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue sm:text-sm">
                    Learn more <FaArrowRight className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Have a Question About <span className="text-brand-green">Neurosurgery?</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
          <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
            Book a consultation, ask us on WhatsApp, or call us. Our team will guide you.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-white px-7 py-3.5 font-semibold text-brand-blue-dark shadow-md transition hover:bg-brand-blue-light"
            >
              Book an Appointment <FaArrowRight />
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-green px-7 py-3.5 font-semibold text-white shadow-md transition hover:brightness-110"
            >
              <FaWhatsapp className="text-xl" /> Ask on WhatsApp
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2.5 border-2 border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-brand-blue-dark"
            >
              <FaPhone /> Call {HOSPITAL_PHONE}
            </a>
          </div>

          <p className="mx-auto mt-8 flex max-w-xl items-start gap-2 bg-white/10 p-4 text-left text-sm text-white/90 ring-1 ring-white/20">
            <FaTriangleExclamation className="mt-0.5 shrink-0 text-amber-300" />
            Severe head trauma, sudden loss of consciousness, or stroke symptoms need emergency medical care. 
            Do not wait for an appointment. Call us or go to the nearest emergency department right away.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Neurosurgery