import { Link } from 'react-router-dom'
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaClock,
  FaTruckMedical,
  FaHospital,
  FaRegCalendarCheck,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa6'

import AppointmentForm from '../AppoinmentFrom/appointmentform'

// Same number the appointment form sends its WhatsApp message to
const WHATSAPP_NUMBER = '919082097421'

const contactInfo = [
  {
    Icon: FaPhone,
    title: 'Phone',
    lines: [
      { text: '+91 9082097421', href: 'tel:+919082097421' },
      { text: '022 26798585', href: 'tel:+912226798585' },
    ],
  },
  {
    Icon: FaEnvelope,
    title: 'Email',
    lines: [
      { text: 'info@mallikahospital.com', href: 'mailto:info@mallikahospital.com' },
      { text: 'hospital.m@gmail.com', href: 'mailto:hospital.m@gmail.com' },
    ],
  },
  {
    Icon: FaLocationDot,
    title: 'Address',
    lines: [
      { text: 'Mallika Super-Speciality Hospital' },
      { text: 'Sharma Estate, Next To Dewan Shopping Centre, S.V Road, Jogeshwari West, Mumbai, Maharashtra 400102' },
    ],
  },
  {
    Icon: FaClock,
    title: 'Working Hours',
    lines: [{ text: 'Monday-Sunday: Open 24 Hours' }],
  },
]

const socials = [
  { name: 'Facebook', Icon: FaFacebookF, href: 'https://www.facebook.com/people/Mallika-Multi-Specialty-Hospital/' },
  { name: 'Instagram', Icon: FaInstagram, href: 'https://www.instagram.com/mallika_hospital' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/mallika-hospital-27b547115/' },
  { name: 'WhatsApp', Icon: FaWhatsapp, href: `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}` },
]

function SectionHeading({ before, highlight, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl lg:text-5xl">
        {before} <span className="text-brand-red">{highlight}</span>
      </h2>
      <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
      {subtitle && <p className="mx-auto mt-5 max-w-2xl text-slate-600 sm:text-lg">{subtitle}</p>}
    </div>
  )
}

const ContactUs = () => {
  return (
    <div className="w-full bg-slate-50">
      {/* Banner */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Contact <span className="text-brand-green">Us</span>
          </h1>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            We're here to help you. Get in touch with us for any medical emergencies, appointments, or general
            inquiries.
          </p>
        </div>
      </section>

      {/* Appointment form + contact details */}
      <section id="appointment" className="scroll-mt-28 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            before="Book an"
            highlight="Appointment"
            subtitle="Share a few details and we will confirm your visit."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <AppointmentForm />
            </div>

            {/* Contact details */}
            <ul className="space-y-4 lg:col-span-2">
              {contactInfo.map(({ Icon, title, lines }) => (
                <li
                  key={title}
                  className="flex gap-4 border-l-4 border-brand-blue bg-white p-5 shadow-md ring-1 ring-slate-100"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-xl text-brand-blue">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-blue-dark">{title}</h3>
                    {lines.map(({ text, href }) =>
                      href ? (
                        <a
                          key={text}
                          href={href}
                          className="mt-1 block break-words text-sm text-slate-600 transition hover:text-brand-blue"
                        >
                          {text}
                        </a>
                      ) : (
                        <p key={text} className="mt-1 text-sm text-slate-600">
                          {text}
                        </p>
                      ),
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            before="Find"
            highlight="Us"
            subtitle="Sharma Estate, Next To Dewan Shopping Centre, S.V Road, Jogeshwari West, Mumbai, Maharashtra"
          />

          <div className="mt-10 overflow-hidden shadow-md ring-1 ring-slate-100">
            <div className="h-80 sm:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.320524644082!2d72.84413697430728!3d19.137441982079817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b630ffffffff%3A0x4b4cd4ae6926881f!2sMallika%20Hospital!5e0!3m2!1sen!2sin!4v1768215718664!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                title="Mallika Hospital location"
              />
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-5">
              <FaLocationDot className="mt-1 shrink-0 text-brand-red" />
              <div>
                <p className="font-semibold text-brand-blue-dark">Mallika Super-Speciality Hospital</p>
                <p className="text-slate-600">Sharma Estate, Next To Dewan Shopping Centre, S.V Road</p>
                <p className="text-slate-600">Jogeshwari West, Mumbai, Maharashtra - 400102</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Quick" highlight="Links" />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <a
              href="#appointment"
              className="group border-t-4 border-brand-blue bg-white p-6 text-center shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <FaRegCalendarCheck className="mx-auto text-4xl text-brand-blue" />
              <h3 className="mt-4 font-bold text-brand-blue-dark">Book Appointment</h3>
              <p className="mt-2 text-sm text-slate-600">Schedule your visit online</p>
            </a>

            <a
              href="tel:+919082097421"
              className="group border-t-4 border-brand-red bg-white p-6 text-center shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <FaTruckMedical className="mx-auto text-4xl text-brand-red" />
              <h3 className="mt-4 font-bold text-brand-blue-dark">Emergency Services</h3>
              <p className="mt-2 text-sm text-slate-600">24/7 emergency care. Tap to call</p>
            </a>

            <Link
              to="/cashless-&-tpa"
              className="group border-t-4 border-brand-green bg-white p-6 text-center shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <FaHospital className="mx-auto text-4xl text-brand-green" />
              <h3 className="mt-4 font-bold text-brand-blue-dark">Insurance &amp; Billing</h3>
              <p className="mt-2 text-sm text-slate-600">Check your coverage options</p>
            </Link>
          </div>

          {/* Social */}
          <div className="mt-14 text-center">
            <h3 className="text-lg font-bold text-brand-blue-dark">Follow Us</h3>
            <ul className="mt-4 flex justify-center gap-4">
              {socials.map(({ name, Icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex size-11 items-center justify-center rounded-full bg-brand-blue text-lg text-white shadow-md transition hover:-translate-y-1 hover:bg-brand-red"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactUs