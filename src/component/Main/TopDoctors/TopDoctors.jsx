import { Link } from 'react-router-dom'
import { FaRegCalendarCheck, FaArrowRight, FaBriefcaseMedical } from 'react-icons/fa6'

/* ---------------------------------------------------------------
   PLACEHOLDER DATA: replace every field with the real doctors.
   - photo: import the image and put it here, or leave null to show initials
   - keep it to 4 to 8 doctors; the list scrolls sideways on mobile
---------------------------------------------------------------- */
// import drOne from '../../assets/Doctors/dr-one.jpg'

const doctors = [
  { name: 'Dr. Name Surname', specialty: 'Cardiology', qualification: 'MBBS, MD, DM', experience: '15+ years', photo: null },
  { name: 'Dr. Name Surname', specialty: 'Nephrology', qualification: 'MBBS, MD, DM', experience: '12+ years', photo: null },
  { name: 'Dr. Name Surname', specialty: 'General Surgery', qualification: 'MBBS, MS', experience: '18+ years', photo: null },
  { name: 'Dr. Name Surname', specialty: 'Obstetrics & Gynecology', qualification: 'MBBS, MD, DGO', experience: '10+ years', photo: null },
]

const initials = (name) =>
  name
    .replace(/^Dr\.?\s*/i, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function TopDoctors() {
  return (
    <section className="w-full bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl lg:text-6xl">
            Meet Our <span className="text-brand-red">Top Doctors</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 sm:text-lg">
            Experienced specialists dedicated to giving you and your family
            compassionate, expert care.
          </p>
        </div>

        {/* Cards: swipeable row on mobile, grid from sm up */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {doctors.map((doc, i) => (
            <li
              key={i}
              className="group min-w-[78%] snap-center overflow-hidden bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:min-w-0"
            >
              {/* Photo */}
              <div className="relative aspect-[4/4.5] overflow-hidden bg-linear-to-br from-brand-blue-light to-white">
                {doc.photo ? (
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="flex size-28 items-center justify-center rounded-full bg-brand-blue text-4xl font-bold text-white shadow-lg ring-8 ring-white/70">
                      {initials(doc.name)}
                    </span>
                  </div>
                )}

                {/* Specialty chip */}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-blue shadow-sm backdrop-blur">
                  {doc.specialty}
                </span>
              </div>

              {/* Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-brand-blue-dark">{doc.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{doc.qualification}</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-brand-red">
                  <FaBriefcaseMedical />
                  {doc.experience} experience
                </p>

                <Link
                  to="/contact"
                  className="mt-5 flex items-center justify-center gap-2 border-2 border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                >
                  <FaRegCalendarCheck />
                  Book Appointment
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            to="/find-doctor"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
          >
            View All Doctors
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}