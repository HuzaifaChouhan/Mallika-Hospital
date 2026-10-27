import { useEffect, useRef, useState } from "react";
import {
  FaTrophy,
  FaAward,
  FaMedal,
  FaCertificate,
  FaUsers,
  FaHeartPulse,
  FaUserDoctor,
  FaCalendarDays,
  FaClock,
} from "react-icons/fa6";

/* ---------------------------------------------------------------
   IMPORTANT: everything below is SAMPLE DATA from the old file.
   Replace every number, award, year and accreditation with Mallika
   Hospital's real facts before this goes live.
---------------------------------------------------------------- */
const stats = [
  { Icon: FaUsers, target: 50000, label: "Patients Treated" },
  { Icon: FaHeartPulse, target: 10000, label: "Successful Surgeries" },
  { Icon: FaUserDoctor, target: 150, label: "Expert Doctors" },
  { Icon: FaCalendarDays, target: 25, label: "Years of Service" },
];

const awards = [
  {
    id: 1,
    Icon: FaTrophy,
    title: "National Healthcare Excellence Award",
    year: "2023",
    organization: "Healthcare Ministry of India",
    description:
      "Recognized for outstanding contribution to healthcare in the Maharashtra region.",
  },
  {
    id: 2,
    Icon: FaAward,
    title: "Best Cardiology Department",
    year: "2022",
    organization: "Indian Medical Association",
    description:
      "Awarded for excellence in cardiac care and innovative treatment methods.",
  },
  {
    id: 3,
    Icon: FaMedal,
    title: "Quality Healthcare Provider",
    year: "2021",
    organization: "National Accreditation Board",
    description:
      "Certified for maintaining the highest standards in patient care and safety.",
  },
  {
    id: 4,
    Icon: FaCertificate,
    title: "Digital Healthcare Initiative",
    year: "2020",
    organization: "Digital India Foundation",
    description:
      "For pioneering digital health records and telemedicine services.",
  },
];

const milestones = [
  {
    id: 1,
    year: "1998",
    title: "Hospital Establishment",
    description:
      "Mallika Super-Speciality Hospital was established with 50 beds and 10 doctors.",
  },
  {
    id: 2,
    year: "2005",
    title: "First Major Expansion",
    description:
      "Expanded to 150 beds with advanced ICU and surgical facilities.",
  },
  {
    id: 3,
    year: "2012",
    title: "NABH Accreditation",
    description:
      "Achieved NABH accreditation for quality and patient safety standards.",
  },
  {
    id: 4,
    year: "2018",
    title: "Research Center Launch",
    description:
      "Inaugurated a dedicated research center for medical innovation.",
  },
  {
    id: 5,
    year: "2023",
    title: "25 Years of Excellence",
    description:
      "Celebrated the silver jubilee with over 50,000 successful treatments.",
  },
];

const certifications = [
  {
    id: 1,
    name: "NABH",
    description: "National Accreditation Board for Hospitals",
    validUntil: "2025",
  },
  {
    id: 2,
    name: "ISO 9001:2015",
    description: "Quality Management Systems",
    validUntil: "2024",
  },
  {
    id: 3,
    name: "NABL",
    description:
      "National Accreditation Board for Testing and Calibration Laboratories",
    validUntil: "2025",
  },
  {
    id: 4,
    name: "Green OT",
    description: "Green Operating Theater Certification",
    validUntil: "2024",
  },
];

const tabs = [
  { id: "awards", label: "Awards & Recognition" },
  { id: "milestones", label: "Milestones" },
  { id: "certifications", label: "Certifications" },
];

/* Smooth count-up that starts when `start` becomes true */
function useCountUp(target, start, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    const t0 = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}

function StatItem({ Icon, target, label, start }) {
  const value = useCountUp(target, start);
  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-white/15 text-xl sm:size-14 sm:text-2xl">
        <Icon />
      </span>
      <p className="mt-3 text-3xl font-bold sm:text-4xl">
        {value.toLocaleString()}+
      </p>
      <p className="mt-1 text-sm text-white/80">{label}</p>
    </div>
  );
}

export default function Achievements() {
  const [activeTab, setActiveTab] = useState("awards");
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl lg:text-6xl">
            Our <span className="text-brand-red">Achievements</span>
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />

          <p className="mt-5 text-xl font-semibold text-brand-blue sm:text-2xl">
            Recognition That Reflects Our Care
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Awards, milestones and accreditations that show our commitment to
            patient care and medical excellence.
          </p>
        </div>
        {/* Stats band */}
        <div
          ref={statsRef}
          className="mt-10 bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-8 text-white shadow-xl sm:px-10 sm:py-10"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {stats.map((s) => (
              <StatItem key={s.label} {...s} start={inView} />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Achievements"
          className="mt-12 flex gap-2 overflow-x-auto pb-1 sm:justify-center"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${
                activeTab === tab.id
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-blue"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-8">
          {activeTab === "awards" && (
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {awards.map(
                ({ id, Icon, title, year, organization, description }) => (
                  <article
                    key={id}
                    className="group flex gap-4 rounded-2xl border-l-4 border-brand-blue bg-white p-5 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl sm:p-6"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-xl text-brand-blue transition group-hover:bg-brand-blue group-hover:text-white">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="font-bold text-brand-blue-dark sm:text-lg">
                        {title}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-brand-red">
                        <FaCalendarDays /> {year}
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {organization}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {description}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}

          {activeTab === "milestones" && (
            <ol className="relative mx-auto max-w-4xl space-y-6">
              <span className="absolute left-5 top-0 h-full w-0.5 -translate-x-1/2 bg-brand-blue/20 md:left-1/2" />
              {milestones.map((m, i) => (
                <li
                  key={m.id}
                  className={`relative pl-14 md:flex md:pl-0 ${
                    i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <span className="absolute left-0 top-5 z-10 flex size-10 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white ring-4 ring-slate-50 md:left-1/2 md:-translate-x-1/2">
                    {i + 1}
                  </span>
                  <div className="bg-white p-5 shadow-md ring-1 ring-slate-100 md:w-[calc(50%-2.5rem)]">
                    <p className="text-sm font-bold text-brand-red">{m.year}</p>
                    <h3 className="mt-1 font-bold text-brand-blue-dark sm:text-lg">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {m.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {activeTab === "certifications" && (
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {certifications.map((c) => (
                <article
                  key={c.id}
                  className="rounded-2xl border-l-4 border-brand-green bg-white p-5 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue">
                      <FaCertificate />
                    </span>
                    <h3 className="text-lg font-bold text-brand-blue-dark">
                      {c.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{c.description}</p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <FaClock /> Valid until: {c.validUntil}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
