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
  FaMicroscope,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with real hematologists.
---------------------------------------------------------------- */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Hematology', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Hematology', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Hematology', display_available_days: 'Tuesday, Thursday, Saturday', start_time: '11:00', end_time: '14:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Hematology', display_available_days: 'Monday to Saturday', start_time: '', end_time: '', phone: '', photo_url: '', active: true },
]

const partnershipPoints = [
  {
    Icon: FaStethoscope,
    title: 'Advanced Diagnostics',
    text: 'We utilize state-of-the-art flow cytometry, bone marrow evaluations, and coagulation studies for accurate diagnostics.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Targeted Therapy',
    text: 'Formulating personalized medication protocols, targeted immunotherapies, and coordinated care strategies for specialized treatments.',
  },
  {
    Icon: FaUserDoctor,
    title: 'Chronic Management',
    text: 'Providing continuous, empathetic clinical management for long-term clotting, bleeding, and genetic hematological conditions.',
  },
]

const expertise = [
  {
    Icon: FaDroplet,
    title: 'Anemia & Red Blood Cell Disorders',
    text: 'We provide targeted clinical care paths for severe iron-deficiency anemias, vitamin deficiencies, hemolytic anemias, sickle cell disease, thalassemia, and polycythemia configurations.',
    img: img3,
    alt: 'Microscopic view of red blood cells layout',
  },
  {
    Icon: FaMicroscope,
    title: 'Hematologic Malignancies',
    text: 'Our specialists deliver comprehensive treatment protocols for hematological cancers, managing acute and chronic leukemias, lymphomas (Hodgkin and non-Hodgkin), and multiple myelomas.',
    img: img4,
    alt: 'Medical professional analyzing blood samples under a microscope',
  },
  {
    Icon: FaKitMedical,
    title: 'Coagulation & Bleeding Disorders',
    text: 'We offer expert management plans for abnormal bleeding or hypercoagulation trends, treating hemophilia, Von Willebrand disease, deep vein thrombosis (DVT), and platelet count anomalies.',
    img: img5,
    alt: 'Patient undergoing therapeutic blood monitoring setup',
  },
]

/* ---------------------------------------------------------------
   HEMATOLOGY RISK CHECK
---------------------------------------------------------------- */
const MODERATE_AT = 3
const HIGH_AT = 6

const riskQuestions = [
  {
    title: 'Do any of these apply to your blood health history?',
    hint: 'These factors are linked with a higher chance of blood or bone marrow conditions.',
    weight: 1,
    options: [
      { id: 'anemia', label: 'History of chronic anemia or iron deficiency' },
      { id: 'bleeding', label: 'Frequent unexplained bruising or prolonged bleeding from minor cuts' },
      { id: 'clotting', label: 'History of blood clots, DVT, or pulmonary embolism' },
      { id: 'family', label: 'Blood disorders, hemophilia, or blood cancers in close family members' },
      { id: 'fatigue', label: 'Unexplained chronic fatigue or weakness' },
      { id: 'age', label: 'I am 50 years of age or older' },
    ],
  },
  {
    title: 'Have you noticed any of these symptoms recently?',
    hint: 'Hematologic issues can present subtly, so monitoring physical changes is vital.',
    weight: 2,
    options: [
      { id: 'paleness', label: 'Unusual pale skin, pale nail beds, or frequent shortness of breath' },
      { id: 'infections', label: 'Frequent, recurring infections or slow-healing sores' },
      { id: 'swelling', label: 'Swollen lymph nodes in the neck, armpits, or groin without pain' },
      { id: 'dizziness', label: 'Frequent dizziness, light-headedness, or cold hands and feet' },
      { id: 'bleedinggums', label: 'Spontaneous nosebleeds or bleeding gums without clear cause' },
      {
        id: 'severe',
        label: 'Severe unprovoked bruising, extreme fatigue causing inability to function, or high fever with chills',
        redFlag: true,
      },
    ],
  },
  {
    title: 'Do any of these lifestyle or medical factors apply to you?',
    hint: 'Daily habits and underlying health status impact systemic blood health.',
    weight: 1,
    options: [
      { id: 'diet', label: 'I follow a restrictive diet without proper nutritional supplementation' },
      { id: 'meds', label: 'I regularly take blood thinners or anti-platelet medications' },
      { id: 'toxins', label: 'I have had prolonged occupational exposure to radiation or chemical toxins' },
      { id: 'noscreen', label: 'I have not had a routine complete blood count (CBC) test in over a year' },
    ],
  },
]

const riskResults = {
  low: {
    title: 'Lower risk based on your answers',
    text: 'You ticked few or no hematologic risk factors. Maintain a balanced diet, stay hydrated, and have your complete blood count checked during annual physicals.',
  },
  moderate: {
    title: 'Some blood health risk factors noted',
    text: 'A few of your answers indicate potential blood count or coagulation sensitivities. Simple diagnostic blood tests can provide valuable insights. We suggest scheduling an evaluation with our hematology team.',
  },
  high: {
    title: 'We recommend seeing a hematology specialist soon',
    text: 'Your answers include key risk factors or symptoms that warrant prompt medical evaluation. Please book a consultation with a hematologist at your earliest convenience.',
  },
}

const levelStyles = {
  low: { Icon: FaCircleCheck, text: 'text-brand-green', border: 'border-brand-green' },
  moderate: { Icon: FaTriangleExclamation, text: 'text-amber-500', border: 'border-amber-500' },
  high: { Icon: FaTriangleExclamation, text: 'text-brand-red', border: 'border-brand-red' },
}

const emergencyNote =
  'If you experience severe unstopped bleeding, sudden extreme breathlessness, high fever with severe weakness, or signs of acute thrombosis, seek emergency medical care immediately.'

/* ---------------------------------------------------------------
   PRECAUTIONS & WARNING SIGNS
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaAppleWhole,
    title: 'Nutritious Iron-Rich Diet',
    text: 'Consume foods rich in iron, folate, and Vitamin B12 (such as leafy greens, lentils, lean meats, and fortified grains) to support healthy red blood cell production.',
  },
  {
    Icon: FaPersonWalking,
    title: 'Moderate Physical Activity',
    text: 'Engage in regular, moderate exercise to promote healthy circulation and cardiovascular vitality without overexertion.',
  },
  {
    Icon: FaDroplet,
    title: 'Stay Hydrated',
    text: 'Drink adequate water daily to maintain optimal blood volume and viscosity, supporting smooth circulation throughout the body.',
  },
  {
    Icon: FaBanSmoking,
    title: 'Avoid Tobacco',
    text: 'Smoking impairs oxygen transport in the blood and significantly raises overall cardiovascular and oncological risks.',
  },
  {
    Icon: FaBowlFood,
    title: 'Balanced Nutrition',
    text: 'Limit highly processed foods and maintain balanced nutrition to support robust bone marrow and immune function.',
  },
  {
    Icon: FaPills,
    title: 'Medication Adherence',
    text: 'Take prescribed blood thinners, iron supplements, or hematologic medications strictly as directed by your physician.',
  },
  {
    Icon: FaCalendarCheck,
    title: 'Routine Blood Counts',
    text: 'Get periodic Complete Blood Count (CBC) screenings done as advised by your doctor to monitor baseline health markers.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Infection Prevention',
    text: 'Practice good hygiene, stay current on recommended vaccinations, and protect yourself against preventable infections.',
  },
]

const warningSigns = [
  'Unexplained, severe, or persistent fatigue and weakness',
  'Frequent bruising, prolonged bleeding, or spontaneous nosebleeds',
  'Unexplained pale skin or chronic shortness of breath with mild exertion',
  'Swollen lymph nodes in the neck, armpits, or groin',
  'Recurrent infections or slow-healing wounds',
  'Unexplained fevers, night sweats, or sudden weight loss',
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

const Hematology = () => {
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
        <img src={img1} alt="Hematology department" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Hematology</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Experts in blood health, dedicated to diagnosing and treating blood disorders and hematologic malignancies with absolute precision.
          </p>
        </div>
      </section>

      {/* 2. Consultants (four doctor cards, two per row on mobile) */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Hematology" highlight="Consultants" />

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
          <SectionHeading before="Leaders in" highlight="Blood & Bone Marrow Disorders" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our team of board-certified hematologists specializes in preventing, diagnosing, and treating conditions affecting red blood cells, white blood cells, platelets, and bone marrow tissues. We combine cutting-edge clinical pathology with customized systemic therapies to manage both benign and malignant blood disorders.
          </p>
        </div>
      </section>

      {/* 4. Partnership (the “A Partnership for Your ...” section) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              A Partnership for Your <span className="text-brand-red">Systemic Health</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We understand that conditions of the blood affect the entire body. We are committed to providing you with clear insights, advanced options, and comprehensive monitoring plans.
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
              alt="Hematologist consulting with a patient about blood work"
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
              Blood Health Risk Check
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
            <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
              Answer 3 quick questions to see whether a hematology consultation or blood work evaluation is recommended. It takes under a minute.
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
              This quick check is for awareness only. It is not a clinical diagnosis and does not replace professional advice from a specialist.
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
          <SectionHeading before="Protect Your Blood Health:" highlight="Precautions" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            Simple everyday habits and nutritional practices to maintain optimal blood and systemic health.
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
            These are general health tips. If you have an active blood disorder, follow your specialist's direct recommendations regarding treatment and lifestyle.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Hematology