import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserDoctor,
  FaStethoscope,
  FaShieldHalved,
  FaDroplet,
  FaHeartPulse,
  FaSyringe,
  FaBowlFood,
  FaPills,
  FaPersonRunning,
  FaBanSmoking,
  FaVial,
  FaTriangleExclamation,
  FaPhone,
  FaArrowRight,
  FaArrowLeft,
  FaClipboardCheck,
  FaRotateLeft,
  FaCircleCheck,
} from "react-icons/fa6";
import DoctorCard from "../DoctorCard";

import img1 from "../../../assets/img.png";
import img2 from "../../../assets/img.png";
import img3 from "../../../assets/img.png";
import img4 from "../../../assets/img.png";
import img5 from "../../../assets/img.png";

const HOSPITAL_PHONE = "+91 9082097421";

/* ---------------------------------------------------------------
   PLACEHOLDER DOCTORS: replace with the real nephrologists.
   Only publish details each doctor has confirmed.
   - photo_url: import the photo and put it here, or leave '' for an icon
   - start_time / end_time: 24-hour "HH:MM", or leave '' for "By Appointment"
---------------------------------------------------------------- */
const doctors = [
  {
    id: 1,
    name: "Dr. Name Surname",
    department_name: "Nephrology",
    display_available_days: "Monday to Saturday",
    start_time: "10:00",
    end_time: "13:00",
    phone: "",
    photo_url: "",
    active: true,
  },
  {
    id: 2,
    name: "Dr. Name Surname",
    department_name: "Nephrology",
    display_available_days: "Monday, Wednesday, Friday",
    start_time: "16:00",
    end_time: "19:00",
    phone: "",
    photo_url: "",
    active: true,
  },
  {
    id: 3,
    name: "Dr. Name Surname",
    department_name: "Nephrology",
    display_available_days: "Monday, Wednesday, Friday",
    start_time: "16:00",
    end_time: "19:00",
    phone: "",
    photo_url: "",
    active: true,
  },
  {
    id: 4,
    name: "Dr. Name Surname",
    department_name: "Nephrology",
    display_available_days: "Monday, Wednesday, Friday",
    start_time: "16:00",
    end_time: "19:00",
    phone: "",
    photo_url: "",
    active: true,
  },
];

const partnershipPoints = [
  {
    Icon: FaStethoscope,
    title: "Comprehensive Diagnostics",
    text: "We utilize advanced lab tests, imaging, and kidney biopsies to provide an accurate diagnosis.",
  },
  {
    Icon: FaShieldHalved,
    title: "Chronic Disease Management",
    text: "We create personalized plans to slow the progression of kidney disease and manage complications like hypertension and anemia.",
  },
  {
    Icon: FaUserDoctor,
    title: "Renal Replacement Therapy",
    text: "Our experts manage all aspects of dialysis and work closely with the transplant team for those who need it.",
  },
];

const expertise = [
  {
    Icon: FaDroplet,
    title: "Chronic Kidney Disease (CKD)",
    text: "We provide expert management for all stages of CKD, focusing on slowing progression, managing symptoms, and preparing patients for future renal replacement therapy.",
    img: img3,
    alt: "Abstract visualization of water and filtration",
  },
  {
    Icon: FaHeartPulse,
    title: "Dialysis & Hypertension",
    text: "Our nephrologists oversee and manage dialysis plans to ensure they are effective and comfortable. We also specialize in managing difficult-to-control hypertension related to kidney issues.",
    img: img4,
    alt: "Dialysis machine and patient",
  },
  {
    Icon: FaShieldHalved,
    title: "Glomerular & Transplant Care",
    text: "We have expertise in treating complex inflammatory conditions of the kidney (glomerulonephritis) and provide comprehensive care for patients before and after a kidney transplant.",
    img: img5,
    alt: "Doctor analyzing a medical report",
  },
];

/* ---------------------------------------------------------------
   KIDNEY RISK CHECK: have your nephrologists review these questions,
   weights and result wording before publishing.
   Scoring: every ticked option adds its question's weight.
   An option marked redFlag jumps straight to the "high" result.
---------------------------------------------------------------- */
const MODERATE_AT = 3;
const HIGH_AT = 6;

const riskQuestions = [
  {
    title: "Do any of these apply to your health history?",
    hint: "These conditions are linked with a higher chance of kidney problems.",
    weight: 1,
    options: [
      { id: "diabetes", label: "Diabetes or high blood sugar" },
      { id: "bp", label: "High blood pressure" },
      { id: "family", label: "A close family member with kidney disease" },
      { id: "heart", label: "Heart disease" },
      { id: "age", label: "I am above 60 years of age" },
      {
        id: "stones",
        label: "Past kidney stones or repeated urine infections",
      },
    ],
  },
  {
    title: "Have you noticed any of these symptoms recently?",
    hint: "Kidney problems can be silent for a long time, so even mild changes are worth noting.",
    weight: 2,
    options: [
      {
        id: "swelling",
        label: "Swelling in the feet, ankles, or around the eyes",
      },
      { id: "foamy", label: "Foamy or bubbly urine" },
      { id: "tired", label: "Feeling unusually tired or weak" },
      {
        id: "urination",
        label:
          "Passing much more or much less urine than usual, especially at night",
      },
      { id: "itch", label: "Persistent itching, nausea, or loss of appetite" },
      { id: "blood", label: "Blood in the urine", redFlag: true },
    ],
  },
  {
    title: "Do any of these habits apply to you?",
    hint: "Everyday habits can add up over the years.",
    weight: 1,
    options: [
      {
        id: "painkillers",
        label:
          "I regularly take painkillers (such as ibuprofen or diclofenac) without medical advice",
      },
      { id: "water", label: "I drink very little water through the day" },
      {
        id: "salt",
        label: "I eat high-salt or heavily processed food most days",
      },
      { id: "tobacco", label: "I smoke or use tobacco" },
      {
        id: "nocheck",
        label:
          "I have not had a blood pressure or kidney test in the past year",
      },
    ],
  },
];

const riskResults = {
  low: {
    title: "Lower risk based on your answers",
    text: "You ticked few or no risk factors. Keep up healthy habits, and have a routine kidney check once a year, especially if you have diabetes or high blood pressure.",
  },
  moderate: {
    title: "Some risk factors were noted",
    text: "A few of your answers are linked with kidney problems. A simple blood and urine test can show how well your kidneys are working. We suggest booking a check-up with our nephrology team.",
  },
  high: {
    title: "We recommend seeing a kidney specialist soon",
    text: "Your answers include several risk factors or symptoms that should be checked. Please book a consultation with a nephrologist at the earliest.",
  },
};

const levelStyles = {
  low: {
    Icon: FaCircleCheck,
    text: "text-brand-green",
    border: "border-brand-green",
  },
  moderate: {
    Icon: FaTriangleExclamation,
    text: "text-amber-500",
    border: "border-amber-500",
  },
  high: {
    Icon: FaTriangleExclamation,
    text: "text-brand-red",
    border: "border-brand-red",
  },
};

const emergencyNote =
  "If you pass very little or no urine, or have severe breathlessness, chest pain or confusion, do not wait. Go to the nearest emergency department or call us right away.";

/* ---------------------------------------------------------------
   PRECAUTIONS: general guidance. Have your doctors review the wording.
---------------------------------------------------------------- */
const precautions = [
  {
    Icon: FaDroplet,
    title: "Stay Well Hydrated",
    text: "Drink enough water through the day. If you have heart or advanced kidney disease, ask your doctor how much fluid is right for you.",
  },
  {
    Icon: FaHeartPulse,
    title: "Control Blood Pressure",
    text: "High blood pressure is a leading cause of kidney damage. Check it regularly and take prescribed medicines on time.",
  },
  {
    Icon: FaSyringe,
    title: "Manage Blood Sugar",
    text: "If you have diabetes, keep your sugar within the range your doctor sets and get your kidneys tested every year.",
  },
  {
    Icon: FaBowlFood,
    title: "Eat Less Salt",
    text: "Limit salt and processed foods. Many adults should stay under about one teaspoon (5 g) of salt a day, unless their doctor advises otherwise.",
  },
  {
    Icon: FaPills,
    title: "Be Careful With Painkillers",
    text: "Avoid taking painkillers such as ibuprofen or diclofenac regularly without medical advice, and check before using herbal remedies for long periods.",
  },
  {
    Icon: FaPersonRunning,
    title: "Stay Active & Keep a Healthy Weight",
    text: "Regular movement on most days helps control blood pressure, blood sugar, and weight, all of which protect your kidneys.",
  },
  {
    Icon: FaBanSmoking,
    title: "Avoid Tobacco, Limit Alcohol",
    text: "Smoking reduces blood flow to the kidneys and speeds up kidney damage. Keep alcohol to a minimum.",
  },
  {
    Icon: FaVial,
    title: "Get Regular Check-ups",
    text: "A yearly blood creatinine test, urine protein test, and blood pressure reading is wise if you have diabetes, high blood pressure, a family history, or are above 60.",
  },
];

const warningSigns = [
  "Swelling of the feet, ankles, or face",
  "Foamy urine, or blood in the urine",
  "Passing much less or much more urine than usual",
  "Burning or pain while passing urine",
  "Ongoing tiredness, nausea, or itching",
  "Blood pressure that stays high despite medicines",
];

function SectionHeading({ before, highlight }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl lg:text-5xl">
        {before} <span className="text-brand-red">{highlight}</span>
      </h2>
      <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
    </div>
  );
}

const Nephrology = () => {
  // Risk check state
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);

  const totalSteps = riskQuestions.length;
  const finished = step >= totalSteps;
  const currentQuestion = riskQuestions[step];

  const toggleOption = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const score = riskQuestions.reduce(
    (sum, q) =>
      sum + q.options.filter((o) => selected.includes(o.id)).length * q.weight,
    0,
  );
  const hasRedFlag = riskQuestions.some((q) =>
    q.options.some((o) => o.redFlag && selected.includes(o.id)),
  );
  const level =
    hasRedFlag || score >= HIGH_AT
      ? "high"
      : score >= MODERATE_AT
        ? "moderate"
        : "low";

  const result = riskResults[level];
  const style = levelStyles[level];
  const ResultIcon = style.Icon;

  const restartCheck = () => {
    setSelected([]);
    setStep(0);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero banner */}
      <section className="relative isolate flex h-72 items-center justify-center overflow-hidden sm:h-96">
        <img
          src={img1}
          alt="Nephrology"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/45 via-brand-blue/30 to-brand-blue/20" />

        <div className="px-4 text-center text-white">
          <h1 className="text-3xl font-bold drop-shadow-lg sm:text-4xl md:text-5xl">
            Nephrology
          </h1>
          <div className="mx-auto mt-4 h-1 w-32 bg-white" />
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium drop-shadow-md sm:mt-6 sm:text-xl">
            Leaders in kidney health, dedicated to managing chronic kidney
            disease and hypertension.
          </p>
        </div>
      </section>

      {/* Doctors: 2 per row on mobile */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Nephrology" highlight="Consultants" />

          {doctors.length === 0 ? (
            <p className="mt-10 text-center text-slate-600">
              Our consultant list will be updated soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading before="Experts in" highlight="Kidney Care" />
          <p className="mt-6 text-center text-base leading-relaxed text-slate-700 sm:mt-8 sm:text-lg">
            Our team of qualified nephrologists specializes in diagnosing and
            treating diseases of the kidneys and urinary system. We are
            dedicated to providing comprehensive, long-term care to manage
            chronic conditions, slow disease progression, and improve your
            quality of life.
          </p>
        </div>
      </section>

      {/* Partnership */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue-dark sm:text-4xl">
              A Partnership for Your{" "}
              <span className="text-brand-red">Kidney Health</span>
            </h2>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
            <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
              We understand that managing kidney disease is a long journey. We
              are here to be your dedicated partners, providing expert care and
              support every step of the way.
            </p>

            <ul className="mt-6 space-y-5">
              {partnershipPoints.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-3 sm:gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue sm:size-11">
                    <Icon />
                  </span>
                  <p className="text-sm text-slate-700 sm:text-base">
                    <strong className="text-brand-blue-dark">{title}:</strong>{" "}
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-3 sm:mx-0">
            <div className="absolute -bottom-3 -right-3 size-full bg-brand-green/30 sm:-bottom-4 sm:-right-4" />
            <img
              src={img2}
              alt="Nephrologist consulting with a patient"
              loading="lazy"
              className="relative aspect-[4/3] w-full object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Kidney risk check */}
      <section
        id="risk-check"
        className="scroll-mt-28 bg-linear-to-br from-brand-blue-dark to-brand-blue px-4 py-12 text-white sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-white/15 text-xl ring-1 ring-white/30 sm:size-14 sm:text-2xl">
              <FaClipboardCheck />
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Kidney Health Risk Check
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-white/80" />
            <p className="mx-auto mt-5 max-w-xl text-white/85 sm:text-lg">
              Answer 3 quick questions to see whether a kidney check-up is worth
              booking. It takes under a minute.
            </p>
          </div>

          <div className="mt-8 bg-white p-4 text-slate-800 shadow-2xl sm:mt-10 sm:p-8">
            {!finished ? (
              <>
                {/* Progress */}
                <div className="flex items-center justify-between text-sm font-semibold text-brand-blue-dark">
                  <span>
                    Question {step + 1} of {totalSteps}
                  </span>
                  <span className="text-xs text-slate-500 sm:text-sm">
                    Tick all that apply
                  </span>
                </div>
                <div className="mt-3 flex gap-2" aria-hidden="true">
                  {riskQuestions.map((q, i) => (
                    <span
                      key={q.title}
                      className={`h-1.5 flex-1 ${i <= step ? "bg-brand-blue" : "bg-slate-200"}`}
                    />
                  ))}
                </div>

                <fieldset key={step} className="mt-5 sm:mt-6">
                  <legend className="text-lg font-bold leading-snug text-brand-blue-dark sm:text-2xl">
                    {currentQuestion.title}
                  </legend>
                  {currentQuestion.hint && (
                    <p className="mt-1 text-sm text-slate-500">
                      {currentQuestion.hint}
                    </p>
                  )}

                  <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3">
                    {currentQuestion.options.map((o) => {
                      const checked = selected.includes(o.id);
                      return (
                        <label
                          key={o.id}
                          className={`flex cursor-pointer items-start gap-3 border p-3 transition sm:p-4 ${
                            checked
                              ? "border-brand-blue bg-brand-blue-light"
                              : "border-slate-200 hover:border-brand-blue/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOption(o.id)}
                            className="mt-0.5 size-5 shrink-0 accent-brand-blue"
                          />
                          <span className="text-sm text-slate-700 sm:text-base">
                            {o.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-2 border-2 border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white sm:px-5 sm:py-3 sm:text-base"
                    >
                      <FaArrowLeft /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-blue-dark sm:px-6 sm:py-3 sm:text-base"
                  >
                    {step === totalSteps - 1 ? "See My Result" : "Next"}{" "}
                    <FaArrowRight />
                  </button>
                </div>
              </>
            ) : (
              <div aria-live="polite">
                <div
                  className={`border-l-4 bg-slate-50 p-4 sm:p-6 ${style.border}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <ResultIcon
                      className={`mt-1 shrink-0 text-2xl sm:text-3xl ${style.text}`}
                    />
                    <div>
                      <h3 className="text-lg font-bold leading-snug text-brand-blue-dark sm:text-2xl">
                        {result.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                        {result.text}
                      </p>
                      <p className="mt-3 text-sm text-slate-500">
                        You ticked {selected.length}{" "}
                        {selected.length === 1 ? "item" : "items"} in total.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
                  >
                    Book a Check-up <FaArrowRight />
                  </Link>
                  <a
                    href={`tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                  >
                    <FaPhone /> Call {HOSPITAL_PHONE}
                  </a>
                  <button
                    type="button"
                    onClick={restartCheck}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 font-semibold text-slate-600 transition hover:text-brand-blue"
                  >
                    <FaRotateLeft /> Start Again
                  </button>
                </div>

                <p className="mt-6 flex items-start gap-2 bg-red-50 p-4 text-sm font-medium text-red-800">
                  <FaTriangleExclamation className="mt-0.5 shrink-0" />
                  {emergencyNote}
                </p>
              </div>
            )}

            <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500">
              This quick check is for awareness only. It is not a diagnosis and
              does not replace advice from a doctor.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of expertise */}
      <section className="px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading before="Our Areas of" highlight="Expertise" />

          <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
            {expertise.map(({ Icon, title, text, img, alt }, i) => (
              <article
                key={title}
                className={`flex flex-col items-stretch overflow-hidden bg-white shadow-md ring-1 ring-slate-100 md:flex-row ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-col justify-center border-t-4 border-brand-blue p-5 sm:p-8 md:w-1/2 md:border-l-4 md:border-t-0">
                  <span className="flex size-12 items-center justify-center rounded-full bg-brand-blue-light text-xl text-brand-blue sm:size-14 sm:text-2xl">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-brand-blue-dark sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                    {text}
                  </p>
                </div>

                <div className="h-48 sm:h-64 md:h-auto md:w-1/2">
                  <img
                    src={img}
                    alt={alt}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Precautions: 2 per row on mobile */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            before="Protect Your Kidneys:"
            highlight="Precautions"
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600 sm:text-lg">
            Simple everyday habits that lower your chance of kidney damage.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
            {precautions.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="border-t-4 border-brand-blue bg-white p-4 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-5"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue-light text-lg text-brand-blue sm:size-12 sm:text-xl">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-blue-dark sm:mt-4 sm:text-base">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                  {text}
                </p>
              </li>
            ))}
          </ul>

          {/* When to see a doctor */}
          <div className="mt-10 border-l-4 border-brand-red bg-white p-5 shadow-md ring-1 ring-slate-100 sm:mt-12 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-xl text-brand-red">
                <FaTriangleExclamation />
              </span>
              <div>
                <h3 className="text-xl font-bold text-brand-blue-dark sm:text-2xl">
                  See a doctor promptly if you notice
                </h3>
                <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-slate-700 sm:grid-cols-2 sm:text-base">
                  {warningSigns.map((sign) => (
                    <li key={sign} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-red" />
                      {sign}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-sm font-medium text-red-800">
                  {emergencyNote}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
                  >
                    Book an Appointment <FaArrowRight />
                  </Link>
                  <a
                    href={`tel:${HOSPITAL_PHONE.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center justify-center gap-2.5 border-2 border-brand-red px-6 py-3 font-semibold text-brand-red transition hover:bg-brand-red hover:text-white"
                  >
                    <FaPhone /> Call {HOSPITAL_PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            These are general tips. If you already have kidney disease, follow
            your own doctor's advice on fluids, diet and medicines.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Nephrology;
