import Specialities from "./Specialities/Specialities";
import Achievements from './Achievement/Achievement'
import Healthquote from "./HealthQuote/Healthquote";

export default function Main () {
    return (
        <div className="min-h-screen w-full border">
            <Healthquote/>
            <Specialities/>
            <Achievements/>
        </div>
    );
}