import { useState } from "react";
// import Speacialitiesleft from "./Left/Specialitiesleft"
import Speacialitiesright from "./Right/Specialitiesright"

export default function Speacialitiesmain () {
  // The card number currently showing
          const [activeCard, setActiveCard] = useState(0);
          
          // Left text that changes with cards
          const cardTexts = [
            {
              title: "Orthopedics",
              desc: "We provide advanced bone and joint treatments with experienced doctors."
            },
            {
              title: "Cardiology",
              desc: "Our heart specialists offer world-class cardiac care with modern facilities."
            },
            {
              title: "Neurology",
              desc: "Expert neuro specialists for brain and spine-related disorders."
            }
          ];

  return(
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* LEFT SECTION */}
            <div className="text-center px-10 py-5 md:py-0 ">
              <h2 className="text-3xl font-bold mb-4">
                {cardTexts[activeCard].title}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {cardTexts[activeCard].desc}
              </p>
            </div>

            {/* RIGHT CARD SECTION */}
                <div className="w-full lg:w-1/2 flex justify-end">
                  <Speacialitiesright onActiveCardChange={setActiveCard} />
                </div>
        </div>
    )
}