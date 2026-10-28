import { FaBullseye, FaHandHoldingHeart, FaCircleCheck } from "react-icons/fa6";
import Chooseus from "../Main/ChooseUs/ChooseUs";

// Replace these placeholders with real photos of Mallika
import img1 from "../../assets/img.png";
import img2 from "../../assets/img.png";
import img3 from "../../assets/img.png";

const values = [
  "Patient-centered care",
  "Medical excellence",
  "Ethical practices",
  "Continuous innovation",
  "Community health",
];

function SectionHeading({ before, highlight }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl">
        {before} <span className="text-brand-red">{highlight}</span>
      </h2>
      <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
    </div>
  );
}

const AboutUs = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero banner */}
      <section className="relative isolate flex h-80 items-center justify-center overflow-hidden sm:h-96">
        <img
          src={img1}
          alt="Mallika Super-Speciality Hospital"
          className="absolute inset-0 -z-20 size-full object-cover"
        />

        {/* Soft blue tint */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">
            Mallika Super-Speciality Hospital
          </h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium drop-shadow-md sm:text-xl">
            Excellence in Healthcare with Compassion
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Who We" highlight="Are" />

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                Welcome to{" "}
                <strong className="text-brand-blue-dark">
                  Mallika Super-Speciality Hospital
                </strong>
                , where clinical expertise meets compassionate care.
                Strategically located in Jogeshwari West, Mumbai, our 100-bed
                facility has spent the last 25 years delivering premier,
                budget-friendly medical treatments across multiple specialities.
                We pride ourselves on maintaining a pristine, hygienic
                environment and a comforting atmosphere that minimizes the
                stress of hospital visits, allowing our patients to focus
                entirely on their recovery.
              </p>
              <p className="text-lg leading-relaxed text-slate-700">
                Our reputation is anchored by our team of highly accomplished
                specialists and surgeons who bring decades of rich knowledge to
                every treatment plan. Guided by uncompromised ethical standards
                and a patient-first philosophy, we continuously upgrade our
                technology from advanced Cath Labs to robust intensive care to
                deliver predictable, precise medical outcomes. At Mallika
                Hospital, your health is our legacy, and your well-being remains
                our singular priority.
              </p>
            </div>

            {/* Photo with offset block behind it */}
            <div className="relative mx-3 sm:mx-0">
              <div className="absolute -bottom-3 -left-3 size-full bg-brand-green/30 sm:-bottom-4 sm:-left-4" />
              <img
                src={img2}
                alt="Hospital interior"
                loading="lazy"
                className="relative aspect-[4/3] w-full object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Research & Technology */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Latest Research &" highlight="Technology" />

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            {/* Photo with offset block behind it */}
            <div className="relative mx-3 order-2 sm:mx-0 lg:order-1">
              <div className="absolute -bottom-3 -right-3 size-full bg-brand-blue/20 sm:-bottom-4 sm:-right-4" />
              <img
                src={img3}
                alt="Medical technology"
                loading="lazy"
                className="relative aspect-[4/3] w-full object-cover shadow-xl"
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                At{" "}
                <strong className="text-brand-blue-dark">
                  Mallika Super-Speciality Hospital
                </strong>
                , we back up our medical care with up-to-date diagnostic tools
                and modern medical equipment right here in Jogeshwari West,
                Mumbai. We believe that combining affordable healthcare with the
                right technology is the best way to help our patients heal
                safely and comfortably.
              </p>
              <p className="mb-6 text-lg leading-relaxed text-slate-700">
                Our specialists use advanced diagnostic tools to catch health
                issues early and plan highly accurate treatments. This ensures
                you get clear answers and care from doctors you can trust.
              </p>
              <p className="text-lg leading-relaxed text-slate-700">
                By constantly upgrading our labs, imaging systems, and operation
                theatres, we ensure your family always has access to the safest,
                most advanced treatment available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us: same section as the home page */}
      <Chooseus />

      {/* Mission & Values */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Mission &" highlight="Values" />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="border-t-4 border-brand-blue bg-white p-6 shadow-md ring-1 ring-slate-100 sm:p-8">
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-blue-light text-2xl text-brand-blue">
                <FaBullseye />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-brand-blue-dark">
                Our Mission
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-slate-700">
                To provide exceptional healthcare services that prioritize
                patient well-being, comfort, and recovery through advanced
                medical technology and compassionate care.
              </p>
            </div>

            <div className="border-t-4 border-brand-red bg-white p-6 shadow-md ring-1 ring-slate-100 sm:p-8">
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-blue-light text-2xl text-brand-red">
                <FaHandHoldingHeart />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-brand-blue-dark">
                Our Values
              </h3>
              <ul className="mt-3 space-y-3">
                {values.map((v) => (
                  <li
                    key={v}
                    className="flex items-center gap-3 text-lg text-slate-700"
                  >
                    <FaCircleCheck className="shrink-0 text-brand-green" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
