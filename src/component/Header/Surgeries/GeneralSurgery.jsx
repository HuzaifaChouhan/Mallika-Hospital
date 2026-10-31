import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
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

import img from '../../../assets/img.png'
import img1 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'
const WHATSAPP_NUMBER = '919082097421'
const WHATSAPP_MESSAGE = 'Hello Mallika Hospital, I would like to consult a surgeon about General & Laparoscopic Surgery.'

/* PLACEHOLDER DOCTORS: replace with real General Surgeons. */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'General Surgery', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'General Surgery', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'General Surgery', display_available_days: 'Tuesday, Thursday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'General Surgery', display_available_days: 'Tuesday, Thursday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
]

/* Quick facts */
const quickFacts = [
  { Icon: FaHouse, value: 'Advanced care', label: 'Modern surgical techniques for optimal safety' },
  { Icon: FaUserDoctor, value: 'Expert team', label: 'Experienced board-certified general surgeons' },
  { Icon: FaClipboardCheck, value: 'Minimally invasive', label: 'Laparoscopic and laser procedures for faster healing' },
  { Icon: FaShieldHalved, value: 'Cashless', label: 'Insurance and TPA options available' },
]

const conditions = [
  { Icon: FaKitMedical, title: 'Gallstones & Gallbladder Issues', text: 'Diagnosis and management of gallbladder inflammation and stone disease.' },
  { Icon: FaKitMedical, title: 'Hernias', text: 'Repair of inguinal, umbilical, and incisional hernias using advanced mesh techniques.' },
  { Icon: FaKitMedical, title: 'Appendicitis', text: 'Emergency and planned treatment for acute or chronic appendicitis.' },
  { Icon: FaKitMedical, title: 'Piles & Hemorrhoids', text: 'Advanced care and modern laser treatments for painful piles.' },
  { Icon: FaKitMedical, title: 'Anal Fistulas', text: 'Specialized management and laser sealing of anal fistulas.' },
  { Icon: FaKitMedical, title: 'Thyroid Disorders', text: 'Surgical management of nodules, goiter, and thyroid conditions.' },
  { Icon: FaKitMedical, title: 'Pancreatic Conditions', text: 'Care for tumors, chronic pancreatitis, and pancreatic cysts.' },
  { Icon: FaKitMedical, title: 'Hepatobiliary Diseases', text: 'Surgical treatment affecting the liver, bile ducts, and gallbladder.' },
  { Icon: FaKitMedical, title: 'Acid Reflux & GERD', text: 'Advanced surgical options for chronic acid reflux and hiatal hernias.' },
]

/* List of procedures performed */
const procedures = [
  { 
    Icon: FaKitMedical, 
    title: 'Gallbladder Removal', 
    text: 'Gallbladder removal, also called cholecystectomy, is a common procedure done to treat gallstones or inflammation. Usually performed laparoscopically for less pain and faster recovery.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Hernia Surgery', 
    text: 'Repairing a weak spot in the muscle wall by returning protruding tissue to its proper place, often strengthening the area with a surgical mesh.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Appendix Surgery', 
    text: 'Appendectomy performed as a planned or emergency operation to remove an inflamed appendix using open or laparoscopic techniques.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Laser Piles Surgery', 
    text: 'A modern, minimally invasive procedure using laser energy to shrink or remove swollen hemorrhoidal tissue with minimal pain and bleeding.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Laser Fistula Surgery', 
    text: 'Sealing and closing anal fistula tracts from the inside using a laser probe without damaging surrounding muscles for quicker recovery.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Thyroid Surgery', 
    text: 'Partial or total removal of the thyroid gland to treat nodules, goiter, hyperthyroidism, or thyroid cancer safely.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Pancreatic Surgery', 
    text: 'Specialized surgical interventions to address tumors, chronic pancreatitis, cysts, or pancreatic cancer.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Hepatobiliary Surgery', 
    text: 'Targeted surgical treatments for conditions affecting the liver, gallbladder, bile ducts, and pancreas.' 
  },
  { 
    Icon: FaKitMedical, 
    title: 'Anti-Reflux Surgery', 
    text: 'Fundoplication procedures to strengthen the valve between the esophagus and stomach, relieving chronic acid reflux.' 
  },
]

const approach = [
  { Icon: FaStethoscope, title: 'Expert-Led Care', text: 'Surgeries are performed by board-certified specialists with extensive experience.' },
  { Icon: FaUserDoctor, title: 'Minimally Invasive Focus', text: 'Specializing in laparoscopic and laser techniques leading to less pain and quicker recovery.' },
  { Icon: FaClipboardCheck, title: 'Comprehensive Support', text: 'Guiding you through every step from pre-op education to post-operative follow-up care.' },
]

const journey = [
  { Icon: FaClipboardCheck, title: 'Consultation & Planning', text: 'Meet your surgeon, review required diagnostic tests, discuss options, and receive a clear treatment roadmap.' },
  { Icon: FaKitMedical, title: 'Day of Surgery', text: 'Our specialized theatre and nursing team guide you through admission and prep, ensuring safety and comfort.' },
  { Icon: FaHouse, title: 'Recovery & Follow-Up', text: 'Receive clear instructions on home care, medications, and review appointments for a smooth return to life.' },
]

const recovery = [
  {
    when: 'First 1 to 2 days',
    title: 'Immediate post-op care',
    text: 'Resting in the hospital or initial days at home under monitoring after your laparoscopic or open procedure.',
    dos: ['Take prescribed medications strictly on time', 'Perform light, short indoor walking as advised'],
    donts: ['Heavy lifting or strenuous physical strain', 'Driving or operating machinery while on heavy painkillers'],
  },
  {
    when: 'First week',
    title: 'Initial healing phase',
    text: 'Wound healing progresses and mobility improves steadily day by day.',
    dos: ['Keep surgical incisions clean and dry', 'Follow recommended dietary modifications'],
    donts: ['Soaking wounds in baths or swimming until cleared', 'Lifting objects weighing more than a few kilograms'],
  },
  {
    when: 'Weeks 2 to 4',
    title: 'Gradual return to routine',
    text: 'Energy levels recover and normal daily light activities can be resumed safely.',
    dos: ['Gradually resume desk work or light daily tasks', 'Attend scheduled post-operative check-ups'],
    donts: ['Engaging in heavy gym workouts, contact sports, or strenuous exercise'],
  },
  {
    when: 'After one month',
    title: 'Full recovery & clearance',
    text: 'Final review with your surgeon to ensure complete healing and return to unrestricted lifestyle.',
    dos: ['Maintain a balanced, healthy diet and active lifestyle', 'Report any unusual discomfort promptly'],
    donts: ['Ignoring any lingering symptoms or skipping final review visits'],
  },
]

const costPoints = [
  { Icon: FaShieldHalved, title: 'Cashless Treatment', text: 'We work seamlessly with insurance providers and TPAs. Present your card and ID at admission.' },
  { Icon: FaFileInvoiceDollar, title: 'Written Estimate', text: 'Request a transparent written financial estimate after your consultation prior to admission.' },
  { Icon: FaCircleCheck, title: 'Government Schemes', text: 'Check eligibility for supported government healthcare schemes covering eligible procedures.' },
]

const warningSigns = [
  'Severe or rapidly worsening abdominal pain',
  'Persistent high fever or chills after surgery',
  'Heavy bleeding or pus discharge from the surgical incision site',
  'Inability to pass gas, bowel movements, or persistent vomiting',
  'Severe shortness of breath or sudden chest pain',
  'Redness, severe swelling, or spreading warmth around incisions',
  'Jaundice (yellowing of skin or eyes)',
  'Extreme dizziness, confusion, or fainting episodes',
]

const emergencyNote =
  'Severe breathing difficulties, uncontrolled heavy bleeding, acute chest pain, or sudden severe abdominal distress require immediate attention. Do not wait for a scheduled appointment—go to the nearest emergency department right away.'

const checklist = [
  'A valid photo ID for patient and primary attendant',
  'Doctor prescription, previous medical reports, scans, and blood tests',
  'A complete list of regular medications, especially blood thinners',
  'Note of known drug allergies or past reactions to anesthesia',
  'Strict adherence to pre-op fasting (eating and drinking) guidelines given',
  'Insurance policy card, TPA details, or pre-authorization approval documents',
  'Comfortable, loose-fitting clothing and essential personal toiletries',
  'A family member or responsible escort to accompany you',
  'Any specific questions written down for your surgeon or anesthetist',
]

const related = [
  { Icon: FaKitMedical, title: 'Operating Theatre', text: 'State-of-the-art sterile surgical suites.', to: '/services/ot' },
  { Icon: FaBedPulse, title: 'Intensive Care Unit (ICU)', text: '24/7 advanced critical care support.', to: '/services/icu' },
  { Icon: FaUsers, title: 'Our Wards', text: 'Comfortable private and semi-private rooms.', to: '/services/ward' },
  { Icon: FaShieldHalved, title: 'Pathology Lab', text: 'Comprehensive pre-op and post-op diagnostics.', to: '/services/pathology-lab' },
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

const GeneralSurgery = () => {
  const [checked, setChecked] = useState([])

  const toggleItem = (item) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))

  const allReady = checked.length === checklist.length
  const phoneHref = `tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, '')}`
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <div className="w-full bg-white" id="general-surgery">
      <Helmet>
        <title>Advanced General & Laparoscopic Surgery in Jogeshwari West | Mallika Hospital</title>
        <meta name="description" content="Consult top general surgeons at Mallika Hospital, Jogeshwari West, Mumbai. Specialized in laparoscopic treatments, hernia repairs, appendix, gallbladder removals, and laser piles surgery." />
        <link rel="canonical" href="https://mallikahospital.co.in/surgeries/general-surgery" />
      </Helmet>

      {/* Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img} alt="General & Laparoscopic Surgery" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">General &amp; Laparoscopic Surgery</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Expert surgical care for a wide range of conditions, using advanced techniques for a faster recovery.
          </p>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our General &amp; Laparoscopic" highlight="Specialists" />

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
          <SectionHeading before="Your Partner in" highlight="Surgical Health" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our General Surgery department provides comprehensive care for conditions that may require surgical intervention. 
            We are dedicated to providing the safest and most effective surgical treatments, from diagnosis to post-operative recovery.
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
            Every patient and every surgery is different. Your surgeon will explain what applies to you.
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
          <SectionHeading before="Our Surgical" highlight="Procedures" />

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
              A Focus on Your <span className="text-brand-red">Well-being</span>
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
              alt="General Surgery Care"
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
            A general guide to what recovery can look like. Your surgeon's instructions always come first.
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
                <h3 className="text-xl font-bold text-brand-blue-dark sm:text-2xl">See a general surgeon if you notice</h3>
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
            Tick off what you have prepared before your surgery.
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
              This is a general list. Always follow the specific instructions your surgeon and anesthesia team give you
              for your own surgery, especially about eating, drinking and medicines.
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
            Have a Question About <span className="text-brand-green">General Surgery?</span>
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
            Severe breathing difficulties, uncontrolled heavy bleeding, or acute abdominal distress need emergency
            care. Do not wait for an appointment. Call us or go to the nearest emergency department right away.
          </p>
        </div>
      </section>
    </div>
  )
}

export default GeneralSurgery