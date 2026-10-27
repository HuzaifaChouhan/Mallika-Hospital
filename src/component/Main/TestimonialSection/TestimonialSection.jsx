import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlay, FaQuoteLeft, FaXmark, FaArrowRight } from 'react-icons/fa6'

/* ---------------------------------------------------------------
   PLACEHOLDER DATA. Use real patient reviews only, with each
   patient's permission. Field names match your Testimonial page,
   so real data drops straight in.
   - testimonial_type: 'video' or 'text'
   - video_url: a YouTube link (watch?v=..., youtu.be/... or /embed/...)
---------------------------------------------------------------- */
const sampleTestimonials = [
  {
    id: 1,
    testimonial_type: 'text',
    patient_name: 'Patient Name',
    department: 'Cardiology',
    review_text: 'Replace this with a real review from a patient who has agreed to share it.',
  },
  {
    id: 2,
    testimonial_type: 'video',
    patient_name: 'Patient Name',
    department: 'Nephrology',
    review_text: 'Replace this with a short line from the patient’s video review.',
    video_url: '',
  },
  {
    id: 3,
    testimonial_type: 'text',
    patient_name: 'Patient Name',
    department: 'General Surgery',
    review_text: 'Replace this with a real review from a patient who has agreed to share it.',
  },
]

const SHOWN = 3

// Pulls the YouTube video id out of the common link formats
const getVideoId = (url = '') => {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)
  return match ? match[1] : null
}

const initials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export default function TestimonialSection() {
  const items = sampleTestimonials.slice(0, SHOWN)
  const [activeVideo, setActiveVideo] = useState(null)

  // Close the video with the Escape key
  useEffect(() => {
    if (!activeVideo) return
    const onKey = (e) => e.key === 'Escape' && setActiveVideo(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeVideo])

  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl lg:text-6xl">
            Patient <span className="text-brand-red">Stories</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 sm:text-lg">
            Real stories of healing and hope from the families who trusted Mallika Hospital.
          </p>
        </div>

        {/* Cards: swipeable row until desktop, then 3 columns */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const videoId = getVideoId(item.video_url || item.media_url)
            const isVideo = item.testimonial_type === 'video'

            return (
              <li
                key={item.id}
                className="group flex min-w-[82%] snap-center flex-col overflow-hidden bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:min-w-[46%] lg:min-w-0"
              >
                {/* Video thumbnail */}
                {isVideo && (
                  <button
                    type="button"
                    disabled={!videoId}
                    onClick={() => setActiveVideo(`https://www.youtube.com/embed/${videoId}?autoplay=1`)}
                    aria-label={`Play video review by ${item.patient_name}`}
                    className="relative block aspect-video w-full overflow-hidden bg-linear-to-br from-brand-blue-dark to-brand-blue disabled:cursor-default"
                  >
                    {videoId && (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 size-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="relative flex size-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition group-hover:scale-110 group-hover:bg-brand-red">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-blue opacity-40" />
                        <FaPlay className="relative ml-1 text-lg" />
                      </span>
                    </span>

                    <span className="absolute left-3 top-3 bg-brand-red px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Video Review
                    </span>
                  </button>
                )}

                {/* Review */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <FaQuoteLeft className="text-3xl text-brand-blue/20" />
                    <p className="mt-3 line-clamp-5 text-[15px] italic leading-relaxed text-slate-600">
                      “{item.review_text}”
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-sm font-bold text-brand-blue">
                      {initials(item.patient_name)}
                    </span>
                    <div>
                      <p className="font-bold text-brand-blue-dark">{item.patient_name}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">
                        {item.department} Patient
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            to="/testimonial"
            className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
          >
            Read All Stories
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Video lightbox */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Patient video review"
          className="fixed inset-0 z-[999] flex cursor-pointer items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 sm:right-6 sm:top-6"
          >
            <FaXmark size={22} />
          </button>

          <div
            className="aspect-video w-full max-w-4xl cursor-default bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo}
              title="Patient testimonial video"
              className="size-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}