import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaUserNurse,
  FaHeartPulse,
  FaShieldVirus,
  FaBandage,
  FaLungs,
  FaVirus,
  FaUsers,
  FaComments,
  FaCouch,
  FaClock,
  FaXmark,
  FaMagnifyingGlassPlus,
  FaPhone,
  FaArrowRight,
  FaTriangleExclamation,
  FaRotateLeft,
} from 'react-icons/fa6'

import img1 from '../../../assets/img.png';
import img2 from '../../../assets/img.png';
import img3 from '../../../assets/img.png';
import img4 from '../../../assets/img.png';

const HOSPITAL_PHONE = '+91 9082097421'

/* Quick facts: taken from the original page text. Have your ICU team
   confirm them, and add facts only if they are true for Mallika. */
const quickFacts = [
  { Icon: FaClock, value: '24/7', label: 'Round-the-clock monitoring' },
  { Icon: FaShieldVirus, value: 'Private rooms', label: 'With isolation capability' },
  { Icon: FaComments, value: 'Regular', label: 'Clear updates for families' },
  { Icon: FaUsers, value: 'Flexible', label: 'Visiting policy for families' },
]

/* Remove any feature the ICU does not have */
const features = [
  {
    Icon: FaUserNurse,
    title: '24/7 Critical Care',
    text: 'Our dedicated team of intensivists, nurses, and therapists is present around the clock to provide constant monitoring and immediate intervention.',
  },
  {
    Icon: FaHeartPulse,
    title: 'Advanced Life Support',
    text: 'Modern equipment including advanced ventilators, hemodynamic monitors, and dialysis machines to support every critical need.',
  },
  {
    Icon: FaShieldVirus,
    title: 'Private Isolation Rooms',
    text: 'We offer private rooms with negative pressure capabilities to ensure patient privacy, comfort, and strict infection control.',
  },
]

/* List only conditions the ICU actually manages */
const conditions = [
  {
    Icon: FaBandage,
    title: 'Post-Surgical Recovery',
    text: 'Close monitoring after major surgeries like open-heart, organ transplants, or neurosurgery.',
  },
  {
    Icon: FaLungs,
    title: 'Severe Respiratory Failure',
    text: 'Providing advanced respiratory support, including mechanical ventilation for conditions like ARDS.',
  },
  {
    Icon: FaVirus,
    title: 'Sepsis & Severe Infections',
    text: 'Rapid response and aggressive treatment for life-threatening infections and septic shock.',
  },
  {
    Icon: FaHeartPulse,
    title: 'Cardiovascular Emergencies',
    text: 'Care for patients after a major heart attack, cardiogenic shock, or unstable cardiac arrhythmias.',
  },
]

const familyCare = [
  {
    Icon: FaUsers,
    title: 'Flexible Visiting Hours',
    text: 'We understand the importance of family presence and offer flexible visiting policies to support our patients and their loved ones.',
  },
  {
    Icon: FaComments,
    title: 'Regular Communication',
    text: "Our team is committed to providing families with regular, clear, and compassionate updates on their loved one's condition.",
  },
  {
    Icon: FaCouch,
    title: 'Comfortable Waiting Area',
    text: 'A quiet and comfortable space is available for families to rest while they remain close to their loved ones.',
  },
]

const gallery = [
  { src: img2, alt: 'ICU image 1' },
  { src: img3, alt: 'ICU image 2' },
  { src: img4, alt: 'ICU image 3' },
]

const checklist = [
  "The patient's photo ID, and an attendant's photo ID",
  'Previous prescriptions, reports, scans and discharge papers',
  "A list of the patient's current medicines, doses and known allergies",
  'A note of the patient\'s medical history and regular doctor',
  'Insurance or TPA card, if cashless treatment is planned',
  'One family member as the main contact, with a working phone number',
  'The ICU visiting hours and hygiene rules our team explained',
  'Questions you want to ask the care team',
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

const ICU = () => {
  const [activeImage, setActiveImage] = useState(null)
  const [checked, setChecked] = useState([])

  // Close the enlarged photo with the Escape key
  useEffect(() => {
    if (!activeImage) return
    const onKey = (e) => e.key === 'Escape' && setActiveImage(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeImage])

  const toggleItem = (item) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))

  const allReady = checked.length === checklist.length

  return (
    <div className="w-full bg-white" id="icu">
      {/* 1. Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Intensive Care Unit (ICU)" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Intensive Care Unit (ICU)</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Delivering critical, round-the-clock care with advanced technology and a dedicated team of experts.
          </p>
        </div>
      </section>

      {/* 2. Introduction & Quick facts */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="A Place for" highlight="Critical Care" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our Intensive Care Unit (ICU) is a specialized department designed to provide comprehensive care for
            patients with life-threatening illnesses or injuries. Staffed by a highly trained team of critical care
            specialists, our ICU is equipped with advanced technology to monitor and support vital organ functions
            24/7.
          </p>
        </div>
      </section>

      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {quickFacts.map(({ Icon, value, label }) => (
              <li
                key={value}
                className="flex flex-col items-center bg-white/10 px-3 py-5 text-center ring-1 ring-white/20 transition duration-300 hover:-translate-y-1 hover:bg-white/20 sm:py-6"
              >
                <Icon className="text-3xl text-white/90 sm:text-4xl" />
                <p className="mt-3 text-xl font-bold sm:mt-4 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">{label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-white/70 sm:text-sm">
            Visiting rules can change with a patient's condition. Our ICU team will explain what applies in your case.
          </p>
        </div>
      </section>

      {/* 3. Our ICU Features */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our ICU" highlight="Features" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {features.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-t-4 border-brand-blue bg-white p-4 text-center shadow-md ring-1 ring-slate-100 transition duration-300 last:odd:col-span-2 hover:-translate-y-1.5 hover:shadow-xl sm:p-6 sm:last:odd:col-span-1"
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-blue-light text-xl text-brand-blue sm:size-14 sm:text-2xl">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Inside Our ICU (Gallery) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Inside Our" highlight="ICU" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">Tap a photo to see it larger.</p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {gallery.map(({ src, alt }) => (
              <li key={alt} className="last:odd:col-span-2 sm:last:odd:col-span-1">
                <button
                  type="button"
                  onClick={() => setActiveImage({ src, alt })}
                  aria-label={`View larger: ${alt}`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden bg-brand-blue-light shadow-md ring-1 ring-slate-100"
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-blue-dark/0 text-2xl text-white opacity-0 transition group-hover:bg-brand-blue-dark/40 group-hover:opacity-100">
                    <FaMagnifyingGlassPlus />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Be Ready: Family Checklist */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading before="Be Ready:" highlight="Family Checklist" />
          <p className="mx-auto mt-5 max-w-xl text-center text-slate-600 sm:text-lg">
            Tick off what you have ready for your loved one's ICU stay.
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
                You are all set. If you have any questions, ask our ICU team or call us.
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              This is a general list. Always follow the ICU team's own rules on visiting, hygiene, and what may be
              brought inside.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Questions About Our ICU? (Call to action) */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Questions About <span className="text-brand-green">Our ICU?</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
          <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
            Call us or book a consultation, and our team will guide you and your family.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-white px-7 py-3.5 font-semibold text-brand-blue-dark shadow-md transition hover:bg-brand-blue-light"
            >
              Book an Appointment <FaArrowRight />
            </Link>
            <a
              href={`tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center justify-center gap-2.5 border-2 border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-brand-blue-dark"
            >
              <FaPhone /> Call {HOSPITAL_PHONE}
            </a>
          </div>

          <p className="mx-auto mt-8 flex max-w-xl items-start gap-2 bg-white/10 p-4 text-left text-sm text-white/90 ring-1 ring-white/20">
            <FaTriangleExclamation className="mt-0.5 shrink-0 text-amber-300" />
            If someone is seriously ill or injured, do not wait for an appointment. Call us or go to the nearest
            emergency department right away.
          </p>
        </div>
      </section>

      {/* 7. Conditions We Manage */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Conditions We" highlight="Manage" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {conditions.map(({ Icon, title, text }) => (
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

      {/* 8. Family-Centered Care */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Family-Centered" highlight="Care" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {familyCare.map(({ Icon, title, text }) => (
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
        </div>
      </section>

      {/* Enlarged photo modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo"
          className="fixed inset-0 z-[999] flex cursor-pointer items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:right-6 sm:top-6"
          >
            <FaXmark size={22} />
          </button>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full cursor-default object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}

export default ICU