import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaMinus, FaPhone } from 'react-icons/fa6'

/* SAMPLE ANSWERS: verify every detail (timings, insurers, portal, policies) with Mallika before launch */
const faqs = [
  {
    question: 'What are the OPD timings?',
    answer:
      'Our OPD is open from 8:00 AM to 9:00 PM, Monday to Saturday. Sunday OPD is available for emergency cases only.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'You can book through the Book Appointment button on this website, by calling our reception, or by visiting the hospital in person. Please share the doctor or speciality you wish to consult so we can suggest the earliest slot.',
  },
  {
    question: 'Is emergency service available 24/7?',
    answer:
      'Yes, our Casualty and Emergency department works 24x7 with a dedicated team of doctors and ambulances.',
  },
  {
    question: 'Which specialities and departments are available?',
    answer:
      'We offer consultations in Physician & Diabetology, Nephrology, Cardiology, Neurology, Oncology, Gastroenterology, Hematology, Dermatology and Pediatrics, along with surgical care including General Surgery, Onco Surgery, Obstetrics & Gynecology, Orthopedic, Neuro Surgery, Urology, ENT, Proctology, Plastic Surgery and Pediatric Surgery.',
  },
  {
    question: 'Can I check a doctor’s availability before I visit?',
    answer:
      'Doctor timings can vary from day to day. Please call our reception or book an appointment online, and we will confirm the doctor’s availability so you do not make a wasted trip.',
  },
  {
    question: 'What should I bring for my first visit?',
    answer:
      'Please bring a valid photo ID, any previous prescriptions, reports and scans related to your condition, a list of the medicines you are currently taking, and your insurance or TPA card if you plan to use one.',
  },
  {
    question: 'Do you accept cashless insurance?',
    answer:
      'Yes, we are empanelled with all major TPA and Insurance companies including Star Health, ICICI Lombard, and HDFC Ergo.',
  },
  {
    question: 'How does cashless admission work?',
    answer:
      'At the time of admission, please show your insurance or TPA card along with a photo ID at our TPA desk. We send a pre-authorisation request to your insurer, and approval timelines depend on the insurer. Our team will keep you informed throughout.',
  },
  {
    question: 'Are government health schemes accepted?',
    answer:
      'We work with certain government health schemes. Please see our Govt. Schemes page or ask our help desk for the list of schemes currently accepted and the documents required.',
  },
  {
    question: 'How do I get an estimate for surgery or treatment?',
    answer:
      'The final cost depends on your diagnosis, the procedure and the room category. After your consultation, our billing and admission team can give you a written estimate. Please ask for it before admission.',
  },
  {
    question: 'How can I get my medical reports?',
    answer:
      'You can collect reports from the reception counter or view them online through our Patient Portal using your UHID number.',
  },
  {
    question: 'Do you have an in-house pharmacy and pathology lab?',
    answer:
      'Yes, our hospital has a pharmacy and a pathology laboratory on the premises, so your medicines and tests can be handled in the same place as your consultation.',
  },
  {
    question: 'Do you offer dialysis?',
    answer:
      'Yes, we have a dedicated Dialysis Center. Slots depend on availability, so please contact our reception or nephrology team to schedule your sessions.',
  },
  {
    question: 'What are the visiting hours for admitted patients?',
    answer:
      'Visiting hours can differ between general wards and the ICU. Please check with the reception or the nursing station for current timings, and follow the staff’s guidance to keep patients safe and comfortable.',
  },
  {
    question: 'How will our family get updates about a patient in the ICU?',
    answer:
      'Our doctors and nursing team update the family at regular times during the day, and they will contact you right away if there is any important change. Please share one primary contact number at admission.',
  },
  {
    question: 'What documents do I receive at discharge?',
    answer:
      'At discharge, you receive a discharge summary with your diagnosis, treatment given, medicines and follow-up advice, along with your final bill and reports. For insurance cases, we also share the required papers with your TPA.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl">
            Frequently Asked <span className="text-brand-red">Questions</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
          <p className="mx-auto mt-5 max-w-xl text-slate-600">
            Quick answers to the things patients ask us most often.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.question}
                className={`overflow-hidden border bg-white transition ${
                  isOpen
                    ? 'border-brand-blue shadow-lg'
                    : 'border-slate-200 shadow-sm hover:border-brand-blue/50'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span
                      className={`font-semibold sm:text-lg ${
                        isOpen ? 'text-brand-blue' : 'text-brand-blue-dark'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm transition ${
                        isOpen
                          ? 'bg-brand-blue text-white'
                          : 'bg-brand-blue-light text-brand-blue'
                      }`}
                    >
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>
                </h3>

                {/* Grid-rows trick: animates to the answer's real height, so long answers never get cut off */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-slate-600 sm:px-6 sm:pb-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 flex flex-col items-center gap-4 bg-brand-blue-light px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-brand-blue-dark">Still have questions?</p>
            <p className="mt-1 text-sm text-slate-600">
              Our team is happy to help you, any time.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
          >
            <FaPhone />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}