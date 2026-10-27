export default function Quote() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-blue-50 via-white to-blue-100 px-4 py-12 sm:px-6 md:py-24">
      {/* Floating circles background */}
      <div className="absolute left-4 top-6 size-28 animate-pulse rounded-full bg-blue-200/30 blur-3xl md:left-10 md:top-10 md:size-40" />
      <div className="absolute bottom-6 right-4 size-40 animate-pulse rounded-full bg-blue-300/20 blur-3xl md:bottom-10 md:right-10 md:size-60" />

      <div className="relative mx-auto max-w-4xl border border-blue-200/50 bg-white/60 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-8 md:p-12">
        <h2 className="mb-4 text-2xl font-bold tracking-wide text-blue-800 sm:text-3xl md:text-4xl">
          Inspiring Healthcare Quote
        </h2>

        <p className="text-base font-medium italic leading-relaxed text-gray-700 sm:text-lg md:text-xl">
          “Where science meets compassion,
          <br className="hidden md:block" /> healing becomes possible.
          <br className="hidden md:block" /> Every step toward wellness matters,
          <br className="hidden md:block" /> and every act of care
          <br className="hidden md:block" /> can change a life.”
        </p>

        {/* Bottom decorative divider */}
        <div className="mt-8 flex justify-center md:mt-10">
          <div className="h-1 w-32 rounded-full bg-linear-to-r from-blue-600 to-teal-400 shadow-lg md:w-40" />
        </div>
      </div>

      {/* Soft overlay glow */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-blue-100/40" />
    </section>
  )
}