import Speacialitiesleft from "./Left/Specialitiesleft"
import Speacialitiesright from "./Right/Specialitiesright"

export default function Speacialitiesmain () {
    return(
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* LEFT TEXT SECTION */}
                <div className="w-full lg:w-1/2 p-5">
                  <Speacialitiesleft />
                </div>

            {/* RIGHT CARD SECTION */}
                <div className="w-full lg:w-1/2 flex justify-end">
                  <Speacialitiesright />
                </div>
        </div>
    )
}