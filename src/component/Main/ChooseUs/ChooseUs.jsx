import {
  FaFlask,
  FaUserDoctor,
  FaClipboardCheck,
  FaUserNurse,
} from "react-icons/fa6";

// import img1 from '../../../assets/WhyChooseUs/Lab.png';
// import img2 from '../../../assets/WhyChooseUs/Expertise.png';
// import img3 from '../../../assets/WhyChooseUs/Result.png';
// import img4 from '../../../assets/WhyChooseUs/Staff.png';
import img1 from "../../../assets/img.png";
import img2 from "../../../assets/img.png";
import img3 from "../../../assets/img.png";
import img4 from "../../../assets/img.png";

const reasons = [
  {
    Icon: FaFlask,
    img: img1,
    alt: "High quality laboratory",
    title: "High Quality Lab",
    text: "Experience precision in every test. Our modern facility ensures accurate results for your peace of mind.",
  },
  {
    Icon: FaUserDoctor,
    img: img2,
    alt: "Experienced medical experts",
    title: "Unmatched Expertise",
    text: "Trust in our seasoned professionals. With years of experience, our team delivers care tailored to your needs.",
  },
  {
    Icon: FaClipboardCheck,
    img: img3,
    alt: "Accurate medical results",
    title: "Precise Results",
    text: "Expect accuracy. Our rigorous protocols support reliable outcomes and guide your healthcare journey with confidence.",
  },
  {
    Icon: FaUserNurse,
    img: img4,
    alt: "Qualified medical staff",
    title: "Qualified Staff",
    text: "Rely on our skilled professionals. Committed to your well-being, our knowledgeable team provides top-notch care at every step.",
  },
];

export default function Chooseus() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-brand-blue-dark sm:text-5xl lg:text-6xl">
            Why <span className="text-brand-red">Choose Us</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-linear-to-r from-brand-blue via-brand-green to-brand-red" />
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 sm:text-lg">
            Experience excellence in care tailored to you. Our commitment to
            compassionate service ensures your well-being every step of the way.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {reasons.map(({ Icon, img, alt, title, text }) => (
            <article
              key={title}
              className="group overflow-hidden bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="h-28 overflow-hidden sm:h-48">
                <img
                  src={img}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="relative px-3 pb-4 pt-8 sm:px-5 sm:pb-6 sm:pt-9">
                {/* Icon badge overlapping the image */}
                <span className="absolute -top-5 left-3 flex size-10 items-center justify-center rounded-full bg-brand-blue text-base text-white shadow-lg ring-4 ring-white transition group-hover:bg-brand-red sm:-top-7 sm:left-5 sm:size-14 sm:text-xl">
                  <Icon />
                </span>

                <h3 className="text-sm font-bold leading-snug text-brand-blue-dark sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 line-clamp-5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:line-clamp-none sm:text-sm">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
