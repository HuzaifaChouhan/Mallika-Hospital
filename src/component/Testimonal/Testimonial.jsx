import { useEffect, useState } from 'react'
import { FaPlay, FaQuoteLeft, FaXmark, FaRegCommentDots } from 'react-icons/fa6'

/* ---------------------------------------------------------------
   PLACEHOLDER DATA. Use real patient reviews only, with each
   patient's permission. Delete the samples once you add real ones.
   - testimonial_type: 'video' or 'text'
   - video_url: a YouTube link (watch?v=..., youtu.be/... or /embed/...)
   - image_file (optional): a photo shown on top of a text review
---------------------------------------------------------------- */
const testimonials = [
  { id: 1, testimonial_type: 'text', patient_name: 'Patient Name', department: 'Cardiology', review_text: 'Replace this with a real review from a patient who has agreed to share it.' },
  { id: 2, testimonial_type: 'video', patient_name: 'Patient Name', department: 'Nephrology', review_text: 'Replace this with a short line from the patient’s video review.', video_url: '' },
  { id: 3, testimonial_type: 'text', patient_name: 'Patient Name', department: 'General Surgery', review_text: 'Replace this with a real review from a patient who has agreed to share it. A longer review makes the card taller, and the cards sit in a staggered layout so different lengths look natural.' },
  { id: 4, testimonial_type: 'text', patient_name: 'Patient Name', department: 'Orthopedic', review_text: 'Replace this with a real review from a patient who has agreed to share it.' },
  { id: 5, testimonial_type: 'video', patient_name: 'Patient Name', department: 'Neurology', review_text: 'Replace this with a short line from the patient’s video review.', video_url: '' },
  { id: 6, testimonial_type: 'text', patient_name: 'Patient Name', department: 'Obstetrics & Gynecology', review_text: 'Replace this with a real review from a patient who has agreed to share it. A longer review makes the card taller.' },
]

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

const Testimonial = () => {
  const [activeVideo, setActiveVideo] = useState(null)

  // Close the video with the Escape key
  useEffect(() => {
    if (!activeVideo) return
    const onKey = (e) => e.key === 'Escape' && setActiveVideo(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeVideo])

  return (
    <div className="w-full bg-slate-50">
      {/* Banner */}
      <section className="bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Voices of Recovery <span className="text-brand-green">&amp; Hope</span>
          </h1>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Real stories of healing and resilience from the families who trusted Mallika Hospital with their
            healthcare journeys.
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {testimonials.length === 0 ? (
            <div className="mx-auto max-w-xl bg-white p-8 text-center shadow-md ring-1 ring-slate-100">
              <FaRegCommentDots className="mx-auto text-6xl text-slate-300" />
              <h3 className="mt-4 text-xl font-bold text-brand-blue-dark">No stories yet</h3>
              <p className="mt-2 text-slate-600">Check back soon to read updates from our patient community.</p>
            </div>
          ) : (
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {testimonials.map((item) => {
                const videoId = getVideoId(item.video_url || item.media_url)
                const isVideo = item.testimonial_type === 'video'

                return (
                  <li
                    key={item.id}
                    className="group mb-6 flex break-inside-avoid flex-col overflow-hidden bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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

                    {/* Optional photo on a text review */}
                    {!isVideo && item.image_file && (
                      <div className="max-h-64 w-full overflow-hidden">
                        <img
                          src={item.image_file}
                          alt={item.patient_name}
                          loading="lazy"
                          className="size-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Review */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <FaQuoteLeft className="text-3xl text-brand-blue/20" />
                        <p className="mt-3 text-[15px] italic leading-relaxed text-slate-600">
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
          )}
        </div>
      </section>

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
    </div>
  )
}

export default Testimonial