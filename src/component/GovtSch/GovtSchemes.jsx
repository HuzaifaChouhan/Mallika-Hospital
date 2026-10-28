import { useState } from 'react'
import {
  FaCircleCheck,
  FaHospital,
  FaShieldHalved,
  FaHandHoldingMedical,
  FaChevronDown,
  FaLandmark,
} from 'react-icons/fa6'

import img1 from '../../assets/img.png';

const schemes = [
  {
    name: 'PMJAY',
    Icon: FaHandHoldingMedical,
    description:
      'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PMJAY) is a flagship scheme of the Government of India, providing a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization. It offers cashless and paperless access to services for the beneficiary at the point of service.',
  },
  {
    name: 'ESIS',
    Icon: FaShieldHalved,
    description:
      "Employees' State Insurance Scheme (ESIS) provides multidimensional socio-economic protection to workers in the organized sector. It ensures comprehensive medical care for the insured persons and their dependents, protecting them against the financial impact of sickness, maternity, and employment injury.",
  },
  {
    name: 'MJPJAY (Mahatma Jyotiba Phule Scheme)',
    Icon: FaHandHoldingMedical,
    description:
      'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY) is a flagship health insurance scheme by the Government of Maharashtra. It provides cashless hospitalization facilities to the economically weaker sections of society. The scheme covers over 950+ procedures and 1000+ illnesses, with a family floater sum insured of Rs. 1.5 lakh per annum.',
  },
  {
    name: 'CGHS',
    Icon: FaHospital,
    description:
      'Central Government Health Scheme (CGHS) provides comprehensive medical care facilities to Central Government employees and their dependents residing in CGHS covered cities. Started in 1954, CGHS has now grown to become one of the largest health insurance schemes in India, covering over 35 lakh beneficiaries across the country.',
  },
  {
    name: 'FCI',
    Icon: FaCircleCheck,
    description:
      'Food Corporation of India (FCI) provides comprehensive health coverage to its employees and their families through its health insurance scheme. The scheme includes cashless hospitalization facilities at empaneled hospitals across India, with coverage for pre and post-hospitalization expenses, day care procedures, and ambulance charges.',
  },
  {
    name: 'MTNL',
    Icon: FaShieldHalved,
    description:
      'Mahanagar Telephone Nigam Limited (MTNL) offers health insurance coverage to its employees and their dependents. The scheme provides cashless hospitalization facilities at empaneled hospitals, with coverage for various medical procedures and treatments, ensuring quality healthcare access for all MTNL employees.',
  },
  {
    name: 'MCGM',
    Icon: FaHospital,
    description:
      'Municipal Corporation of Greater Mumbai (MCGM) provides health insurance coverage to its employees and their families. The scheme includes comprehensive medical coverage with cashless hospitalization facilities at empaneled hospitals, ensuring timely and quality healthcare access for all MCGM employees across Mumbai.',
  },
  {
    name: 'Mumbai Police',
    Icon: FaCircleCheck,
    description:
      'Mumbai Police Health Insurance Scheme provides comprehensive medical coverage to police personnel and their families. The scheme includes cashless hospitalization facilities at empaneled hospitals across Mumbai, with special provisions for treatment of injuries sustained in the line of duty, ensuring the well-being of those who protect the city.',
  },
  {
    name: 'ESIC',
    Icon: FaCircleCheck,
    description: `The Employees' State Insurance Corporation (ESIC) is a statutory body established under the Employees' State Insurance Act, 1948, operating under the Ministry of Labour and Employment, Government of India.
It administers the Employees' State Insurance (ESI) scheme, a self-financed social security program designed to provide medical care, cash benefits, and financial protection to employees in the organized sector who earn up to ₹21,000 per month (₹25,000 for persons with disabilities).
The scheme covers employees in establishments with 10 or more workers (20 or more in certain sectors), offering benefits such as medical care for the employee and their dependents, sickness benefit (70% of wages for up to 91 days), maternity benefit (full salary for 26 weeks), disablement benefit, dependent’s pension, and funeral expenses.
Contributions are made at a combined rate of 4% of the employee’s wages—3.25% by the employer and 0.75% by the employee—with the scheme managed through a network of regional and sub-regional offices across India.`,
  },
]

const steps = [
  { title: 'Visit Our Hospital', desc: 'Bring your valid government scheme ID and necessary documents' },
  { title: 'Document Verification', desc: 'Our staff will verify your documents and guide you' },
  { title: 'Receive Treatment', desc: 'Get medical care as per your scheme coverage' },
  { title: 'Easy Billing', desc: 'We handle billing and claims as per guidelines' },
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

const GovtSchemes = () => {
  // Several schemes can be open at once
  const [openSchemes, setOpenSchemes] = useState({})
  const toggleScheme = (name) => setOpenSchemes((prev) => ({ ...prev, [name]: !prev[name] }))

  return (
    <div className="w-full bg-white">
      {/* Hero banner */}
      <section className="relative isolate flex h-80 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Government schemes" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 text-3xl backdrop-blur">
            <FaLandmark />
          </span>
          <h1 className="mt-4 text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">Government Schemes</h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mt-5 text-xl font-semibold tracking-wide drop-shadow-md md:text-2xl">EMPANELMENT</p>
          <p className="mx-auto mt-2 max-w-3xl text-base drop-shadow-md sm:text-lg">
            We are empaneled with various Government Schemes for the Patient support.
          </p>
        </div>
      </section>

      {/* Schemes */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Empaneled" highlight="Schemes" />

          <div className="mt-12 grid items-start gap-4 sm:gap-5 lg:grid-cols-2">
            {schemes.map(({ name, Icon, description }) => {
              const isOpen = !!openSchemes[name]
              const panelId = `scheme-${name.replace(/[^a-zA-Z0-9]+/g, '-')}`
              return (
                <div
                  key={name}
                  className={`border-l-4 bg-white shadow-md ring-1 ring-slate-100 transition ${
                    isOpen ? 'border-brand-red shadow-lg' : 'border-brand-blue hover:shadow-lg'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleScheme(name)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                    >
                      <span className="flex items-center gap-3 sm:gap-4">
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-xl text-brand-blue">
                          <Icon />
                        </span>
                        <span className="font-semibold text-brand-blue-dark sm:text-lg">{name}</span>
                      </span>
                      <FaChevronDown
                        className={`shrink-0 text-brand-blue transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  {/* Animates to the real height, so long descriptions are never cut off */}
                  <div
                    id={panelId}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="whitespace-pre-line px-4 pb-5 text-sm leading-relaxed text-slate-600 sm:px-5 sm:text-base">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How to avail */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-14 text-white sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="How to Avail These" highlight="Schemes" light />

          <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {steps.map(({ title, desc }, i) => (
              <li key={title} className="flex flex-col items-center text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-white text-2xl font-bold text-brand-blue-dark shadow-lg">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-bold sm:text-lg">{title}</h3>
                <p className="mt-1 text-sm text-white/80">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}

export default GovtSchemes