import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaStethoscope,
  FaDroplet,
  FaHeartPulse,
  FaBrain,
  FaRibbon,
  FaNotesMedical,
  FaVial,
  FaHand,
  FaBaby,
  FaArrowRight,
} from "react-icons/fa6";

/* Replace each card's photo: import your own image and set it as `image` */
import placeholder from "../../../assets/img.png";

/* Keep this list in sync with the navbar. Links follow the navbar's URL pattern.
   SAMPLE descriptions: check the wording with Mallika before launch. */
const slug = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace("&", "and");

const specialities = [
  {
    name: "Physician & Diabetology",
    Icon: FaStethoscope,
    image: placeholder,
    text: "Diagnosis and long-term care for general medical conditions, diabetes and lifestyle-related illness.",
  },
  {
    name: "Nephrology",
    Icon: FaDroplet,
    image: placeholder,
    text: "Care for kidney conditions, from early detection and treatment to dialysis support.",
  },
  {
    name: "Cardiology",
    Icon: FaHeartPulse,
    image: placeholder,
    text: "Evaluation and treatment of heart and blood vessel conditions.",
  },
  {
    name: "Neurology",
    Icon: FaBrain,
    image: placeholder,
    text: "Care for conditions of the brain, spine and nervous system.",
  },
  {
    name: "Oncology",
    Icon: FaRibbon,
    image: placeholder,
    text: "Cancer diagnosis, treatment planning and supportive care.",
  },
  {
    name: "Gastroenterology",
    Icon: FaNotesMedical,
    image: placeholder,
    text: "Treatment of digestive, stomach, liver and bowel conditions.",
  },
  {
    name: "Hematology",
    Icon: FaVial,
    image: placeholder,
    text: "Care for blood disorders, including anaemia and clotting problems.",
  },
  {
    name: "Dermatology",
    Icon: FaHand,
    image: placeholder,
    text: "Treatment for skin, hair and nail conditions.",
  },
  {
    name: "Pediatrician",
    Icon: FaBaby,
    image: placeholder,
    text: "Health care for infants, children and adolescents, from check-ups to illness.",
  },
];

const surgeries = [
  "General Surgery",
  "Onco Surgery",
  "Obstetrics & Gynecology",
  "Orthopedic",
  "Neuro Surgery",
  "Urology",
  "ENT",
  "Proctology",
  "Plastic Surgery",
  "Pediatric Surgery",
];

const INITIAL_COUNT = 6;

export default function Specialities() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? specialities : specialities.slice(0, INITIAL_COUNT);

  return (
    <section className="w-full bg-slate-50 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl lg:text-6xl">
            Our <span className="text-brand-red">Specialities</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 sm:text-lg">
            Expert consultation across medical specialities, all under one roof.
          </p>
        </div>

        {/* Speciality cards */}
        <ul className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
          {visible.map(({ name, Icon, image, text }) => (
            <li key={name} className="flex">
              <Link
                to={`/consultants/${slug(name)}`}
                className="group flex w-full flex-col"
              >
                {/* Photo */}
                <div className="aspect-[4/3.4] overflow-hidden bg-brand-blue-light">
                  <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content box overlapping the photo */}
                <div className="relative z-10 mx-2 -mt-10 flex flex-1 flex-col items-center bg-white px-3 pb-4 pt-9 text-center shadow-lg ring-1 ring-slate-100 transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl sm:mx-7 sm:-mt-14 sm:px-5 sm:pb-6 sm:pt-12">
                  {/* Icon circle on the top edge */}
                  <span className="absolute -top-6 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-xl text-brand-blue shadow-lg ring-1 ring-slate-100 transition duration-300 group-hover:bg-brand-blue group-hover:text-white sm:-top-8 sm:size-16 sm:text-2xl">
                    <Icon />
                  </span>

                  <h3 className="text-sm font-bold leading-snug text-brand-blue-dark transition group-hover:text-brand-blue sm:text-xl">
                    {name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600 sm:mt-3 sm:line-clamp-none sm:text-sm">
                    {text}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue sm:mt-4 sm:gap-2 sm:text-sm">
                    Read More
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul> 

        {/* Show more / less */}
        {specialities.length > INITIAL_COUNT && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center justify-center bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
            >
              {showAll ? "Show Less" : "View All Specialities"}
            </button>
          </div>
        )}

        {/* Surgical specialities */}
        <div className="mt-16 bg-white p-6 shadow-md ring-1 ring-slate-100 sm:p-8">
          <h3 className="text-2xl font-bold text-brand-blue-dark">
            Surgical <span className="text-brand-red">Specialities</span>
          </h3>
          <div className="mt-2 h-1 w-16 bg-brand-blue" />

          <ul className="mt-6 flex flex-wrap gap-3">
            {surgeries.map((name) => (
              <li key={name}>
                <Link
                  to={`/surgeries/${slug(name)}`}
                  className="block border border-brand-blue/40 bg-brand-blue-light px-4 py-2.5 text-sm font-semibold text-brand-blue-dark transition hover:border-brand-blue hover:bg-brand-blue hover:text-white"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
