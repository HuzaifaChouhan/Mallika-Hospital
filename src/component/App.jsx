import React, { useEffect, lazy, Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// Primary Components (Loaded upfront for immediate homepage render)
import TopBar from "./Header/TopBar/TopBar";
import Navbar from "./Header/Navbar/navbar";
import Header from "./Header/header";
import Main from "./Main/main";
import Footer from "./Footer/footer";
import BookingTab from "./BookingTab/BookingTab";

// Lazy-loaded Service Pages
const CathLab = lazy(() => import("./Header/Services/cathlab"));
const ICU = lazy(() => import('./Header/Services/icu'));
const OperatingTheatre = lazy(() => import('./Header/Services/ot'));
const Ward = lazy(() => import('./Header/Services/ward'));
const DialysisCenter = lazy(() => import('./Header/Services/dialysiscenter'));
const Pharmacy = lazy(() => import('./Header/Services/pharmacy'));
const Laboratory = lazy(() => import('./Header/Services/lab'));

// Lazy-loaded Surgeries
const GeneralSurgery = lazy(() => import('./Header/Surgeries/GeneralSurgery'));
// const OncoSurgery = lazy(() => import('./Header/Surgeries/OncoSurgery'));
// const ObstetricsGynecology = lazy(() => import('./Header/Surgeries/ObstetricsGynecology'));
// const Orthopedic = lazy(() => import('./Header/Surgeries/Orthopedic'));
// const NeuroSurgery = lazy(() => import('./Header/Surgeries/NeuroSurgery'));
const Ent = lazy(() => import('./Header/Surgeries/Ent'));
// const Opthalmology = lazy(() => import('./Header/Surgeries/Opthalmology'));
// const Proctology = lazy(() => import('./Header/Surgeries/Proctology'));
// const PediatricSurgery = lazy(() => import("./Header/Surgeries/PediatricSurgery.jsx"));
// const PlasticSurgery = lazy(() => import('./Header/Surgeries/PlasticSurgery.jsx'));
// const Urology = lazy(() => import("./Header/Surgeries/Urology.jsx"));

// Lazy-loaded Consultants
const InternalMedicine = lazy(
  () => import("./Header/Consultants/PhysicianDiabetology"),
);
const Nephrology = lazy(() => import("./Header/Consultants/Neprology"));
const Cardiology = lazy(() => import("./Header/Consultants/Cardiology"));
const Neurology = lazy(() => import("./Header/Consultants/Neurology"));
const Oncology = lazy(() => import("./Header/Consultants/Oncology"));
const Gastroenterology = lazy(
  () => import("./Header/Consultants/Gastroenterology"),
);
const Pediatrician = lazy(() => import("./Header/Consultants/Pediatrician"));
const Dermatology = lazy(() => import("./Header/Consultants/Dermatology"));
const Hematology = lazy(() => import("./Header/Consultants/Hematology"));

// Lazy-loaded Additional Pages
const AboutUs = lazy(() => import("./AboutUs/About"));
const CashlessTpa = lazy(() => import("./Cashless&TPA/CashlessTPA"));
const GovtSchemes = lazy(() => import("./GovtSch/GovtSchemes"));
const ContactUs = lazy(() => import("./ContactUS/ContactUs"));
const Testimonial = lazy(() => import("./Testimonal/Testimonial"));

// Shown for pages that aren't built yet (for example /find-doctor)
function ComingSoon() {
  const { pathname } = useLocation();
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-brand-blue-dark">
        Page coming soon
      </h1>
      <p className="mt-2 text-slate-600">{pathname}</p>
    </div>
  );
}

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />

      <div className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500 font-medium">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Homepage */}
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Main />
                </>
              }
            />

            {/* Core Routes */}
            <Route path="/about-us" element={<AboutUs />} />

            {/* Service Pages */}
            <Route path="/services/cathlab" element={<CathLab />} />
            <Route path="/services/icu" element={<ICU />} />
            <Route path="/services/ot" element={<OperatingTheatre />} />
            <Route path="/services/ward" element={<Ward />} />
            <Route path="/services/dialysis-center" element={<DialysisCenter />}/>
            <Route path="/services/pharmacy" element={<Pharmacy />} />
            <Route path="/services/pathology-lab" element={<Laboratory />} />

            {/* Surgery Pages */}
            <Route path="/surgeries/general-surgery" element={<GeneralSurgery />} />
            {/* <Route path="/surgeries/onco-surgery" element={<OncoSurgery />} /> */}
            {/* <Route path="/surgeries/obstetrics-and-gynecology" element={<ObstetricsGynecology />} /> */}
            {/* <Route path="/surgeries/orthopedic" element={<Orthopedic />} /> */}
            {/* <Route path="/surgeries/neuro-surgery" element={<NeuroSurgery />} /> */}
            <Route path="/surgeries/ent" element={<Ent />} />
            {/* <Route path="/surgeries/Opthalmology" element={<Opthalmology />} /> */}
            {/* <Route path="/surgeries/proctology" element={<Proctology />} /> */}
            {/* <Route path="/surgeries/pediatric-surgery" element={<PediatricSurgery />} /> */}
            {/* <Route path="/surgeries/plastic-surgery" element={<PlasticSurgery />} /> */}
            {/* <Route path="/surgeries/urology" element={<Urology />} /> */}

            {/* Consultants Pages */}
            <Route path="/consultants/physician-and-diabetology" element={<InternalMedicine />} />
            <Route path="/consultants/nephrology" element={<Nephrology />} />
            <Route path="/consultants/cardiology" element={<Cardiology />} />
            <Route path="/consultants/neurology" element={<Neurology />} />
            <Route path="/consultants/oncology" element={<Oncology />} />
            <Route path="/consultants/gastroenterology" element={<Gastroenterology />} />
            <Route path="/consultants/hematology" element={<Hematology />} />
            <Route path="/consultants/dermatology" element={<Dermatology />} />
            <Route path="/consultants/pediatrician" element={<Pediatrician />} />

            {/* Additional Pages */}
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/cashless-&-tpa" element={<CashlessTpa />} />
            <Route path="/govt.sch" element={<GovtSchemes />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Anything not built yet (find-doctor, etc.) */}
            <Route path="*" element={<ComingSoon />} />
          </Routes> 
        </Suspense>
      </div>

      <Footer />
      <BookingTab />

      {/* GLOBAL FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919082097421"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />

        <span className="absolute left-16 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none whitespace-nowrap hidden sm:block border border-gray-100">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

export default App;
