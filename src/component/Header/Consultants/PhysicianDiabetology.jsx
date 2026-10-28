import { useState } from 'react'
import {
  FaUserDoctor,
  FaStethoscope,
  FaShieldHalved,
  FaNotesMedical,
  FaHeartPulse,
  FaTriangleExclamation,
  FaAppleWhole,
  FaPersonWalking,
  FaHandHoldingMedical,
  FaCircleCheck,
} from 'react-icons/fa6'
import DoctorCard from '../DoctorCard'

// Replace these placeholders with real photos
import img1 from '../../../assets/img.png'
import img2 from '../../../assets/img.png'
import img3 from '../../../assets/img.png'
import img4 from '../../../assets/img.png'
import img5 from '../../../assets/img.png'

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with the real physicians.
   Only publish details each doctor has confirmed.
   - photo_url: import the photo and put it here, or leave '' for an icon
   - start_time / end_time: 24-hour "HH:MM", or leave '' for "By Appointment"
   - active: true shows "Available", false shows "Unavailable"
---------------------------------------------------------------- */
const doctors = [
  {
    id: 1,
    name: 'Dr. Name Surname',
    department_name: 'Physician & Diabetology',
    display_available_days: 'Monday to Saturday',
    start_time: '10:00',
    end_time: '13:00',
    phone: '',
    photo_url: '',
    active: true,
  },
  {
    id: 2,
    name: 'Dr. Name Surname',
    department_name: 'Physician & Diabetology',
    display_available_days: 'Monday to Saturday',
    start_time: '16:00',
    end_time: '19:00',
    phone: '',
    photo_url: '',
    active: true,
  },
  {
    id: 3,
    name: 'Dr. Name Surname',
    department_name: 'Physician & Diabetology',
    display_available_days: 'Monday, Wednesday, Friday',
    start_time: '',
    end_time: '',
    phone: '',
    photo_url: '',
    active: true,
  },
  {
    id: 4,
    name: 'Dr. Name Surname',
    department_name: 'Physician & Diabetology',
    display_available_days: 'Tuesday, Thursday, Saturday',
    start_time: '11:00',
    end_time: '14:00',
    phone: '',
    photo_url: '',
    active: true,
  },
]

const wellnessPoints = [
  {
    Icon: FaStethoscope,
    title: 'Preventative Health',
    text: 'We focus on routine check-ups, screenings, and vaccinations to keep you healthy.',
  },
  {
    Icon: FaNotesMedical,
    title: 'Chronic Disease Management',
    text: 'We provide expert, long-term management for conditions like diabetes, hypertension, and asthma.',
  },
  {
    Icon: FaUserDoctor,
    title: 'Coordination of Care',
    text: 'We serve as your central point of contact, coordinating with specialists to ensure all your health needs are met.',
  },
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

// Risk Assessment Questionnaire Options
const riskFactors = [
  { id: 'family', label: 'Family history of Diabetes or Heart Disease' },
  { id: 'fatigue', label: 'Frequent fatigue or low daily energy levels' },
  { id: 'thirst', label: 'Unusual thirst or frequent urination' },
  { id: 'bp', label: 'High blood pressure or elevated cholesterol' },
  { id: 'lifestyle', label: 'Sedentary lifestyle / limited daily physical activity' },
]

// Precautions Data
const precautions = [
  {
    Icon: FaAppleWhole,
    title: 'Balanced Nutrition',
    text: 'Maintain a diet rich in fiber, whole grains, lean proteins, and fresh vegetables while actively monitoring carbohydrate and sugar intake, especially for blood sugar management.',
  },
  {
    Icon: FaPersonWalking,
    title: 'Consistent Physical Activity',
    text: 'Engage in at least 30 minutes of moderate exercise daily—such as brisk walking, cycling, or swimming—to improve insulin sensitivity and heart health.',
  },
  {
    Icon: FaTriangleExclamation,
    title: 'Regular Monitoring',
    text: 'Keep track of your vital metrics, including routine blood glucose checks, blood pressure screenings, and periodic lipid profile evaluations.',
  },
  {
    Icon: FaHandHoldingMedical,
    title: 'Adherence & Check-ups',
    text: 'Never skip prescribed medications or insulin schedules. Maintain open communication with your physician and attend your scheduled follow-up consultations.',
  },
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

function SymptomChecker() {
  const [selected, setSelected] = useState([])

  const toggleFactor = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-10">
      <div className="flex items-center gap-3">
        <FaHeartPulse className="text-2xl text-brand-red" />
        <h3 className="text-2xl font-bold text-brand-blue-dark">Quick Health &amp; Risk Assessment</h3>
      </div>
      <p className="mt-2 text-slate-600">
        Select any factors that apply to you for instant care recommendations:
      </p>

      {/* Checkbox Options */}
      <div className="mt-6 space-y-3">
        {riskFactors.map(({ id, label }) => {
          const isChecked = selected.includes(id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggleFactor(id)}
              className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition ${
                isChecked
                  ? 'border-brand-blue bg-brand-blue-light/25 font-medium text-brand-blue-dark'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{label}</span>
              <div
                className={`flex size-6 items-center justify-center rounded-full border ${
                  isChecked
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : 'border-slate-300'
                }`}
              >
                {isChecked && <FaCircleCheck className="text-xs" />}
              </div>
            </button>
          )
        })}
      </div>

      {/* Dynamic Recommendation Output */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
        {selected.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            Select one or more options above to view personalized guidance.
          </p>
        ) : selected.length >= 2 ? (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
              <FaTriangleExclamation />
            </div>
            <div>
              <p className="font-bold text-brand-blue-dark">Comprehensive Evaluation Recommended</p>
              <p className="mt-1 text-sm text-slate-600">
                You checked <strong>{selected.length} potential risk factors</strong>. We recommend scheduling a routine blood test (HbA1c / Lipid profile) and a consultation with our diabetologist.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue">
              <FaCircleCheck />
            </div>
            <div>
              <p className="font-bold text-brand-blue-dark">Preventative Check-up Suggested</p>
              <p className="mt-1 text-sm text-slate-600">
                Even with low immediate risk, an annual preventative health screening ensures early detection and long-term wellness.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const InternalMedicine = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero banner */}
      <section className="relative isolate flex h-80 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Physician & Diabetology" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Physician &amp; Diabetology</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium drop-shadow-md sm:text-xl">
            Your dedicated partners in long-term health, with a special focus on diabetes and chronic disease
            management.
          </p>
        </div>
      </section>

      {/* Doctors */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Physician & Diabetology" highlight="Consultants" />

          {doctors.length === 0 ? (
            <p className="mt-10 text-center text-slate-600">Our consultant list will be updated soon.</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="Comprehensive Care for" highlight="Adults" />
          <p className="mt-8 text-center text-lg leading-relaxed text-slate-700">
            Our team of qualified internal medicine physicians is dedicated to preventing, diagnosing, and treating a
            wide range of adult illnesses. We serve as your primary care providers, offering continuous, coordinated
            care to help you achieve and maintain your best possible health.
          </p>
        </div>
      </section>

      {/* Foundation for wellness */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              A Foundation for Your <span className="text-brand-red">Wellness</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              We believe in building a strong, trusting relationship with you, centered on communication, education,
              and personalized care.
            </p>

            <ul className="mt-6 space-y-5">
              {wellnessPoints.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue">
                    <Icon />
                  </span>
                  <p className="text-slate-700">
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

      {/* Areas of expertise */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Areas of" highlight="Expertise" />

          <div className="mt-12 space-y-8">
            {expertise.map(({ Icon, title, text, img, alt }, i) => (
              <article
                key={title}
                className={`flex flex-col items-stretch gap-0 overflow-hidden bg-white shadow-md ring-1 ring-slate-100 md:flex-row ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex flex-col justify-center border-t-4 border-brand-blue p-6 sm:p-8 md:w-1/2 md:border-l-4 md:border-t-0">
                  <span className="flex size-14 items-center justify-center rounded-full bg-brand-blue-light text-2xl text-brand-blue">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-brand-blue-dark">{title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-slate-600">{text}</p>
                </div>

                <div className="h-64 md:h-auto md:w-1/2">
                  <img src={img} alt={alt} loading="lazy" className="size-full object-cover" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Symptom & Risk Assessment Tool */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Interactive Health" highlight="Self-Check" />
          <div className="mt-10">
            <SymptomChecker />
          </div>
        </div>
      </section>

      {/* Precautions & Lifestyle Guidance Section */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Precautions & Lifestyle" highlight="Management" />
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-600">
            Proactive care and proper daily precautions are vital to keeping chronic conditions like diabetes under control and preventing long-term complications.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {precautions.map(({ Icon, title, text }) => (
              <div 
                key={title} 
                className="flex flex-col rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-100 transition hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-brand-red/10 text-xl text-brand-red">
                  <Icon />
                </div>
                <h3 className="mt-4 text-xl font-bold text-brand-blue-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default InternalMedicine