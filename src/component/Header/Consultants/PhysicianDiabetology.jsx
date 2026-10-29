import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaUserDoctor,
  FaStethoscope,
  FaShieldHalved,
  FaNotesMedical,
  FaHeartPulse,
  FaAppleWhole,
  FaPersonWalking,
  FaDroplet,
  FaPills,
  FaShoePrints,
  FaWeightScale,
  FaCalendarCheck,
  FaTriangleExclamation,
  FaPhone,
  FaArrowRight,
  FaArrowLeft,
  FaClipboardCheck,
  FaRotateLeft,
  FaCircleCheck,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

// Replace these placeholders with real photos
import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with the real physicians.
   Only publish details each doctor has confirmed.
   - photo_url: import the photo and put it here, or leave '' for an icon
   - start_time / end_time: 24-hour "HH:MM", or leave '' for "By Appointment"
   - active: true shows "Available", false shows "Unavailable"
---------------------------------------------------------------- */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Physician & Diabetology', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Physician & Diabetology', display_available_days: 'Monday to Saturday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Physician & Diabetology', display_available_days: 'Monday, Wednesday, Friday', start_time: '', end_time: '', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Physician & Diabetology', display_available_days: 'Tuesday, Thursday, Saturday', start_time: '11:00', end_time: '14:00', phone: '', photo_url: '', active: true },
]

const wellnessPoints = [
  { Icon: FaStethoscope, title: 'Preventative Health', text: 'We focus on routine check-ups, screenings, and vaccinations to keep you healthy.' },
  { Icon: FaNotesMedical, title: 'Chronic Disease Management', text: 'We provide expert, long-term management for conditions like diabetes, hypertension, and asthma.' },
  { Icon: FaUserDoctor, title: 'Coordination of Care', text: 'We serve as your central point of contact, coordinating with specialists to ensure all your health needs are met.' },
]

const expertise = [
  {
    Icon: FaHeartPulse,
    title: 'Diabetology',
    text: 'Our physicians have special expertise in managing all types of diabetes. We provide comprehensive care, including medication management, lifestyle counseling, and monitoring to prevent complications.',
    img: img3,
    alt: 'Doctor reviewing a glucose monitor',
  },
  {
    Icon: FaShieldHalved,
    title: 'Preventative Medicine',
    text: 'We are your proactive partners in health, offering annual physicals, risk assessments, and personalized wellness plans to help you stay ahead of potential health issues.',
    img: img4,
    alt: 'Doctor talking to a healthy patient',
  },
  {
    Icon: FaNotesMedical,
    title: 'Acute & Chronic Care',
    text: 'From treating common illnesses like the flu to managing complex chronic conditions, our physicians provide skilled, evidence-based care to improve your health and quality of life.',
    img: img5,
    alt: 'Physician reviewing a patient chart',
  },
]

/* ---------------------------------------------------------------
   DIABETES RISK CHECK: have your physicians review these questions,
   weights and result wording before publishing.
   Scoring: every ticked option adds its question's weight.
   An option marked redFlag jumps straight to the "high" result.
---------------------------------------------------------------- */
const MODERATE_AT = 3
const HIGH_AT = 6

const riskQuestions = [
  {
    title: 'Do any of these apply to your health history?',
    hint: 'These factors are linked with a higher chance of diabetes and heart problems.',
    weight: 1,
    options: [
      { id: 'family', label: 'A parent, brother or sister with diabetes' },
      { id: 'weight', label: 'I am overweight, or carry extra weight around my waist' },
      { id: 'bp', label: 'High blood pressure or high cholesterol' },
      { id: 'heart', label: 'Heart disease' },
      { id: 'age', label: 'I am above 45 years of age' },
      { id: 'pregnancy', label: 'High sugar during a pregnancy, or PCOS' },
    ],
  },
  {
    title: 'Have you noticed any of these symptoms recently?',
    hint: 'Early diabetes can be silent, so even mild changes are worth noting.',
    weight: 2,
    options: [
      { id: 'thirst', label: 'Unusual thirst, or passing urine very often, especially at night' },
      { id: 'fatigue', label: 'Frequent tiredness or low energy' },
      { id: 'vision', label: 'Blurred vision' },
      { id: 'healing', label: 'Cuts or sores that heal slowly, or frequent infections' },
      { id: 'tingling', label: 'Tingling or numbness in the hands or feet' },
      { id: 'weightloss', label: 'Weight loss without trying' },
      {
        id: 'ketoacidosis',
        label: 'Extreme thirst with vomiting, stomach pain, fruity-smelling breath, or confusion',
        redFlag: true,
      },
    ],
  },
  {
    title: 'Do any of these habits apply to you?',
    hint: 'Everyday habits add up over the years.',
    weight: 1,
    options: [
      { id: 'inactive', label: 'I am rarely active, and exercise less than 30 minutes on most days' },
      { id: 'sugar', label: 'I often have sweets, sugary drinks, or refined foods' },
      { id: 'tobacco', label: 'I smoke or use tobacco' },
      { id: 'sleep', label: 'I sleep less than 6 hours on most nights' },
      { id: 'nocheck', label: 'I have not had a blood sugar test in the past year' },
    ],
  },
]

const riskResults = {
  low: {
    title: 'Lower risk based on your answers',
    text: 'You ticked few or no risk factors. Keep up healthy habits, and have a routine blood sugar check at least once a year, more often if diabetes runs in your family.',
  },
  moderate: {
    title: 'Some risk factors were noted',
    text: 'A few of your answers are linked with diabetes. A simple blood test, such as fasting sugar or HbA1c, can show where you stand. We suggest booking a check-up with our physicians.',
  },
  high: {
    title: 'We recommend seeing a doctor soon',
    text: 'Your answers include several risk factors or symptoms that should be checked. Please book a consultation with a physician or diabetologist at the earliest.',
  },
}

const levelStyles = {
  low: { Icon: FaCircleCheck, text: 'text-brand-green', border: 'border-brand-green' },
  moderate: { Icon: FaTriangleExclamation, text: 'text-amber-500', border: 'border-amber-500' },
  high: { Icon: FaTriangleExclamation, text: 'text-brand-red', border: 'border-brand-red' },
}

const emergencyNote =
  'If you feel very drowsy or confused, are vomiting, have stomach pain with fruity-smelling breath, or your blood sugar is dangerously high or low, do not wait. Go to the nearest emergency department or call us right away.'

/* ---------------------------------------------------------------
   PRECAUTIONS: general guidance. Have your doctors review the wording.
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaAppleWhole,
    title: 'Balanced Nutrition',
    text: 'Choose fiber-rich foods, whole grains, lean protein, and vegetables. Cut back on sweets, sugary drinks and refined carbohydrates.',
  },
  {
    Icon: FaPersonWalking,
    title: 'Stay Physically Active',
    text: 'Aim for about 30 minutes of brisk walking, cycling or swimming on most days (around 150 minutes a week) to improve insulin sensitivity.',
  },
  {
    Icon: FaDroplet,
    title: 'Check Your Blood Sugar',
    text: 'Test as often as your doctor advises, and keep a record to share at your visits. Know what to do when readings are too high or too low.',
  },
  {
    Icon: FaPills,
    title: 'Take Medicines on Time',
    text: 'Never skip or change tablets or insulin on your own. Keep a regular schedule, and tell your doctor about any side effects.',
  },
  {
    Icon: FaShoePrints,
    title: 'Care for Your Feet',
    text: 'Check your feet daily for cuts, blisters or sores, wear well-fitting footwear, and do not walk barefoot.',
  },
  {
    Icon: FaHeartPulse,
    title: 'Protect Your Heart',
    text: 'Keep blood pressure and cholesterol in check, avoid tobacco, and limit alcohol, as diabetes raises the risk of heart disease.',
  },
  {
    Icon: FaWeightScale,
    title: 'Keep a Healthy Weight',
    text: 'Even a modest weight loss can improve blood sugar. Regular sleep and managing stress help too.',
  },
  {
    Icon: FaCalendarCheck,
    title: 'Regular Check-ups',
    text: 'If you have diabetes, ask your doctor about HbA1c every few months, and yearly checks of your eyes, kidneys and feet. Do not skip follow-up visits.',
  },
]

const warningSigns = [
  'Constant thirst, or passing urine much more often than usual',
  'Blood sugar readings that stay high, or that you cannot bring back to normal',
  'Blurred or sudden changes in vision',
  'A cut, blister or sore on the foot that does not heal',
  'Numbness, tingling or burning in the hands or feet',
  'Unexplained weight loss, or constant tiredness',
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

const InternalMedicine = () => {
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
    0,
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
      {/* Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Physician & Diabetology" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Physician &amp; Diabetology</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Your dedicated partners in long-term health, with a special focus on diabetes and chronic disease
            management.
          </p>
        </div>
      </section>

      {/* Doctors: 2 per row on mobile */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Physician & Diabetology" highlight="Consultants" />

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

      {/* Introduction */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="Comprehensive Care for" highlight="Adults" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our team of qualified internal medicine physicians is dedicated to preventing, diagnosing, and treating a
            wide range of adult illnesses. We serve as your primary care providers, offering continuous, coordinated
            care to help you achieve and maintain your best possible health.
          </p>
        </div>
      </section>

      {/* Foundation for wellness */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              A Foundation for Your <span className="text-brand-red">Wellness</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We believe in building a strong, trusting relationship with you, centered on communication, education,
              and personalized care.
            </p>

            <ul className="mt-6 space-y-5">
              {wellnessPoints.map(({ Icon, title, text }) => (
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

          {/* Photo with offset block behind it */}
          <div className="relative mx-3 sm:mx-0">
            <div className="absolute -bottom-3 -right-3 size-full bg-brand-green/30 sm:-bottom-4 sm:-right-4" />
            <img
              src={img2}
              alt="Physician consulting with a patient"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Diabetes risk check */}
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
              Diabetes &amp; Health Risk Check
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
            <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
              Answer 3 quick questions to see whether a check-up is worth booking. It takes under a minute.
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
                    Book a Check-up <FaArrowRight />
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
              This quick check is for awareness only. It is not a diagnosis and does not replace advice from a doctor.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of expertise */}
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

      {/* Precautions: 2 per row on mobile */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Precautions & Lifestyle" highlight="Management" />
          <p className="mx-auto mt-5 max-w-3xl text-center text-slate-600 sm:text-lg">
            Proactive care and proper daily precautions are vital to keeping chronic conditions like diabetes under
            control and preventing long-term complications.
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
            These are general tips. If you already have diabetes or another condition, follow your own doctor's advice on
            diet, exercise and medicines.
          </p>
        </div>
      </section>
    </div>
  )
}

export default InternalMedicine