import { useState } from 'react'
import {
  FaCreditCard,
  FaHandshake,
  FaShieldHalved,
  FaHospital,
  FaCircleCheck,
  FaFileMedical,
  FaUserDoctor,
  FaChevronDown,
} from 'react-icons/fa6'

// Replace this placeholder with a real photo
import img1 from '../../assets/img.png'

const gipsaCompanies = [
  {
    name: 'THE NEW INDIA ASSURANCE',
    policies: [
      "The New India Assurance Co. Ltd. is India's largest general insurance company, with a legacy of trust and service spanning over a century. Established in 1919, the company operates under the ownership of the Government of India and has built a strong reputation for reliability, financial strength, and customer-centric solutions.",
      'With an extensive network of offices across India and a global presence in several countries, New India Assurance offers a comprehensive range of general insurance products, including health, motor, travel, marine, fire, engineering, and miscellaneous insurance. The company serves individuals, businesses, and large institutions, providing tailored risk protection solutions to meet diverse needs.',
      'Committed to innovation and excellence, New India Assurance continuously enhances its products and services through technology-driven processes and efficient claims management. Guided by strong ethical values and professional integrity, the company remains focused on protecting what matters most to its customers while contributing to the growth and stability of the insurance sector in India and abroad.',
    ],
  },
  {
    name: 'NATIONAL INSURANCE',
    policies: [
      "National Insurance Co. Ltd. is one of India's oldest and most trusted general insurance companies, established in 1906. Operating under the ownership of the Government of India, the company has a long-standing reputation for reliability and customer-focused solutions.",
      'With a wide network of offices across India, National Insurance offers a comprehensive range of insurance products, including health, motor, fire, marine, and personal accident insurance. The company serves individuals, families, and businesses, providing tailored solutions to protect against diverse risks.',
      "Committed to service excellence, National Insurance Co. Ltd. emphasizes efficient claims settlement, technological innovation, and ethical practices. Their goal is to ensure policyholders experience smooth insurance processes while securing financial protection for life's uncertainties.",
    ],
  },
  {
    name: 'UNITED INDIA INSURANCE',
    policies: [
      "United India Insurance Co. Ltd. is one of India's leading public sector general insurance companies, established in 1938. Owned by the Government of India, it has built a strong reputation for reliability, financial stability, and comprehensive insurance solutions.",
      'The company offers a wide range of insurance products, including health, motor, fire, marine, personal accident, and group insurance schemes, catering to individuals, families, and corporate clients across India.',
      'With an extensive network of offices and a focus on customer service, United India Insurance ensures efficient claim settlements, risk management solutions, and technology-driven processes. Their mission is to provide financial protection and peace of mind to their policyholders while contributing to the growth of the insurance sector in India.',
    ],
  },
  {
    name: 'THE ORIENTAL INSURANCE',
    policies: [
      'The Oriental Insurance Company Ltd. (OICL) is a leading public-sector general insurance company in India, fully owned by the Government of India and operating under the Ministry of Finance. Established in 1947 and headquartered in New Delhi, it has grown to become one of the largest non-life insurers in the country, with over 1,500 branches nationwide and a presence in international markets such as Nepal, Kuwait, and Dubai. Over the decades, it has played a key role in providing accessible and reliable insurance services to individuals, businesses, and large industrial projects.',
      'OICL offers a wide range of general insurance products, including motor, health, property, marine, engineering, liability, and rural insurance. Its portfolio spans over 100 products tailored for both personal and corporate needs, from small health policies to large-scale industrial coverage. The company uses advanced IT platforms for policy issuance, renewal, and customer service, ensuring smooth operations and accessibility for its policyholders.',
      'With a mission to provide inclusive and dependable non-life insurance, OICL has maintained steady growth in premiums and market reach since its inception. Its vision is to be the most respected and preferred insurer in India and abroad, focusing on customer service, financial reliability, and innovation in insurance solutions. Over the years, it has remained a critical pillar in India’s insurance sector, supporting both individual policyholders and the nation’s industrial and infrastructural growth.',
    ],
  },
]

const tpaNames = [
  'MEDI ASSIST',
  'HEALTH INSURANCE',
  'HEALTH INDIA',
  'SAFE WAY',
  'PARAMOUNT',
  'HERITAGE',
  'VIDAL HEALTH',
  'ERICSON',
  'MD INDIA',
  'UNITED HEALTHCARE PAREKH',
  'PARK MEDICAIM',
  'FAMILY HEALTH PLAN (FHPL)',
  'GENIUS TPA',
  'MED SAVE',
]

const pvtInsuranceCompanies = [
  'BAJAJ ALLIANZ',
  'HDFC ERGO',
  'RELIANCE GENERAL INSURANCE',
  'ADITYA BIRLA',
  'FUTURE GENERAL INSURANCE',
  'ROYAL SUNDRAM',
  'LIBERTY GENERAL INSURANCE',
  'GO DIGIT GENERAL INSURANCE',
  'TATA AIG GENERAL INSURANCE',
  'SBI GENERAL',
]

const tpaThroughOthers = [
  'ICICI LOMBARD',
  'STAR HEALTH',
  'CARE INSURANCE',
  'UNIVERSAL SOMPO GEN INSURANCE',
  'EAST WEST ASSIST TPA',
  'VIDEOCON LIBERTY GENERAL INSURANCE',
  'GOOD HEALTH TPA',
]

const claimSteps = [
  { Icon: FaFileMedical, title: 'Pre-Authorization', desc: 'Submit insurance card and ID proof' },
  { Icon: FaUserDoctor, title: 'Treatment', desc: 'Receive medical care' },
  { Icon: FaHandshake, title: 'Claim Processing', desc: 'We coordinate with TPA' },
  { Icon: FaCircleCheck, title: 'Cashless Discharge', desc: 'Hassle-free settlement' },
]

function SectionHeading({ before, highlight, subtitle, light = false }) {
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
      {subtitle && (
        <p className={`mx-auto mt-5 max-w-2xl sm:text-lg ${light ? 'text-white/85' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

const CashlessTpa = () => {
  // Company name is the identifier, so only one accordion item is open at a time
  const [openCompany, setOpenCompany] = useState(null)
  const toggleCompany = (name) => setOpenCompany(openCompany === name ? null : name)

  return (
    <div className="w-full bg-white">
      {/* Hero banner */}
      <section className="relative isolate flex h-80 items-center justify-center overflow-hidden sm:h-96">
        <img src={img1} alt="Cashless and TPA services" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 text-3xl backdrop-blur">
            <FaCreditCard />
          </span>
          <h1 className="mt-4 text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">
            Cashless &amp; TPA Services
          </h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mt-5 text-xl font-semibold drop-shadow-md md:text-2xl">Hassle-Free Insurance Claims</p>
          <p className="mx-auto mt-2 max-w-3xl text-base drop-shadow-md sm:text-lg">
            We provide seamless cashless hospitalization services through empaneled insurance companies and TPAs
          </p>
        </div>
      </section>

      {/* TPA & Cashless intro */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="TPA &" highlight="Cashless" />
          <p className="mt-8 text-center text-lg leading-relaxed text-slate-700">
            The cashless and TPA facilities for{' '}
            <strong className="text-brand-blue-dark">Mallika Super-Speciality Hospital</strong> offer a convenient and
            hassle-free experience. The TPA handles administrative tasks such as verifying coverage, processing claims,
            and managing communication between healthcare providers and insurance companies.
          </p>
        </div>
      </section>

      {/* GIPSA */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            before="GI"
            highlight="PSA"
            subtitle="General Insurance (Public Sector Association)"
          />

          <div className="mt-10 space-y-4">
            {gipsaCompanies.map((company) => {
              const isOpen = openCompany === company.name
              const panelId = `gipsa-${company.name.replace(/\s+/g, '-')}`
              return (
                <div
                  key={company.name}
                  className={`border-l-4 bg-white shadow-md ring-1 ring-slate-100 transition ${
                    isOpen ? 'border-brand-red shadow-lg' : 'border-brand-blue hover:shadow-lg'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleCompany(company.name)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <span className="flex items-center gap-3">
                        <FaCircleCheck className="shrink-0 text-brand-green" />
                        <span className="font-semibold text-brand-blue-dark sm:text-lg">{company.name}</span>
                      </span>
                      <FaChevronDown
                        className={`shrink-0 text-brand-blue transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-base">
                        {company.policies.map((policy, i) => (
                          <p key={i}>{policy}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Name of TPA */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            before="Name of"
            highlight="TPA"
            subtitle="Third Party Administrators (TPAs) we work with"
          />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {tpaNames.map((tpa, index) => (
              <li
                key={tpa}
                className="flex items-center gap-2.5 border-t-4 border-brand-blue bg-white p-3 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-3 sm:p-4"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white sm:size-9">
                  {index + 1}
                </span>
                <span className="text-sm font-medium leading-snug text-brand-blue-dark sm:text-base">{tpa}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Private Insurance Companies */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Private Insurance" highlight="Companies" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {pvtInsuranceCompanies.map((company) => (
              <li
                key={company}
                className="flex items-center gap-3 bg-white p-3 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center bg-brand-blue-light text-lg text-brand-blue sm:size-12 sm:text-xl">
                  <FaShieldHalved />
                </span>
                <span className="text-sm font-medium leading-snug text-brand-blue-dark sm:text-base">{company}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TPA Through Other */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="TPA Through" highlight="Other" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {tpaThroughOthers.map((tpa, index) => (
              <li
                key={tpa}
                className="flex items-center gap-3 border-t-4 border-brand-green bg-white p-3 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-green font-bold text-white sm:size-10">
                  {index + 1}
                </span>
                <span className="text-sm font-medium leading-snug text-brand-blue-dark sm:text-base">{tpa}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cashless Claim Process */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-14 text-white sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Cashless Claim" highlight="Process" light />

          <ol className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {claimSteps.map(({ Icon, title, desc }, i) => (
              <li key={title} className="flex flex-col items-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-2xl ring-1 ring-white/30">
                  <Icon />
                </span>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-green">Step {i + 1}</span>
                <h3 className="mt-1 font-bold sm:text-lg">{title}</h3>
                <p className="mt-1 text-sm text-white/80">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}

export default CashlessTpa