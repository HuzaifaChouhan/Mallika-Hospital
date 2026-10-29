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
  FaBaby,
  FaChild,
  FaHeart,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

const HOSPITAL_PHONE = '+91 9082097421'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with real pediatricians.
---------------------------------------------------------------- */
const doctors = [
  { id: 1, name: 'Dr. Name Surname', department_name: 'Pediatrics', display_available_days: 'Monday to Saturday', start_time: '10:00', end_time: '13:00', phone: '', photo_url: '', active: true },
  { id: 2, name: 'Dr. Name Surname', department_name: 'Pediatrics', display_available_days: 'Monday, Wednesday, Friday', start_time: '16:00', end_time: '19:00', phone: '', photo_url: '', active: true },
  { id: 3, name: 'Dr. Name Surname', department_name: 'Pediatrics', display_available_days: 'Tuesday, Thursday, Saturday', start_time: '11:00', end_time: '14:00', phone: '', photo_url: '', active: true },
  { id: 4, name: 'Dr. Name Surname', department_name: 'Pediatrics', display_available_days: 'Monday to Saturday', start_time: '', end_time: '', phone: '', photo_url: '', active: true },
]

const partnershipPoints = [
  {
    Icon: FaStethoscope,
    title: 'Well-Child Visits',
    text: 'We focus on regular check-ups, developmental screenings, and vaccinations to keep your child healthy and growing strong.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Sick Visits',
    text: 'We offer prompt appointments for when your child is unwell, providing compassionate clinical care and peace of mind.',
  },
  {
    Icon: FaHeart,
    title: 'Parental Guidance',
    text: 'We take the time to answer your questions and provide expert advice on nutrition, sleep routines, and developmental milestones.',
  },
]

const expertise = [
  {
    Icon: FaBaby,
    title: 'Newborn & Infant Care',
    text: 'We provide specialized, gentle care for your newest family members, including newborn check-ups, feeding and lactation support, and guidance for new parents.',
    img: img3,
    alt: 'Doctor holding a newborn baby hand',
  },
  {
    Icon: FaKitMedical,
    title: 'Vaccinations & Preventative Care',
    text: 'We strictly follow recommended immunization schedules to protect your child from preventable infectious diseases while performing comprehensive wellness exams.',
    img: img4,
    alt: 'Child getting a gentle check-up',
  },
  {
    Icon: FaChild,
    title: 'Developmental & Behavioral Health',
    text: 'We monitor your child’s growth milestones closely, offering screenings and supportive guidance for developmental progress, learning concerns, and behavioral needs.',
    img: img5,
    alt: 'Pediatrician talking with a child and parent',
  },
]

/* ---------------------------------------------------------------
   CHILD HEALTH RISK & MILESTONE CHECK
---------------------------------------------------------------- */
const MODERATE_AT = 3
const HIGH_AT = 6

const riskQuestions = [
  {
    title: 'Do any of these apply to your child’s health history or development?',
    hint: 'Early identification of developmental or health factors ensures prompt support.',
    weight: 1,
    options: [
      { id: 'premature', label: 'Born prematurely or with low birth weight' },
      { id: 'allergies', label: 'History of chronic allergies, asthma, or frequent eczema' },
      { id: 'milestones', label: 'Exhibiting potential delays in speech, motor skills, or social interaction' },
      { id: 'family', label: 'Family history of childhood conditions, asthma, or genetic disorders' },
      { id: 'feed', label: 'Past or ongoing difficulties with feeding, weight gain, or nutrition' },
      { id: 'age', label: 'Infant or toddler under 2 years of age requiring routine developmental oversight' },
    ],
  },
  {
    title: 'Has your child experienced any of these symptoms recently?',
    hint: 'Children can show illness subtly; note any recent physical or behavioral changes.',
    weight: 2,
    options: [
      { id: 'fever', label: 'Frequent recurring fevers or persistent unexplained cough' },
      { id: 'stomach', label: 'Ongoing digestive issues, frequent vomiting, or chronic diarrhea' },
      { id: 'sleep', label: 'Severe sleep disturbances, extreme lethargy, or unusual irritability' },
      { id: 'breathing', label: 'Rapid breathing, wheezing, or shortness of breath with mild activity' },
      { id: 'earpain', label: 'Frequent ear pulling, earaches, or recurrent throat infections' },
      {
        id: 'severe',
        label: 'High persistent fever unresponsive to medication, lethargy with difficulty waking up, or signs of dehydration',
        redFlag: true,
      },
    ],
  },
  {
    title: 'Do any of these routine care factors apply?',
    hint: 'Keeping up with preventative care keeps childhood illness minimized.',
    weight: 1,
    options: [
      { id: 'vax', label: 'My child has missed or delayed scheduled vaccinations' },
      { id: 'checkup', label: 'It has been more than a year since my child’s last wellness check' },
      { id: 'screen', label: 'I have unanswered concerns about my child’s growth or behavior' },
      { id: 'diet', label: 'My child is a very picky eater with restrictive nutritional habits' },
    ],
  },
]

const riskResults = {
  low: {
    title: 'Lower risk based on your answers',
    text: 'Your child’s health indicators appear stable. Continue regular wellness check-ups, maintain a nutritious diet, and keep vaccination schedules up to date.',
  },
  moderate: {
    title: 'Some developmental or health factors noted',
    text: 'A few of your answers suggest areas where professional pediatric guidance could benefit your child’s growth. We suggest booking a check-up with our pediatric team.',
  },
  high: {
    title: 'We recommend seeing a pediatrician soon',
    text: 'Your answers indicate symptoms or health factors that warrant a professional evaluation. Please book a consultation with one of our pediatric specialists promptly.',
  },
}

const levelStyles = {
  low: { Icon: FaCircleCheck, text: 'text-brand-green', border: 'border-brand-green' },
  moderate: { Icon: FaTriangleExclamation, text: 'text-amber-500', border: 'border-amber-500' },
  high: { Icon: FaTriangleExclamation, text: 'text-brand-red', border: 'border-brand-red' },
}

const emergencyNote =
  'If your child experiences severe breathing difficulty, sudden blue tint around lips, unresponsiveness, severe lethargy, or signs of acute dehydration (no wet diapers), seek emergency medical care immediately.'

/* ---------------------------------------------------------------
   PRECAUTIONS & WARNING SIGNS
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaAppleWhole,
    title: 'Balanced Nutrition',
    text: 'Provide a colorful variety of whole foods, fruits, vegetables, and proteins tailored to your child’s age to support healthy physical and brain development.',
  },
  {
    Icon: FaPersonWalking,
    title: 'Active Playtime',
    text: 'Encourage at least 60 minutes of daily physical play and outdoor activities to build strong bones, muscles, and healthy habits.',
  },
  {
    Icon: FaDroplet,
    title: 'Adequate Hydration',
    text: 'Ensure children drink enough water throughout the day, especially during active play or hot weather.',
  },
  {
    Icon: FaCalendarCheck,
    title: 'Up-to-Date Immunizations',
    text: 'Follow the recommended pediatric vaccination timeline strictly to protect your child against dangerous preventable diseases.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Healthy Sleep Routine',
    text: 'Establish consistent bedtimes and adequate resting hours appropriate for your child’s age group to support cognitive growth.',
  },
  {
    Icon: FaBowlFood,
    title: 'Good Hygiene Habits',
    text: 'Teach children proper handwashing techniques before meals and after playing to minimize common infections.',
  },
  {
    Icon: FaPills,
    title: 'Safe Medication Use',
    text: 'Never administer adult medications or unauthorized dosages to children; always check with your pediatrician for correct weights-based dosing.',
  },
  {
    Icon: FaUserDoctor,
    title: 'Regular Wellness Exams',
    text: 'Attend all scheduled developmental milestone visits and routine pediatric check-ups even when your child appears completely healthy.',
  },
]

const warningSigns = [
  'High, persistent fever that does not respond to fever-reducing medication',
  'Difficulty breathing, wheezing, or noticeable chest retractions',
  'Signs of severe dehydration (dry mouth, crying without tears, no urination)',
  'Sudden extreme lethargy, drowsiness, or unresponsiveness',
  'Unexplained recurrent vomiting or severe abdominal pain',
  'Sudden appearance of an unusual rash accompanied by fever',
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

const Pediatrician = () => {
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
        <img src={img1} alt="Pediatrician department" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Pediatrician</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Providing gentle, expert, and compassionate care for your little ones, from infancy through young adulthood.
          </p>
        </div>
      </section>

      {/* 2. Consultants (four doctor cards, two per row on mobile) */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Pediatrician" highlight="Consultants" />

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
          <SectionHeading before="A Partner in Your" highlight="Child's Health" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our team of board-certified pediatricians is dedicated to the health, growth, and well-being of your children. We provide comprehensive medical care in a friendly, nurturing environment, working with you as a partner to ensure your child grows up healthy and strong.
          </p>
        </div>
      </section>

      {/* 4. Partnership (the “A Partnership for Your ...” section) */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              Care That Grows <span className="text-brand-red">With Them</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We believe in building a lifelong, trusting relationship with your child and your family, centered on communication and preventative care.
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
              alt="Pediatrician happily examining a baby"
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
              Child Health & Milestone Check
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
            <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
              Answer 3 quick questions to see whether a pediatric check-up or developmental consultation is recommended. It takes under a minute.
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
              This quick check is for awareness only. It is not a clinical diagnosis and does not replace professional medical advice from a pediatrician.
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
          <SectionHeading before="Protect Your Child:" highlight="Precautions" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            Simple everyday routines and habits to support healthy childhood development.
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
            These are general guidance tips. If your child has an active health condition, follow your pediatrician's direct instructions.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Pediatrician