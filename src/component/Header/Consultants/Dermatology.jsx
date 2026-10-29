import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaUserDoctor,
  FaStethoscope,
  FaKitMedical,
  FaAppleWhole,
  FaPersonWalking,
  FaDroplet,
  FaBanSmoking,
  FaBowlFood,
  FaPills,
  FaCalendarCheck,
  FaTriangleExclamation,
  FaPhone,
  FaArrowRight,
  FaArrowLeft,
  FaClipboardCheck,
  FaRotateLeft,
  FaCircleCheck,
  FaShieldHalved,
  FaHandHoldingMedical,
  FaMagnifyingGlass,
  FaStar,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with real dermatologists.
---------------------------------------------------------------- */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Dermatology', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Dermatology', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Dermatology', display_available_days: 'Tuesday, Thursday, Saturday', start_time: '11:00', end_time: '14:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Dermatology', display_available_days: 'Monday to Saturday', start_time: '', end_time: '', phone: '', photo_url: '', active: true },
]

const partnershipPoints = [
  {
    Icon: FaMagnifyingGlass,
    title: 'Accurate Diagnosis',
    text: 'We use advanced diagnostic tools, including dermoscopy and skin biopsies, to diagnose skin conditions accurately.',
  },
  {
    Icon: FaHandHoldingMedical,
    title: 'Medical & Cosmetic Expertise',
    text: 'Our dermatologists are skilled in treating complex skin diseases and providing advanced aesthetic treatments.',
  },
  {
    Icon: FaUserDoctor,
    title: 'Personalized Plans',
    text: 'We create customized treatment plans tailored to your unique skin type, concerns, and health goals.',
  },
]

const expertise = [
  {
    Icon: FaShieldHalved,
    title: 'Medical Dermatology',
    text: 'We diagnose and treat a wide range of skin, hair, and nail conditions, including severe acne, eczema, psoriasis, rosacea, and persistent skin infections.',
    img: img3,
    alt: 'Close up of a dermatoscope on skin',
  },
  {
    Icon: FaStar,
    title: 'Cosmetic Dermatology',
    text: 'Enhance your natural beauty with our advanced aesthetic procedures, including chemical peels, laser skin resurfacing, scar reduction, and targeted anti-aging therapies.',
    img: img4,
    alt: 'Cosmetic dermatology treatment',
  },
  {
    Icon: FaKitMedical,
    title: 'Dermatologic Surgery & Mole Care',
    text: 'We offer expert skin cancer screenings, mole evaluations, and precise minor surgical procedures to remove lesions with minimal scarring.',
    img: img5,
    alt: 'Doctor analyzing a mole',
  },
]

/* ---------------------------------------------------------------
   DERMATOLOGY RISK CHECK
---------------------------------------------------------------- */
const MODERATE_AT = 3
const HIGH_AT = 6

const riskQuestions = [
  {
    title: 'Do any of these apply to your dermatological history?',
    hint: 'These factors increase susceptibility to chronic skin conditions and lesions.',
    weight: 1,
    options: [
      { id: 'acne', label: 'History of severe or cystic acne that leaves scars' },
      { id: 'psoriasis', label: 'Personal or family history of eczema, psoriasis, or autoimmune skin conditions' },
      { id: 'moles', label: 'Multiple moles or a personal/family history of skin cancer' },
      { id: 'sun', label: 'Frequent sun exposure or history of severe sunburns' },
      { id: 'allergies', label: 'Sensitive skin prone to frequent allergic reactions or contact dermatitis' },
      { id: 'age', label: 'I am 40 years of age or older' },
    ],
  },
  {
    title: 'Have you noticed any of these symptoms recently?',
    hint: 'Changes in skin appearance or persistent irritation require professional clinical review.',
    weight: 2,
    options: [
      { id: 'rash', label: 'Persistent itching, redness, or unexplained rash lasting over 2 weeks' },
      { id: 'hair', label: 'Sudden or excessive hair loss or thinning patches' },
      { id: 'nails', label: 'Discolored, brittle, or painful changes in nails' },
      { id: 'pigment', label: 'Unusual dark spots, hyperpigmentation, or pale patches on skin' },
      { id: 'blisters', label: 'Recurring painful blisters, hives, or non-healing skin sores' },
      {
        id: 'severe',
        label: 'A mole that changed size, shape, or color, bleeds spontaneously, or has irregular borders',
        redFlag: true,
      },
    ],
  },
  {
    title: 'Do any of these daily factors apply to you?',
    hint: 'Everyday lifestyle and skincare habits strongly influence long-term skin health.',
    weight: 1,
    options: [
      { id: 'nosunscreen', label: 'I rarely apply sunscreen when outdoors' },
      { id: 'stress', label: 'I experience high stress, which triggers my skin flare-ups' },
      { id: 'harsh', label: 'I frequently use strong chemical cosmetics without dermatological guidance' },
      { id: 'noscreening', label: 'I have never had a routine full-body mole or skin check-up' },
    ],
  },
]

const riskResults = {
  low: {
    title: 'Lower risk based on your answers',
    text: 'You ticked few or no major skin risk factors. Continue practicing daily sun protection, keep your skin hydrated, and maintain routine skin hygiene.',
  },
  moderate: {
    title: 'Some skin health concerns noted',
    text: 'A few of your answers indicate skin sensitivity, potential allergies, or early signs of a skin condition. Scheduling a consultation with our dermatology team can help prevent flare-ups.',
  },
  high: {
    title: 'We recommend seeing a dermatologist soon',
    text: 'Your answers include symptoms or mole changes that warrant a direct examination. Please book a consultation with a dermatologist at your earliest convenience.',
  },
}

const levelStyles = {
  low: { Icon: FaCircleCheck, text: 'text-brand-green', border: 'border-brand-green' },
  moderate: { Icon: FaTriangleExclamation, text: 'text-amber-500', border: 'border-amber-500' },
  high: { Icon: FaTriangleExclamation, text: 'text-brand-red', border: 'border-brand-red' },
}

const emergencyNote =
  'If you experience a rapidly spreading, painful skin infection with fever, severe allergic reactions causing facial swelling or breathlessness, seek emergency medical care immediately.'

/* ---------------------------------------------------------------
   PRECAUTIONS & WARNING SIGNS
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaShieldHalved,
    title: 'Daily Sun Protection',
    text: 'Apply a broad-spectrum sunscreen with SPF 30 or higher daily, even on cloudy days, to shield skin from harmful UV rays.',
  },
  {
    Icon: FaDroplet,
    title: 'Moisturize Regularly',
    text: 'Keep your skin barrier intact by applying a suitable, gentle moisturizer immediately after bathing while skin is still damp.',
  },
  {
    Icon: FaAppleWhole,
    title: 'Nutrient-Rich Diet',
    text: 'Eat a balanced diet rich in antioxidants, vitamins C and E, and healthy fats to support skin cell repair and elasticity.',
  },
  {
    Icon: FaPersonWalking,
    title: 'Manage Stress',
    text: 'Practice stress-reduction techniques like regular exercise and adequate sleep, as stress frequently triggers inflammatory skin conditions.',
  },
  {
    Icon: FaBanSmoking,
    title: 'Avoid Smoking',
    text: 'Smoking restricts blood flow to the skin, accelerates premature aging, wrinkles, and delays wound healing.',
  },
  {
    Icon: FaBowlFood,
    title: 'Gentle Cleansing',
    text: 'Avoid harsh soaps, hot water, and excessive scrubbing that strip natural oils and disrupt the delicate skin barrier.',
  },
  {
    Icon: FaPills,
    title: 'Avoid Unprescribed Creams',
    text: 'Never use strong steroid creams or unverified skin-lightening products without explicit advice from a qualified doctor.',
  },
  {
    Icon: FaCalendarCheck,
    title: 'Annual Skin Checks',
    text: 'Perform regular self-examinations of your skin and moles, and schedule an annual check-up if you have a history of sun exposure.',
  },
]

const warningSigns = [
  'A mole or spot that changes in size, shape, or color (ABCDE criteria)',
  'Persistent non-healing skin sores or spots that bleed easily',
  'Severe, widespread skin itching or red patches that worsen overtime',
  'Sudden rapid loss of hair in patches or hair thinning',
  'Painful, pus-filled skin lesions or spreading redness with warmth',
  'Thickened, scaly, or silvery plaques on elbows, knees, or scalp',
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

const Dermatology = () => {
  // Risk check state
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState([])

  const totalSteps = riskQuestions.length
  const finished = step >= totalSteps
  const currentQuestion = riskQuestions[step]

  const toggleOption = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const score = riskQuestions.reduce(
    (sum, q) => sum + q.options.filter((o) => selected.includes(o.id)).length * q.weight,
    0
  )
  const hasRedFlag = riskQuestions.some((q) => q.options.some((o) => o.redFlag && selected.includes(o.id)))
  const level = hasRedFlag || score >= HIGH_AT ? 'high' : score >= MODERATE_AT ? 'moderate' : 'low'

  const result = riskResults[level]
  const style = levelStyles[level]
  const ResultIcon = style.Icon

  const restartCheck = () => {
    setSelected([])
    setStep(0)
  }

  return (
    <div className="w-full bg-white">
      {/* 1. Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Dermatology department" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Dermatology</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Experts in medical, surgical, and cosmetic care for your skin, hair, and nails.
          </p>
        </div>
      </section>

      {/* 2. Consultants (four doctor cards, two per row on mobile) */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Dermatology" highlight="Consultants" />

          {doctors.length === 0 ? (
            <p className="mt-10 text-center text-slate-600">Our consultant list will be updated soon.</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Intro (“Experts in ...”) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="Science and Art for" highlight="Healthy Skin" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our team of board-certified dermatologists is dedicated to the health and vitality of your skin. We offer comprehensive medical, surgical, and aesthetic services to help you achieve and maintain healthy, radiant skin at every stage of life.
          </p>
        </div>
      </section>

      {/* 4. Partnership (the “A Partnership for Your ...” section) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              A Personalized Approach to <span className="text-brand-red">Skin Health</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We believe that healthy skin is a reflection of overall wellness. We combine medical clinical expertise with modern techniques to provide you with individual care.
            </p>

            <ul className="mt-6 space-y-5">
              {partnershipPoints.map(({ Icon, title, text }) => (
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
              alt="Dermatologist examining a patient's skin"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* 5. Risk Check (the quiz) */}
      <section
        id="risk-check"
        className="scroll-mt-28 bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white/15 text-xl ring-1 ring-white/30 sm:size-14 sm:text-2xl">
              <FaClipboardCheck />
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Skin Health Risk Check
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
            <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
              Answer 3 quick questions to see whether a dermatology consultation or mole evaluation is recommended. It takes under a minute.
            </p>
          </div>

          <div className="mt-8 bg-white p-4 text-slate-800 shadow-2xl sm:mt-10 sm:p-8">
            {!finished ? (
              <>
                {/* Progress */}
                <div className="flex items-center justify-between text-sm font-semibold text-brand-blue-dark">
                  <span>
                    Question {step + 1} of {totalSteps}
                  </span>
                  <span className="text-xs text-slate-500 sm:text-sm">Tick all that apply</span>
                </div>
                <div className="mt-3 flex gap-2" aria-hidden="true">
                  {riskQuestions.map((q, i) => (
                    <span key={q.title} className={`h-1.5 flex-1 ${i <= step ? 'bg-brand-blue' : 'bg-slate-200'}`} />
                  ))}
                </div>

                <fieldset key={step} className="mt-5 sm:mt-6">
                  <legend className="text-lg font-bold leading-snug text-brand-blue-dark sm:text-2xl">
                    {currentQuestion.title}
                  </legend>
                  {currentQuestion.hint && <p className="mt-1 text-sm text-slate-500">{currentQuestion.hint}</p>}

                  <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
                    {currentQuestion.options.map((o) => {
                      const checked = selected.includes(o.id)
                      return (
                        <label
                          key={o.id}
                          className={`flex cursor-pointer items-start gap-3 border p-3 transition sm:p-4 ${
                            checked
                              ? 'border-brand-blue bg-brand-blue-light'
                              : 'border-slate-200 hover:border-brand-blue/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOption(o.id)}
                            className="mt-0.5 size-5 shrink-0 accent-brand-blue"
                          />
                          <span className="text-sm text-slate-700 sm:text-base">{o.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-2 border-2 border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white sm:px-5 sm:py-3 sm:text-base"
                    >
                      <FaArrowLeft /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-blue-dark sm:px-6 sm:py-3 sm:text-base"
                  >
                    {step === totalSteps - 1 ? 'See My Result' : 'Next'} <FaArrowRight />
                  </button>
                </div>
              </>
            ) : (
              <div aria-live="polite">
                <div className={`border-l-4 bg-slate-50 p-4 sm:p-6 ${style.border}`}>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <ResultIcon className={`mt-1 shrink-0 text-2xl sm:text-3xl ${style.text}`} />
                    <div>
                      <h3 className="text-lg font-bold leading-snug text-brand-blue-dark sm:text-2xl">{result.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{result.text}</p>
                      <p className="mt-3 text-sm text-slate-500">
                        You ticked {selected.length} {selected.length === 1 ? 'item' : 'items'} in total.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
                  >
                    Book a Consultation <FaArrowRight />
                  </Link>
                  <a
                    href={`tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                  >
                    <FaPhone /> Call {HOSPITAL_PHONE}
                  </a>
                  <button
                    type="button"
                    onClick={restartCheck}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 font-semibold text-slate-600 transition hover:text-brand-blue"
                  >
                    <FaRotateLeft /> Start Again
                  </button>
                </div>

                <p className="mt-6 flex items-start gap-2 bg-red-50 p-4 text-sm font-medium text-red-800">
                  <FaTriangleExclamation className="mt-0.5 shrink-0" />
                  {emergencyNote}
                </p>
              </div>
            )}

            <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
              This quick check is for awareness only. It is not a clinical diagnosis and does not replace professional medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Our Areas of Expertise */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Areas of" highlight="Expertise" />

          <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
            {expertise.map(({ Icon, title, text, img, alt }, i) => (
              <article
                key={title}
                className={`flex flex-col items-stretch overflow-hidden bg-white shadow-md ring-1 ring-slate-100 md:flex-row ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex flex-col justify-center border-t-4 border-brand-blue p-5 sm:p-8 md:w-1/2 md:border-l-4 md:border-t-0">
                  <span className="flex size-12 items-center justify-center rounded-full bg-brand-blue-light text-xl text-brand-blue sm:size-14 sm:text-2xl">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-brand-blue-dark sm:text-2xl">{title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{text}</p>
                </div>

                <div className="h-48 sm:h-64 md:h-auto md:w-1/2">
                  <img src={img} alt={alt} loading="lazy" className="size-full object-cover" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Precautions, with the “see a doctor promptly” warning box */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Protect Your Skin:" highlight="Precautions" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            Simple everyday habits and skincare routines to maintain healthy, resilient skin.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {precautions.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-t-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-5"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue sm:size-12 sm:text-xl">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-base">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">{text}</p>
              </li>
            ))}
          </ul>

          {/* When to see a doctor */}
          <div className="mt-10 border-l-4 border-brand-red bg-white p-5 shadow-md ring-1 ring-slate-100 sm:mt-12 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl text-brand-red">
                <FaTriangleExclamation />
              </span>
              <div>
                <h3 className="text-xl font-bold text-brand-blue-dark sm:text-2xl">See a doctor promptly if you notice</h3>
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
                    href={`tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-red px-6 py-3 font-semibold text-brand-red transition hover:bg-brand-red hover:text-white"
                  >
                    <FaPhone /> Call {HOSPITAL_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            These are general skin tips. If you have an active dermatological condition, follow your specialist's direct recommendations regarding treatment.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Dermatology