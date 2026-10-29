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
  FaLungs,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with real gastroenterologists.
---------------------------------------------------------------- */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Gastroenterology', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Gastroenterology', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Gastroenterology', display_available_days: 'Tuesday, Thursday, Saturday', start_time: '11:00', end_time: '14:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Gastroenterology', display_available_days: 'Monday to Saturday', start_time: '', end_time: '', phone: '', photo_url: '', active: true },
]

const partnershipPoints = [
  {
    Icon: FaStethoscope,
    title: 'Advanced Endoscopy',
    text: 'We perform a full range of diagnostic and therapeutic endoscopic procedures with precision and patient comfort.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Preventative Care',
    text: 'We are strong advocates for life-saving cancer screenings, such as colonoscopies, to detect and prevent disease early.',
  },
  {
    Icon: FaUserDoctor,
    title: 'Chronic Disease Management',
    text: 'We provide long-term, personalized care for complex conditions like IBD, IBS, fatty liver, and pancreatic disorders.',
  },
]

const expertise = [
  {
    Icon: FaKitMedical,
    title: 'Upper GI Endoscopy',
    text: 'We perform upper endoscopies (EGD) to diagnose and treat conditions of the esophagus, stomach, and small intestine, such as GERD, severe acid reflux, ulcers, and celiac disease.',
    img: img3,
    alt: 'Upper GI endoscopy visualization',
  },
  {
    Icon: FaShieldHalved,
    title: 'Colonoscopy & Cancer Screening',
    text: 'Our experts perform colonoscopies to screen for colorectal cancer, detect and remove precancerous polyps, and investigate symptoms like lower GI bleeding and unexplained changes in bowel habits.',
    img: img4,
    alt: 'Doctor analyzing endoscopy scans',
  },
  {
    Icon: FaLungs,
    title: 'Liver & Pancreatic Disease',
    text: 'We provide comprehensive care for complex hepatobiliary conditions like hepatitis, liver cirrhosis, fatty liver disease, and pancreatitis, working to manage symptoms and optimize organ function.',
    img: img5,
    alt: 'Doctor reviewing medical reports',
  },
]

/* ---------------------------------------------------------------
   DIGESTIVE RISK CHECK
---------------------------------------------------------------- */
const MODERATE_AT = 3
const HIGH_AT = 6

const riskQuestions = [
  {
    title: 'Do any of these apply to your digestive health history?',
    hint: 'These clinical factors are strongly linked with underlying GI and liver conditions.',
    weight: 1,
    options: [
      { id: 'gerd', label: 'Chronic acid reflux, severe heartburn, or GERD' },
      { id: 'ibd', label: 'History of IBD, Crohn’s, Ulcerative Colitis, or IBS' },
      { id: 'liver', label: 'Fatty liver disease, elevated liver enzymes, or hepatitis' },
      { id: 'family', label: 'Family history of stomach, liver, or colon cancer' },
      { id: 'ulcer', label: 'Past history of stomach or peptic ulcers' },
      { id: 'age', label: 'I am 45 years of age or older' },
    ],
  },
  {
    title: 'Have you noticed any of these symptoms recently?',
    hint: 'Persistent GI symptoms often signal issues requiring diagnostic endoscopy.',
    weight: 2,
    options: [
      { id: 'pain', label: 'Persistent abdominal pain, cramping, or severe bloating' },
      { id: 'bowel', label: 'Ongoing diarrhea, chronic constipation, or irregular bowel habits' },
      { id: 'swallow', label: 'Difficulty swallowing or feeling like food is stuck' },
      { id: 'weightloss', label: 'Unexplained weight loss or loss of appetite' },
      { id: 'nausea', label: 'Frequent nausea, vomiting, or persistent early fullness' },
      {
        id: 'severe',
        label: 'Black stool, blood in vomit, stool with dark blood, or jaundice (yellow skin/eyes)',
        redFlag: true,
      },
    ],
  },
  {
    title: 'Do any of these lifestyle factors apply to you?',
    hint: 'Daily dietary and lifestyle habits heavily impact gut microbiome and liver health.',
    weight: 1,
    options: [
      { id: 'alcohol', label: 'I consume alcohol regularly' },
      { id: 'tobacco', label: 'I smoke or use tobacco products' },
      { id: 'nsaids', label: 'I frequently take painkillers (NSAIDs) or aspirin' },
      { id: 'diet', label: 'I frequently eat processed, oily, or highly spicy foods' },
      { id: 'noscreen', label: 'I have never had a preventative colonoscopy or stomach check-up' },
    ],
  },
]

const riskResults = {
  low: {
    title: 'Lower risk based on your answers',
    text: 'You ticked few or no major digestive risk factors. Maintain high-fiber dietary habits, stay hydrated, and schedule routine preventive health screenings periodically.',
  },
  moderate: {
    title: 'Some digestive risk factors noted',
    text: 'A few of your answers indicate potential digestive or liver sensitivity. Non-invasive tests or an outpatient consultation can offer clarity. We suggest scheduling an evaluation with our gastroenterology team.',
  },
  high: {
    title: 'We recommend seeing a GI specialist soon',
    text: 'Your answers highlight key risk factors or GI symptoms that warrant direct attention. Please book a consultation with a gastroenterology specialist at your earliest convenience.',
  },
}

const levelStyles = {
  low: { Icon: FaCircleCheck, text: 'text-brand-green', border: 'border-brand-green' },
  moderate: { Icon: FaTriangleExclamation, text: 'text-amber-500', border: 'border-amber-500' },
  high: { Icon: FaTriangleExclamation, text: 'text-brand-red', border: 'border-brand-red' },
}

const emergencyNote =
  'If you experience severe vomiting with blood, dark tarry stools, sudden excruciating abdominal pain, or severe jaundice accompanied by high fever, seek emergency medical care immediately.'

/* ---------------------------------------------------------------
   PRECAUTIONS & WARNING SIGNS
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaAppleWhole,
    title: 'High-Fiber Diet',
    text: 'Eat plenty of fiber-rich foods like vegetables, fruits, legumes, and whole grains to support gut motility and prevent diverticular disease.',
  },
  {
    Icon: FaPersonWalking,
    title: 'Active Lifestyle',
    text: 'Engage in moderate physical activity to stimulate natural intestinal contractions, improve bowel regularity, and prevent fatty liver buildup.',
  },
  {
    Icon: FaDroplet,
    title: 'Hydrate Well',
    text: 'Drink adequate water daily to assist digestive breakdown and keep dietary fiber working efficiently to avoid constipation.',
  },
  {
    Icon: FaBanSmoking,
    title: 'Limit Alcohol & Smoking',
    text: 'Tobacco and excessive alcohol irritate the stomach lining, increase acid reflux, and significantly elevate risks of liver damage and GI cancers.',
  },
  {
    Icon: FaBowlFood,
    title: 'Portion & Diet Management',
    text: 'Avoid heavy, ultra-processed, late-night meals or excessive fried/spicy foods that overwork the stomach and trigger reflux.',
  },
  {
    Icon: FaPills,
    title: 'Caution with Painkillers',
    text: 'Avoid frequent non-prescribed use of NSAIDs like ibuprofen or aspirin, which can erode the stomach lining and cause ulcers.',
  },
  {
    Icon: FaCalendarCheck,
    title: 'Preventative Screening',
    text: 'Schedule routine screening colonoscopies starting at age 45, or earlier if you have a family history of GI malignancies.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Hepatitis Care',
    text: 'Get vaccinated against Hepatitis A and B, and undergo routine liver function checks if you have risk factors for metabolic fatty liver.',
  },
]

const warningSigns = [
  'Persistent upper abdominal pain or burning sensation after eating',
  'Chronic acid reflux, heartburn, or difficulty swallowing food',
  'Blood in stool, unusually dark black stools, or rectal bleeding',
  'Unexplained, significant weight loss or chronic loss of appetite',
  'Yellowing of eyes/skin (jaundice) accompanied by dark urine',
  'Persistent bowel habit changes (diarrhea or constipation lasting weeks)',
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

const Gastroenterology = () => {
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
        <img src={img1} alt="Gastroenterology department" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Gastroenterology</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Experts in digestive health, dedicated to diagnosing and treating disorders of your GI tract with precision and compassion.
          </p>
        </div>
      </section>

      {/* 2. Consultants (four doctor cards, two per row on mobile) */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Gastroenterology" highlight="Consultants" />

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
          <SectionHeading before="Leaders in" highlight="Digestive Health" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our team of board-certified gastroenterologists specializes in preventing, diagnosing, and treating a wide range of conditions affecting the esophagus, stomach, intestines, liver, gallbladder, and pancreas. We combine advanced endoscopic technologies with patient-centered treatment plans to restore your digestive health.
          </p>
        </div>
      </section>

      {/* 4. Partnership (the “A Partnership for Your ...” section) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              A Partnership for Your <span className="text-brand-red">Digestive Wellness</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We are committed to providing you with clear answers and effective treatment plans in a comfortable, modern, and compassionate setting.
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
              alt="Gastroenterologist consulting with a patient"
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
              Digestive Health Risk Check
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
            <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
              Answer 3 quick questions to see whether a gastroenterology consultation or diagnostic test is recommended. It takes under a minute.
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
          <SectionHeading before="Protect Your Gut:" highlight="Precautions" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            Simple everyday dietary and lifestyle habits to maintain optimal digestive health.
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
            These are general health tips. If you have an active GI condition, follow your specialist's direct recommendations regarding diet and medication.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Gastroenterology