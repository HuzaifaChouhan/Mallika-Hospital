import CardSwap, { Card } from './Specialitiesrightcompo';
import img1 from '../../../../../assets/heropagephoto.png';

export default function Speacialitiesright ({ onActiveCardChange }) {
  return (
    <div 
      className="w-full max-w-md lg:max-w-lg relative overflow-hidden "
      style={{ height: "570px" }}
    >
      <CardSwap
        onActiveCardChange={onActiveCardChange}
        cardDistance={40}
        verticalDistance={60}
        delay={5000}
        pauseOnHover={true}
      >
        <Card 
          style={{ backgroundImage: `url(${img1})` }}
          customClass="bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
        >           
          <div className="relative z-10 p-6 text-white">
            <h3 className="text-xl font-bold">Card 1</h3>
            <p>Your content here</p>
          </div>
          <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
        </Card>

        <Card 
          style={{ backgroundImage: `url(${img1})` }}
          customClass="bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
        >
          <div className="relative z-10 p-6 text-white">
            <h3 className="text-xl font-bold">Card 2</h3>
            <p>Your content here</p>
          </div>
          <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
        </Card>

        <Card 
          style={{ backgroundImage: `url(${img1})` }}
          customClass="bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
        >
          <div className="relative z-10 p-6 text-white">
            <h3 className="text-xl font-bold">Card 3</h3>
            <p>Your content here</p>
          </div>
          <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
        </Card>
      </CardSwap>
    </div>
  );
}
