import {
  FaRegClock,
  FaPhone,
  FaLocationDot,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa6'

// Edit these with the real details
const info = {
  hours: 'Mon - Sat: 8:00 AM - 8:00 PM',
  phone: '+91 00000 00000',
  location: 'Jogeshwari West, Mumbai',
}

const socials = [
  { name: 'Facebook', Icon: FaFacebookF, href: '#' },
  { name: 'Instagram', Icon: FaInstagram, href: '#' },
  { name: 'YouTube', Icon: FaYoutube, href: '#' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, href: '#' },
]

export default function TopBar() {
  return (
    <div className="bg-brand-blue-dark text-xs text-white sm:text-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-1 px-4 py-2 sm:flex-row sm:justify-between sm:gap-6 sm:py-2.5">
        <p className="flex items-center gap-2">
          <FaRegClock className="text-white/80" />
          {info.hours}
        </p>

        <a
          href={`tel:${info.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-2 font-medium hover:underline"
        >
          <FaPhone className="text-white/80" />
          Emergency: {info.phone}
        </a>

        <p className="hidden items-center gap-2 lg:flex">
          <FaLocationDot className="text-white/80" />
          {info.location}
        </p>

        <ul className="hidden items-center gap-4 sm:flex">
          {socials.map(({ name, Icon, href }) => (
            <li key={name}>
              <a
                href={href}
                aria-label={name}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white/70"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}