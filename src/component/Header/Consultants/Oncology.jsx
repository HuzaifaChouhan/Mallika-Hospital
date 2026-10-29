import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaUserDoctor,
  FaStethoscope,
  FaUsers,
  FaRadiation,
  FaFlask,
  FaHandHoldingMedical,
  FaBanSmoking,
  FaWineGlass,
  FaAppleWhole,
  FaPersonRunning,
  FaSun,
  FaSyringe,
  FaCalendarCheck,
  FaMagnifyingGlass,
  FaTriangleExclamation,
  FaPhone,
  FaArrowRight,
  FaArrowLeft,
  FaClipboardCheck,
  FaRotateLeft,
  FaCircleCheck,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with the real oncologists.
   Only publish details each doctor has confirmed.
   - photo_url: import the photo and put it here, or leave '' for an icon
   - start_time / end_time: 24-hour "HH:MM", or leave '' for "By Appointment"
   - active: true shows "Available", false shows "Unavailable"
---------------------------------------------------------------- */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Oncology', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Oncology', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Oncology', display_available_days: 'Tuesday, Thursday, Saturday', start_time: '11:00', end_time: '14:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Oncology', display_available_days: 'Monday to Saturday', start_time: '', end_time: '', phone: '', photo_url: '', active: true },
]

const partnershipPoints = [
  { Icon: FaUsers, title: 'Multidisciplinary Team', text: 'Your case is reviewed by our Tumor Board, ensuring you benefit from the combined expertise of medical, radiation, and surgical oncologists.' },
  { Icon: FaRadiation, title: 'Advanced Therapies', text: 'We offer the latest in medical oncology (chemo, immunotherapy) and radiation therapy to provide the most effective treatment options.' },
  { Icon: FaHandHoldingMedical, title: 'Supportive Services', text: 'We provide comprehensive support, including pain management, nutritional counseling, and emotional support to help you through treatment.' },
]

const expertise = [
  {
    Icon: FaFlask,
    title: 'Medical Oncology',
    text: 'Our medical oncologists specialize in the use of powerful medications to treat cancer, including chemotherapy, targeted therapy, and immunotherapy, which helps your own body fight cancer.',
    img: img3,
    alt: 'Pharmacist preparing chemotherapy',
  },
  {
    Icon: FaRadiation,
    title: 'Radiation Oncology',
    text: 'Our radiation oncologists use modern technology to deliver precise doses of radiation to cancer cells, minimizing damage to surrounding healthy tissue and maximizing effectiveness.',
    img: img4,
    alt: 'Linear accelerator for radiation therapy',
  },
  {
    Icon: FaHandHoldingMedical,
    title: 'Supportive & Palliative Care',
    text: 'We are committed to your quality of life. Our team provides expert management of treatment side effects, pain relief, and emotional support for you and your family.',
    img: img5,
    alt: 'Support group or counseling session',
  },
]

/* ---------------------------------------------------------------
   CANCER AWARENESS CHECK: have your oncologists review these
   questions, weights and result wording before publishing.
   Scoring: every ticked option adds its question's weight.
   An option marked redFlag jumps straight to the "high" result.
---------------------------------------------------------------- */
const MODERATE_AT = 3
const HIGH_AT = 6

const riskQuestions = [
  {
    title: 'Do any of these apply to your health history?',
    hint: 'These factors are linked with a higher chance of some cancers.',
    weight: 1,
    options: [
      { id: 'family', label: 'A close family member who has had cancer' },
      { id: 'previous', label: 'I have had cancer, or a pre-cancerous condition, in the past' },
      { id: 'age', label: 'I am above 40 years of age' },
      { id: 'weight', label: 'I am overweight' },
      { id: 'infection', label: 'Long-term hepatitis B or C, or a past HPV infection' },
      { id: 'sun', label: 'I spend long hours in strong sun without protection' },
    ],
  },
  {
    title: 'Have you noticed any of these changes recently?',
    hint: 'Most people with these signs do not have cancer, but they are worth getting checked.',
    weight: 2,
    options: [
      { id: 'lump', label: 'A new lump or swelling anywhere in the body, including the breast or neck' },
      { id: 'ulcer', label: 'A mouth ulcer, or a white or red patch, that has not healed in 3 weeks' },
      { id: 'weight', label: 'Weight loss without trying' },
      { id: 'cough', label: 'A cough or hoarse voice that lasts more than 3 weeks, or trouble swallowing' },
      { id: 'bowel', label: 'A lasting change in bowel or urine habits, or blood in the stool or urine' },
      { id: 'bleeding', label: 'Unusual bleeding or discharge, for example between periods or after menopause' },
      { id: 'mole', label: 'A mole or skin spot that changes in size, shape or color' },
      {
        id: 'urgent',
        label: 'Coughing up or vomiting blood, or heavy bleeding that does not stop',
        redFlag: true,
      },
    ],
  },
  {
    title: 'Do any of these habits apply to you?',
    hint: 'Everyday habits add up over the years.',
    weight: 1,
    options: [
      { id: 'tobacco', label: 'I smoke, or chew tobacco, gutka, paan or supari' },
      { id: 'alcohol', label: 'I drink alcohol regularly or heavily' },
      { id: 'diet', label: 'I eat few fruits and vegetables, and a lot of processed or fried food' },
      { id: 'inactive', label: 'I am rarely active, and exercise less than 30 minutes on most days' },
      { id: 'noscreen', label: 'I have not had any cancer screening that my age or sex calls for' },
    ],
  },
]

const riskResults = {
  low: {
    title: 'Lower risk based on your answers',
    text: 'You ticked few or no risk factors. Keep up healthy habits, and ask your doctor which cancer screenings are right for your age and family history.',
  },
  moderate: {
    title: 'Some risk factors or changes were noted',
    text: 'A few of your answers are linked with cancer risk. Most people with these signs do not have cancer, but it is worth having them looked at. We suggest booking a check-up with our oncology team.',
  },
  high: {
    title: 'We recommend seeing a specialist soon',
    text: 'Your answers include several risk factors or changes that should be checked. Most people with these signs do not have cancer, but they need to be looked at early. Please book a consultation at the earliest.',
  },
}

const levelStyles = {
  low: { Icon: FaCircleCheck, text: 'text-brand-green', border: 'border-brand-green' },
  moderate: { Icon: FaTriangleExclamation, text: 'text-amber-500', border: 'border-amber-500' },
  high: { Icon: FaTriangleExclamation, text: 'text-brand-red', border: 'border-brand-red' },
}

const emergencyNote =
  'Heavy bleeding, coughing or vomiting blood, severe breathlessness, or sudden severe pain need urgent care. If you are on cancer treatment and develop a fever, chills, or suddenly feel very unwell, contact your treating team or go to the emergency department right away.'

/* ---------------------------------------------------------------
   PRECAUTIONS: general guidance. Have your doctors review the wording.
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaBanSmoking,
    title: 'Avoid All Tobacco',
    text: 'Smoking and chewing tobacco, gutka, paan and supari are leading causes of cancer. Quitting helps at any age, and our team can guide you.',
  },
  {
    Icon: FaWineGlass,
    title: 'Limit Alcohol',
    text: 'Alcohol raises the risk of several cancers. The less you drink, the lower the risk, and not drinking at all is safest.',
  },
  {
    Icon: FaAppleWhole,
    title: 'Eat Plenty of Plant Foods',
    text: 'Choose fruit, vegetables, whole grains and pulses. Cut back on processed meat, heavily fried food, and sugary drinks.',
  },
  {
    Icon: FaPersonRunning,
    title: 'Stay Active, Keep a Healthy Weight',
    text: 'Aim for about 30 minutes of brisk activity on most days. Being overweight raises the risk of several cancers.',
  },
  {
    Icon: FaSun,
    title: 'Protect Your Skin',
    text: 'Avoid strong midday sun, cover up, and use sunscreen. Watch for new or changing moles and spots.',
  },
  {
    Icon: FaSyringe,
    title: 'Ask About Vaccines',
    text: 'The HPV vaccine can help prevent cervical and some other cancers, and the hepatitis B vaccine helps protect the liver. Ask your doctor if they are right for you.',
  },
  {
    Icon: FaMagnifyingGlass,
    title: 'Know Your Body',
    text: 'Get to know what is normal for you, such as your breasts, skin and mouth, and report any new lump, sore or lasting change early.',
  },
  {
    Icon: FaCalendarCheck,
    title: 'Get Screened Regularly',
    text: 'Ask your doctor which screenings suit your age and family history, such as breast, cervical, oral or bowel checks. Early detection saves lives.',
  },
]

const warningSigns = [
  'A new lump or swelling anywhere in the body',
  'A mouth ulcer or patch that has not healed in 3 weeks',
  'Weight loss without trying, or constant tiredness',
  'A cough, hoarse voice, or trouble swallowing that lasts weeks',
  'A lasting change in bowel or urine habits, or blood in stool or urine',
  'Unusual bleeding or discharge, or a mole that changes',
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

const Oncology = () => {
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
        <img src={img1} alt="Oncology" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Oncology</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Providing advanced, compassionate, and comprehensive medical care for patients on their cancer journey.
          </p>
        </div>
      </section>

      {/* Doctors: 2 per row on mobile */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Oncology" highlight="Consultants" />

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
          <SectionHeading before="A Partnership in Your" highlight="Cancer Journey" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our Department of Oncology is dedicated to providing modern, evidence-based cancer treatment. Our team of
            medical and radiation oncologists works collaboratively to create a personalized treatment plan that
            focuses on both fighting the disease and supporting your overall well-being.
          </p>
        </div>
      </section>

      {/* Partnership */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              Comprehensive &amp; <span className="text-brand-red">Compassionate Care</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We treat the whole person, not just the disease. Our approach is built on three core principles:
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
              alt="Oncologist consulting with a patient"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Cancer awareness check */}
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
              Cancer Awareness Check
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
          <SectionHeading before="Lower Your Risk:" highlight="Precautions" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            Simple everyday habits that lower your chance of cancer and help find it early.
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

                <p className="mt-4 text-sm text-slate-600">
                  Many of these signs have common, harmless causes. They are still worth checking early, because early
                  detection gives the best chance of successful treatment.
                </p>

                <p className="mt-4 text-sm font-medium text-red-800">{emergencyNote}</p>

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
            These are general tips. If you or a family member already has cancer, follow your own doctor's advice on
            treatment, diet and medicines.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Oncology