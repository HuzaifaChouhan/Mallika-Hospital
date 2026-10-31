import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBed,
  FaUserNurse,
  FaUtensils,
  FaWifi,
  FaBell,
  FaBellConcierge,
  FaBaby,
  FaHeart,
  FaHouse,
  FaClipboardList,
  FaXmark,
  FaMagnifyingGlassPlus,
  FaPhone,
  FaArrowRight,
  FaTriangleExclamation,
  FaRotateLeft,
} from 'react-icons/fa6'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* Quick facts: taken from the original page text. Have your ward staff
   confirm them, and add facts only if they are true for Mallika. */
const quickFacts = [
  { Icon: FaUserNurse, value: '24/7', label: 'Nursing care around the clock' },
  { Icon: FaBed, value: 'Private & semi-private', label: 'Rooms for rest and recovery' },
  { Icon: FaWifi, value: 'Free Wi-Fi', label: 'And television for patients' },
  { Icon: FaBell, value: 'Call button', label: 'Nurses available at the press of a button' },
]

/* Remove any amenity the wards do not have */
const features = [
  {
    Icon: FaBed,
    title: 'Comfortable Rooms',
    text: 'Well-appointed private and semi-private rooms designed for rest and recovery.',
  },
  {
    Icon: FaUserNurse,
    title: '24/7 Nursing Care',
    text: 'Our compassionate nursing team is available around the clock to assist with your needs.',
  },
  {
    Icon: FaUtensils,
    title: 'Nutritional Support',
    text: 'Healthy meals tailored to your dietary needs, planned with our dietitians.',
  },
  {
    Icon: FaWifi,
    title: 'Patient Entertainment',
    text: 'Stay connected with complimentary Wi-Fi and access to television and other amenities.',
  },
]

/* List only the wards the hospital really has */
const wards = [
  {
    Icon: FaBellConcierge,
    title: 'General Wards',
    text: 'Semi-private and general wards providing attentive care for patients recovering from a wide range of conditions.',
  },
  {
    Icon: FaBaby,
    title: 'Maternity Ward',
    text: 'A special, nurturing environment for mothers and newborns, featuring private labor and delivery rooms.',
  },
  {
    Icon: FaHeart,
    title: 'Private Rooms',
    text: 'For those seeking enhanced privacy and comfort, our private rooms offer a serene space for recovery.',
  },
]

const journey = [
  {
    Icon: FaClipboardList,
    title: 'Admission',
    text: 'Our front desk staff will guide you through a smooth and efficient admission process, ensuring all necessary information is recorded.',
  },
  {
    Icon: FaBellConcierge,
    title: 'During Your Stay',
    text: 'Meals are served at scheduled times. Nurses are available at the press of a button, and we have clear visiting hours to support your rest.',
  },
  {
    Icon: FaHouse,
    title: 'Discharge',
    text: 'Our team will provide you with detailed instructions for at-home care, medications, and follow-up appointments to ensure a smooth transition.',
  },
]

const gallery = [
  { src: img2, alt: 'Ward image 1' },
  { src: img3, alt: 'Ward image 2' },
  { src: img4, alt: 'Ward image 3' },
]

const checklist = [
  "A valid photo ID, and an attendant's photo ID",
  "Your doctor's admission advice, and any previous reports, scans and prescriptions",
  'A list of the medicines you take now, with doses',
  'A note of any allergies and past reactions to medicines',
  'Your insurance or TPA card, if cashless treatment is planned',
  'Comfortable clothing, toiletries and slippers',
  'A phone and charger',
  'One family member as the main contact, with a working phone number',
  'Valuables and jewelry left safely at home',
  'Questions you want to ask the care team',
]

function SectionHeading({ before, highlight }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl lg:text-5xl">
        {before} <span className="text-brand-red">{highlight}</span>
      </h2>
      <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
    </div>
  )
}

const Ward = () => {
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
    <div className="w-full bg-white" id="ward">
      {/* 1. Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Our Wards" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Our Wards</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            A comfortable and supportive environment designed for your recovery and well-being.
          </p>
        </div>
      </section>

      {/* 2. Comfort & Care During Your Stay (Introduction & Quick facts) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="Comfort & Care During" highlight="Your Stay" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our inpatient wards are designed to provide a healing environment where you can rest and recover with peace
            of mind. With a focus on comfort, privacy, and dedicated medical care, we ensure you feel supported every
            step of the way.
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
                <p className="mt-3 text-lg font-bold leading-tight sm:mt-4 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">{label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-xs text-white/70 sm:text-sm">
            Room types and availability vary. Our front desk will tell you what is available when you are admitted.
          </p>
        </div>
      </section>

      {/* 3. Ward Features & Amenities */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Ward Features &" highlight="Amenities" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {features.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-t-4 border-brand-blue bg-white p-4 text-center shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-6"
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

      {/* 4. Inside Our Wards (Gallery) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Inside Our" highlight="Wards" />
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

      {/* 5. Be Ready: Your Checklist */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading before="Be Ready:" highlight="Your Checklist" />
          <p className="mx-auto mt-5 max-w-xl text-center text-slate-600 sm:text-lg">
            Tick off what you have packed and prepared for your hospital stay.
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
                You are all set. If you have any questions, call us before you come in.
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              This is a general list. Always follow the instructions your doctor and our team give you for your own
              stay, including what to eat, drink and bring.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Planning a Hospital Stay? (Call to action) */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Planning a <span className="text-brand-green">Hospital Stay?</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
          <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
            Call us to ask about rooms and admission, or book a consultation with our team.
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
            If someone needs urgent care, do not wait for an admission or an appointment. Call us or go to the nearest
            emergency department right away.
          </p>
        </div>
      </section>

      {/* 7. Our Wards (Types of Wards) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our" highlight="Wards" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {wards.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-l-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 transition duration-300 last:odd:col-span-2 hover:-translate-y-1.5 hover:shadow-xl sm:p-6 sm:last:odd:col-span-1"
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

      {/* 8. Guide for Patients & Families (Journey) */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Guide for Patients &" highlight="Families" />

          <div className="relative mt-12">
            {/* Line connecting the steps on larger screens */}
            <span className="absolute left-[16.6%] right-[16.6%] top-7 hidden h-0.5 bg-brand-blue/20 md:block" />

            <ol className="relative grid gap-6 md:grid-cols-3">
              {journey.map(({ Icon, title, text }, i) => (
                <li key={title} className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-brand-blue text-xl text-white shadow-lg ring-4 ring-slate-50">
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

export default Ward