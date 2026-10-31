import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaHeartPulse,
  FaMicroscope,
  FaLaptopMedical,
  FaXRay,
  FaShieldHalved,
  FaBolt,
  FaClock,
  FaHouse,
  FaEye,
  FaSyringe,
  FaClipboardList,
  FaUserDoctor,
  FaBedPulse,
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

/* Quick facts: taken from the original page text. Have your cardiologists
   confirm them, and add facts only if they are true for Mallika. */
const quickFacts = [
  { Icon: FaClock, value: '1-2 hrs', label: 'Typical procedure time' },
  { Icon: FaHouse, value: 'Same day', label: 'Most patients go home the same day or next morning' },
  { Icon: FaEye, value: 'Awake', label: 'Relaxed with medication during the procedure' },
  { Icon: FaSyringe, value: 'Catheter', label: 'A small catheter, with only mild pressure' },
]

/* Remove any equipment the hospital does not have */
const technology = [
  {
    Icon: FaLaptopMedical,
    title: 'Flat-Panel Detectors',
    text: 'Provides sharper, clearer images with lower radiation doses for enhanced safety and precision.',
  },
  {
    Icon: FaMicroscope,
    title: 'IVUS & OCT Imaging',
    text: 'Intravascular ultrasound and optical coherence tomography for detailed views inside the arteries.',
  },
  {
    Icon: FaHeartPulse,
    title: '3D Rotational Angiography',
    text: "Creates a 3D model of the heart's vessels, allowing for better planning of complex procedures.",
  },
]

/* Remove any procedure the hospital does not perform */
const procedures = [
  {
    Icon: FaXRay,
    title: 'Coronary Angiography',
    text: 'An X-ray test to find out if your coronary arteries are narrowed or blocked.',
  },
  {
    Icon: FaHeartPulse,
    title: 'Percutaneous Coronary Intervention (PCI)',
    text: 'Also known as angioplasty, a procedure to open up blocked coronary arteries.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Stent Placement',
    text: 'A small, expandable mesh tube is placed in an artery to keep it open.',
  },
  {
    Icon: FaBolt,
    title: 'Pacemaker & ICD Implantation',
    text: 'Devices to help control abnormal heart rhythms.',
  },
]

const journey = [
  {
    Icon: FaClipboardList,
    title: 'Before the Procedure',
    text: 'You will receive specific instructions on eating, drinking, and medication. Our team will review the procedure and answer any questions.',
  },
  {
    Icon: FaUserDoctor,
    title: 'During the Procedure',
    text: 'You will be awake but given medication to relax. A small catheter is inserted, and you may feel mild pressure. The procedure typically lasts 1-2 hours.',
  },
  {
    Icon: FaBedPulse,
    title: 'After the Procedure',
    text: 'You will be monitored for several hours. Most patients go home the same day or the next morning. We provide clear instructions for recovery at home.',
  },
]

const gallery = [
  { src: img2, alt: 'Cath lab image 1' },
  { src: img3, alt: 'Cath lab image 2' },
  { src: img4, alt: 'Cath lab image 3' },
]

const checklist = [
  'A valid photo ID',
  'Previous prescriptions, reports, ECGs and scans',
  'A list of all medicines you take now, with doses',
  'Your insurance or TPA card, if you plan to use it',
  'A family member or friend to stay with you',
  "The eating and drinking instructions our team gave you",
  'A note of any allergies, especially to contrast dye, iodine or medicines',
  'Questions you want to ask the team',
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

const CathLab = () => {
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
    <div className="w-full bg-white" id="cathlab">
      {/* 1. Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img
          src={img1}
          alt="Catheterization Laboratory (Cath Lab)"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Cath Lab</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Providing modern diagnostic and interventional cardiology services for your heart health.
          </p>
        </div>
      </section>

      {/* 2. What is a Cath Lab? */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="What is a" highlight="Cath Lab?" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our Catheterization Laboratory is a specialized hospital room equipped with advanced imaging technology. It
            allows our cardiologists to perform minimally invasive tests and procedures to diagnose and treat
            cardiovascular conditions, such as clogged arteries and heart valve problems.
          </p>
        </div>
      </section>

      {/* Quick facts sub-block under What is a Cath Lab? */}
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
            Timings vary from patient to patient. Your cardiologist will explain what to expect in your case.
          </p>
        </div>
      </section>

      {/* 3. Our Advanced Technology */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Advanced" highlight="Technology" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {technology.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="col-span-2 border-t-4 border-brand-blue bg-white p-4 text-center shadow-md ring-1 ring-slate-100 transition duration-300 first:col-span-1 nth-2:col-span-1 hover:-translate-y-1.5 hover:shadow-xl sm:col-span-1 sm:p-6"
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

      {/* 4. Inside Our Cath Lab */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Inside Our" highlight="Cath Lab" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">Tap a photo to see it larger.</p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-5">
            {gallery.map(({ src, alt }, i) => (
              <li key={alt} className={i === gallery.length - 1 && gallery.length % 2 === 1 ? 'col-span-2 sm:col-span-1' : ''}>
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
            Tick off what you have prepared before your visit.
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
            <div className="mt-3 h-2 w-full bg-slate-200" role="progressbar" aria-valuemin={0} aria-valuemax={checklist.length} aria-valuenow={checked.length}>
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
                        isChecked
                          ? 'border-brand-green bg-green-50'
                          : 'border-slate-200 hover:border-brand-blue/50'
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
                You are all set. If you have any questions, call us before your visit.
              </p>
            )}

            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              This is a general list. Always follow the specific instructions your cardiologist and our team give you
              for your own procedure.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Have a Question About a Heart Procedure? */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Have a Question About a <span className="text-brand-green">Heart Procedure?</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
          <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
            Book a consultation with our cardiology team, or call us and we will guide you.
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
            Severe chest pain or pressure, pain spreading to the arm, jaw or back, sudden breathlessness, sweating or
            fainting may be an emergency. Do not wait, and do not drive yourself. Call us or an ambulance right away.
          </p>
        </div>
      </section>

      {/* 7. Procedures Performed */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Procedures" highlight="Performed" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
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

      {/* 8. What to Expect: Your Journey With Us */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="What to Expect:" highlight="Your Journey With Us" />

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

export default CathLab