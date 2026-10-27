import Healthquote from "./HealthQuote/Healthquote";
import Specialities from "./Specialities/Specialities";
import Authorities from "./Authorities/Authorities";
import Achievements from './Achievement/Achievement'
import FAQ from "./FAQ/faq";
import Chooseus from "./ChooseUs/ChooseUs";
import TopDoctors from "./TopDoctors/TopDoctors";
import KeyFacts from "./KeyFacts/KeyFacts";
import TestimonalSection from './TestimonialSection/TestimonialSection'

export default function Main () {
    return (
        <div className="min-h-screen w-full">
            <Healthquote/>
            <Specialities/>
            <TopDoctors/>
            <KeyFacts/>
            <Authorities/>
            <Achievements/>
            <FAQ/>
            <Chooseus/>
            <TestimonalSection/>
        </div>
    );
}