import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  FaUserDoctor,
  FaUsers,
  FaShieldHalved,
  FaGem,
  FaKitMedical,
  FaStethoscope,
  FaClipboardCheck,
  FaHouse,
  FaFileInvoiceDollar,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation,
  FaRotateLeft,
  FaPhone,
  FaWhatsapp,
  FaArrowRight,
  FaBedPulse,
  FaStar,
} from 'react-icons/fa6'

import DoctorCard from '../DoctorCard.jsx'

import img from '../../../assets/img.png'
import img1 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'
const WHATSAPP_NUMBER = '919082097421'
const WHATSAPP_MESSAGE = 'Hello Mallika Hospital, I would like to consult a specialist about Plastic & Reconstructive Surgery.'

/* PLACEHOLDER DOCTORS: replace with real Plastic & Reconstructive Surgeons. */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Plastic & Reconstructive Surgery', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Plastic & Reconstructive Surgery', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Plastic & Reconstructive Surgery', display_available_days: 'Tuesday, Thursday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Plastic & Reconstructive Surgery', display_available_days: 'Tuesday, Thursday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
]

/* Quick facts */
const quickFacts = [
  { Icon: FaHouse, value: 'Precision Artistry', label: 'Combining surgical excellence with natural aesthetics' },
  { Icon: FaUserDoctor, value: 'Expert Surgeons', label: 'Board-certified plastic & reconstructive specialists' },
  { Icon: FaClipboardCheck, value: 'Customized Care', label: 'Tailored surgical and non-surgical treatment plans' },
  { Icon: FaShieldHalved, value: 'Cashless', label: 'Insurance and TPA options available for reconstructive cases' },
]

const conditions = [
  { Icon: FaGem, title: 'Post-Trauma Deformities', text: 'Reconstructive procedures to restore form and function following accidents or trauma.' },
  { Icon: FaGem, title: 'Congenital Anomalies', text: 'Corrective surgical interventions for birth defects affecting facial or bodily structures.' },
  { Icon: FaGem, title: 'Post-Oncological Defects', text: 'Advanced breast and tissue reconstruction following cancer surgery.' },
  { Icon: FaGem, title: 'Burn Sequelae & Scars', text: 'Scar revision and contracture release surgeries to improve mobility and appearance.' },
  { Icon: FaGem, title: 'Aging Facial Changes', text: 'Surgical rejuvenation to restore youthful contours while preserving natural expression.' },
  { Icon: FaGem, title: 'Post-Weight Loss Redundancy', text: 'Body contouring procedures to remove excess skin and stubborn fat after massive weight loss.' },
]

const procedures = [
  { 
    Icon: FaKitMedical, 
    title: 'Facial Rejuvenation (Facelift & Blepharoplasty)', 
    text: 'Restoring a refreshed, youthful appearance through precise facelifts, neck lifts, eyelid surgery (blepharoplasty), and brow lifts.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Body Contouring (Tummy Tuck & Liposuction)', 
    text: 'Sculpting and refining body contours via abdominoplasty, liposuction, and post-bariatric body lifts.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Breast Surgery (Augmentation & Reconstruction)', 
    text: 'Enhancing, reducing, or rebuilding breast symmetry using implants, mastopexy, or autologous tissue flaps.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Reconstructive Microsurgery', 
    text: 'Complex tissue transfers and microvascular repairs for trauma, cancer reconstruction, and wound coverage.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Scar Revision & Burn Care', 
    text: 'Advanced surgical and laser treatments to minimize disfiguring scars and improve tissue function.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Non-Surgical Aesthetic Enhancements', 
    text: 'Dermal fillers, botulinum toxin, and advanced laser skin resurfacing for subtle non-invasive rejuvenation.' 
  },
]

const approach = [
  { Icon: FaStethoscope, title: 'Individualized Treatment', text: 'Customized surgical plans tailored specifically to your unique anatomical goals and aesthetic vision.' },
  { Icon: FaUserDoctor, title: 'Natural-Looking Outcomes', text: 'Enhancing your natural features while maintaining facial harmony and personal character.' },
  { Icon: FaClipboardCheck, title: 'Comprehensive Support', text: 'Dedicated guidance from initial consultation through full recovery and follow-up.' },
]

const journey = [
  { Icon: FaClipboardCheck, title: 'Consultation & Planning', text: 'Discuss your aesthetic or reconstructive goals, medical history, and expected outcomes with your specialist.' },
  { Icon: FaKitMedical, title: 'Surgical or In-Office Procedure', text: 'Precise surgical execution in our sterile operating suites or advanced non-surgical treatment rooms.' },
  { Icon: FaHouse, title: 'Recovery & Aftercare', text: 'Receive attentive nursing care, compression garment guidelines, and scheduled post-op reviews.' },
]

const recovery = [
  {
    when: 'First 24 to 48 hours',
    title: 'Immediate post-procedure rest',
    text: 'Initial healing period requiring rest, prescribed pain management, and wearing prescribed compression garments.',
    dos: ['Follow medication and compression instructions strictly', 'Keep incision areas clean, dry, and elevated as advised'],
    donts: ['Straining, bending over, or lifting heavy objects', 'Removing garments without surgeon approval'],
  },
  {
    when: 'First week',
    title: 'Early healing at home',
    text: 'Swelling and bruising peak and begin to subside. Initial dressings or sutures are reviewed.',
    dos: ['Take short, gentle indoor walks to promote circulation', 'Eat a balanced, protein-rich diet to support tissue healing'],
    donts: ['Soaking in baths, swimming, or exposing incisions to direct sunlight', 'Engaging in vigorous exercise'],
  },
  {
    when: 'Weeks 2 to 4',
    title: 'Resuming light routines',
    text: 'Energy levels return, office work or light daily tasks can resume, and swelling decreases noticeably.',
    dos: ['Gradually return to non-strenuous daily activities', 'Attend scheduled post-operative follow-up appointments'],
    donts: ['High-impact workouts, heavy gym lifting, or straining core muscles'],
  },
  {
    when: 'After 1 to 3 months',
    title: 'Final results & full clearance',
    text: 'Residual swelling resolves completely, scars mature and fade, and final aesthetic results become visible.',
    dos: ['Maintain a healthy, stable weight and skincare regimen', 'Protect healing scars from UV exposure'],
    donts: ['Skipping final follow-up evaluations with your plastic surgeon'],
  },
]

const costPoints = [
  { Icon: FaShieldHalved, title: 'Cashless & Insurance', text: 'Reconstructive procedures resulting from trauma, burns, or cancer are often eligible for insurance and TPA coverage.' },
  { Icon: FaFileInvoiceDollar, title: 'Transparent Estimates', text: 'Detailed written cost breakdowns provided following your consultation before scheduling any procedure.' },
  { Icon: FaCircleCheck, title: 'Flexible Financing', text: 'Inquire about available payment structures and guidance for eligible medical financing options.' },
]

const warningSigns = [
  'Sudden, severe increasing pain or swelling in a surgical area',
  'Persistent high fever, chills, or spreading redness around an incision',
  'Foul-smelling drainage, pus, or unexpected opening of a surgical wound',
  'Sudden shortness of breath, chest pain, or rapid heartbeat',
  'Severe dizziness, fainting, or prolonged lightheadedness',
  'New or rapidly worsening asymmetry, firmness, or discoloration',
  'Uncontrolled bleeding or significant fluid leakage from drains/wounds',
  'Numbness or nerve changes that persist or worsen unexpectedly',
]

const emergencyNote =
  'Sudden chest pain, severe shortness of breath, heavy uncontrolled bleeding, or signs of acute infection require immediate emergency medical care. Do not wait—go directly to the nearest emergency department right away.'

const checklist = [
  'A valid government photo ID for patient admission and registration',
  'Previous medical reports, surgical history, and pre-op lab clearances',
  'A complete record of all current medications, vitamins, and herbal supplements',
  'Note of known drug allergies or past reactions to anesthesia',
  'Insurance pre-authorization documents (specifically for reconstructive surgeries)',
  'Comfortable, loose-fitting clothing that buttons or zips in front',
  'Name and contact details of your designated family caregiver',
  'A written list of questions for your plastic surgeon',
]

const related = [
  { Icon: FaKitMedical, title: 'Operating Theatre', text: 'Advanced sterile surgical suites.', to: '/services/ot' },
  { Icon: FaBedPulse, title: 'Recovery Suites', text: 'Comfortable private rooms for inpatient healing.', to: '/services/ward' },
  { Icon: FaUsers, title: 'Dermatology & Skin Care', text: 'Complementary non-surgical skin treatments.', to: '/contact' },
  { Icon: FaShieldHalved, title: 'Pathology Lab', text: 'Complete pre-operative diagnostic testing.', to: '/services/pathology-lab' },
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

const PlasticSurgery = () => {
  const [checked, setChecked] = useState([])

  const toggleItem = (item) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))

  const allReady = checked.length === checklist.length
  const phoneHref = `tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, '')}`
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="w-full bg-white" id="plastic-surgery">
      <Helmet>
        <title>Best Plastic & Reconstructive Surgeons in Jogeshwari West | Mallika Hospital</title>
        <meta name="description" content="Consult top plastic and reconstructive surgeons at Mallika Hospital, Jogeshwari West, Mumbai. Offering facial rejuvenation, body contouring, breast surgery, and scar revision." />
        <link rel="canonical" href="https://mallikahospital.co.in/surgeries/plastic-surgery" />
      </Helmet>

      {/* Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img} alt="Plastic & Reconstructive Surgery" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Plastic &amp; Reconstructive Surgery</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Enhancing form and function through artistic precision and surgical excellence.
          </p>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Plastic &amp; Reconstructive" highlight="Specialists" />

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
          <SectionHeading before="Artistry Meets" highlight="Surgical Excellence" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our Plastic and Reconstructive Surgery department combines surgical precision with artistic vision 
            to deliver exceptional results. Whether you're seeking reconstructive surgery after trauma or illness, 
            or considering cosmetic enhancement, our board-certified surgeons provide personalized care with 
            attention to detail and natural-looking outcomes.
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
            Every patient and every aesthetic or reconstructive goal is unique. Your surgeon will explain what applies to you.
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
          <SectionHeading before="Our Surgical" highlight="Specialties" />

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
              Our Philosophy of <span className="text-brand-red">Care</span>
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
              src={img1}
              alt="Plastic surgeon consulting with patient"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Surgical journey */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Your Patient" highlight="Journey" />

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
            A general guide to what plastic surgery recovery can look like. Your surgeon's instructions always come first.
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
            We want you to know what to expect before your procedure.
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
            Coverage varies based on whether the procedure is reconstructive or cosmetic. Our team will verify details with you.
          </p>
        </div>
      </section>

      {/* When to see a doctor / Warning signs */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="When to See" highlight="a Plastic Surgeon" />

          <div className="mt-10 border-l-4 border-brand-red bg-white p-5 shadow-md ring-1 ring-slate-100 sm:mt-12 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl text-brand-red">
                <FaTriangleExclamation />
              </span>
              <div>
                <h3 className="text-xl font-bold text-brand-blue-dark sm:text-2xl">Consult a specialist if you notice</h3>
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
          <SectionHeading before="Preparing for Your" highlight="Surgery or Visit" />
          <p className="mx-auto mt-5 max-w-xl text-center text-slate-600 sm:text-lg">
            Tick off what you have prepared before your plastic surgery consultation or procedure.
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
                You are all set. If you have any questions, call us before you arrive.
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              This is a general checklist. Always follow specific instructions provided by your plastic surgeon.
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
            Have a Question About <span className="text-brand-green">Plastic Surgery?</span>
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
            Severe postoperative complications, heavy bleeding, or acute trauma require emergency medical attention. 
            Do not wait for an appointment. Call us or visit the nearest emergency department right away.
          </p>
        </div>
      </section>
    </div>
  )
}

export default PlasticSurgery