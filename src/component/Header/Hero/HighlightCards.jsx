import { FaHandHoldingHeart, FaHeartPulse, FaShieldHalved, FaAward } from 'react-icons/fa6'

// Sample text from the reference design: replace with Mallika's real wording
const highlights = [
  {
    Icon: FaHandHoldingHeart,
    title: 'Patient First',
    text: 'Your health and well-being are at the heart of everything we do.',
  },
  {
    Icon: FaHeartPulse,
    title: 'Advanced Care',
    text: 'Cutting-edge technology for accurate diagnosis and effective treatment.',
  },
  {
    Icon: FaShieldHalved,
    title: 'Expert Team',
    text: 'Highly skilled doctors and healthcare professionals.',
  },
  {
    Icon: FaAward,
    title: 'Trusted Care',
    text: 'Committed to providing ethical, transparent and quality healthcare.',
  },
]

export default function HighlightCards() {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:-mt-16 lg:px-8">
      <div className="mx-auto max-w-7xl bg-white p-4 shadow-xl ring-1 ring-slate-100 sm:p-6 lg:p-8">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4 lg:gap-0">
          {highlights.map(({ Icon, title, text }) => (
            <li
              key={title}
              className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-start lg:gap-4 lg:px-6 lg:text-left lg:first:pl-0 lg:last:pr-0 lg:[&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-slate-200"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue lg:size-12 lg:text-xl">
                <Icon />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-brand-blue-dark sm:text-base">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}