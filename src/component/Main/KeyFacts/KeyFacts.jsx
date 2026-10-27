import {
  FaKitMedical,
  FaHeartPulse,
  FaBedPulse,
  FaBed,
  FaDroplet,
  FaTruckMedical,
  FaFlask,
  FaPills,
} from 'react-icons/fa6'

// Replace with a real photo of Mallika's doctors or team
import teamPhoto from '../../../assets/img.png'

/* ---------------------------------------------------------------
   PLACEHOLDER VALUES: every "XX" must be replaced with Mallika's
   real figure (for example "6", "24x7", "50+"). The labels follow
   the services listed in your navbar. Delete any fact that isn't true.
---------------------------------------------------------------- */
const facts = [
  { Icon: FaKitMedical, value: 'XX', label: 'Operation Theatres' },
  { Icon: FaHeartPulse, value: 'XX', label: 'Cath Lab' },
  { Icon: FaBedPulse, value: 'XX', label: 'ICU Beds' },
  { Icon: FaBed, value: 'XX', label: 'Ward Beds' },
  { Icon: FaDroplet, value: 'XX', label: 'Dialysis Machines' },
  { Icon: FaTruckMedical, value: 'XX', label: 'Emergency Care' },
  { Icon: FaFlask, value: 'XX', label: 'Pathology Lab' },
  { Icon: FaPills, value: 'XX', label: 'Pharmacy' },
]

export default function KeyFacts() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-14 text-white sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        {/* Photo with offset block behind it */}
        <div className="relative mx-3 sm:mx-0">
          <div className="absolute -bottom-3 -left-3 size-full bg-brand-green sm:-bottom-4 sm:-left-4" />
          <img
            src={teamPhoto}
            alt="Mallika Hospital team"
            loading="lazy"
            className="relative aspect-[4/3] w-full object-cover shadow-2xl lg:aspect-square"
          />
        </div>

        {/* Heading + facts */}
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Key <span className="text-brand-green">Facts</span>
          </h2>
          <div className="mt-4 h-1.5 w-24 bg-white/80" />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {facts.map(({ Icon, value, label }) => (
              <li
                key={label}
                className="flex flex-col items-center bg-white/10 px-3 py-6 text-center ring-1 ring-white/20 transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                <Icon className="text-4xl text-white/90" />
                <p className="mt-4 text-2xl font-bold">{value}</p>
                <p className="mt-1 text-sm text-white/80">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}