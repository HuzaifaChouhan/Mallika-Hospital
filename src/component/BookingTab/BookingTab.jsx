import { Link, useLocation } from 'react-router-dom'
import { FaRegCalendarCheck } from 'react-icons/fa6'

// 'right' or 'left': which edge of the screen the tab sticks to
const SIDE = 'right'

export default function BookingTab() {
  const { pathname } = useLocation()

  // The button links to /contact, so hide it on that page
  if (pathname === '/contact') return null

  return (
    <Link
      to="/contact"
      aria-label="Book Appointment"
      className={`fixed top-1/2 z-40 flex -translate-y-1/2 rotate-180 items-center gap-2 bg-brand-red px-2.5 py-4 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition [writing-mode:vertical-rl] hover:bg-brand-blue-dark sm:px-3.5 sm:py-5 sm:text-sm ${
        SIDE === 'right' ? 'right-0' : 'left-0'
      }`}
    >
      <FaRegCalendarCheck className="rotate-180" />
      Book Appointment
    </Link>
  )
}