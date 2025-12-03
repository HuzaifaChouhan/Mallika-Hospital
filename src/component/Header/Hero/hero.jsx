export default function Hero () {
    return(
        <div className="w-full h-screen bg-cyan-900 opacity-60 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-10 text-white">
                WELCOME TO <br/>
                MALLIKA HOSPITAL
            </h1>
            <div className="flex justify-center items-center gap-10 md:gap-50">
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Book Appointment
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Find Doctor
                </a>
            </div>
        </div>
    );
}