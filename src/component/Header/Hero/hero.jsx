import { Link } from "react-router-dom";
import { FaRegCalendarCheck, FaUserDoctor } from "react-icons/fa6";
import heroBg from "../../../assets/img.png"; // keep your own image path here

function Hero() {
  return (
    <section className="relative isolate flex min-h-[34rem] w-full items-center overflow-hidden lg:min-h-[calc(100vh-7.5rem)]">
      {/* Background image */}
      <img
        src={heroBg}
        alt="HeroSection Background"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-right brightness-75 contrast-110"
      />

      {/* Overlay: lighter tint on mobile, left-to-right fade from md up */}
      <div className="absolute inset-0 -z-10 bg-white/40 md:bg-transparent md:bg-linear-to-r md:from-white md:via-white/70 md:to-transparent" />

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-tight text-brand-blue-dark sm:text-5xl lg:text-6xl">
            Compassionate Care.
            <br />
            Better Health.
            <br />
            <span className="text-brand-blue">Stronger Tomorrow.</span>
          </h1>

          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-slate-700 sm:text-lg md:font-normal md:text-slate-600">
            We are committed to providing exceptional healthcare with advanced
            technology and a patient-first approach.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
            >
              <FaRegCalendarCheck />
              Book Appointment
            </Link>

            <Link
              to="/find-doctor"
              className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-blue bg-white/70 px-7 py-3.5 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              <FaUserDoctor />
              Find Doctor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
