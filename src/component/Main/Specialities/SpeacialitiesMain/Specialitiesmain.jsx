import { useState } from "react";
import Speacialitiesright from "./Right/Specialitiesright"

export default function Speacialitiesmain () {
  // The card number currently showing
          const [activeCard, setActiveCard] = useState(0);
          
          // Left text that changes with cards
          const cardTexts = [
            {
              title: "Urology",
              desc: "The Urology Department offers a wide range of medical and surgical services related to the urinary system (kidneys, bladder and urethra)"
            },
            {
              title: "Anesthesiology",
              desc: "Obstetrics & Gynecology department is characterized by specialized, personalized, and dedicated and consultant obstetrician care."
            },
            {
              title: "Laparoscopy Surgery",
              desc: "The surgeons and staff at the Laparoscopic Surgical Center is characterized by specialized, personalized,and dedicated and consultant obstetrician care"
            }
          ];

  return(
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* LEFT SECTION */}
            <div className="text-center px-5 py-5 md:py-0 w-[70%]">
              <h2 className="text-3xl font-bold mb-4">
                {cardTexts[activeCard].title}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {cardTexts[activeCard].desc}
              </p>
            </div>

            {/* RIGHT CARD SECTION */}
                <div className="w-full lg:w-1/2 flex justify-end w-[30%]">
                  <Speacialitiesright onActiveCardChange={setActiveCard} />
                </div>
        </div>
    )
}