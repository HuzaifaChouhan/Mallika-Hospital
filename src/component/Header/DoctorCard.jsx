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
    <li className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center bg-brand-blue-light text-brand-blue">
        <Icon />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <div className="mt-0.5 text-sm font-medium leading-snug text-slate-700">{children}</div>
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
      <div className="relative h-56 overflow-hidden bg-linear-to-br from-brand-blue-light to-white">
        {doctor.photo_url ? (
          <img
            src={doctor.photo_url}
            alt={doctor.name}
            loading="lazy"
            className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <span className="flex size-24 items-center justify-center rounded-full bg-brand-blue text-4xl text-white shadow-lg ring-8 ring-white/70">
              <FaUserDoctor />
            </span>
          </div>
        )}

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            doctor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {doctor.active ? 'Available' : 'Unavailable'}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold leading-snug text-brand-blue-dark">{doctor.name}</h3>
        <p className="mt-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
          {doctor.department_name || 'Specialist'}
        </p>

        <div className="my-5 h-px bg-slate-200" />

        <ul className="space-y-4">
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

        <div className="mt-auto pt-6">
          <Link
            to="/contact"
            className="block bg-brand-blue px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-blue-dark"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard