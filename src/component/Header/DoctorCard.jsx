import { Link } from 'react-router-dom'
import { FaUserDoctor, FaPhone, FaClock, FaCalendarDays } from 'react-icons/fa6'

// "13:30" or "13:30:00" -> "1:30 PM"
const formatTime = (time) => {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}

const DEFAULT_PHONE = '+91 9082097421 / 022 26798585'

function DetailRow({ Icon, label, children }) {
  return (
    <li className="flex items-start gap-2 sm:gap-3">
      {/* Icon tile on tablet and up */}
      <span className="hidden size-9 shrink-0 items-center justify-center bg-brand-blue-light text-brand-blue sm:flex">
        <Icon />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
          {/* Small inline icon on mobile */}
          <Icon className="text-brand-blue sm:hidden" />
          {label}
        </p>
        <div className="mt-0.5 break-words text-xs font-medium leading-snug text-slate-700 sm:text-sm">
          {children}
        </div>
      </div>
    </li>
  )
}

const DoctorCard = ({ doctor }) => {
  if (!doctor) return null

  // A phone value like "+91 9082097421 / 022 26798585" becomes two tappable numbers
  const phones = (doctor.phone || DEFAULT_PHONE)
    .split('/')
    .map((p) => p.trim())
    .filter(Boolean)

  const timing =
    doctor.start_time && doctor.end_time
      ? `${formatTime(doctor.start_time)} - ${formatTime(doctor.end_time)}`
      : 'By Appointment'

  return (
    <div className="group flex h-full flex-col overflow-hidden bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {/* Photo */}
      <div className="relative h-40 overflow-hidden bg-linear-to-br from-brand-blue-light to-white sm:h-56">
        {doctor.photo_url ? (
          <img
            src={doctor.photo_url}
            alt={doctor.name}
            loading="lazy"
            className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-blue text-2xl text-white shadow-lg ring-4 ring-white/70 sm:size-24 sm:text-4xl sm:ring-8">
              <FaUserDoctor />
            </span>
          </div>
        )}

        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold shadow-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs ${
            doctor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {doctor.active ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3 sm:p-6">
        <h3 className="text-sm font-bold leading-snug text-brand-blue-dark sm:text-xl">{doctor.name}</h3>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-brand-red sm:mt-1.5 sm:text-xs sm:tracking-widest">
          {doctor.department_name || 'Specialist'}
        </p>

        <div className="my-3 h-px bg-slate-200 sm:my-5" />

        <ul className="space-y-3 sm:space-y-4">
          <DetailRow Icon={FaCalendarDays} label="Days">
            {doctor.display_available_days || 'Call for Schedule'}
          </DetailRow>

          <DetailRow Icon={FaClock} label="Timings">
            {timing}
          </DetailRow>

          <DetailRow Icon={FaPhone} label="Contact">
            <div className="flex flex-col gap-0.5">
              {phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^\d+]/g, '')}`}
                  className="transition hover:text-brand-blue"
                >
                  {p}
                </a>
              ))}
            </div>
          </DetailRow>
        </ul>

        <div className="mt-auto pt-4 sm:pt-6">
          <Link
            to="/contact"
            className="block bg-brand-blue px-2 py-2 text-center text-xs font-semibold text-white transition hover:bg-brand-blue-dark sm:px-4 sm:py-3 sm:text-sm"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard