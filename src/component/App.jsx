import React from 'react';
import { Routes, Route } from "react-router-dom";

// Components
import Header from './Header/header';
import Navbar from './Header/Navbar/navbar'; 
import Main from './Main/main';
import Footer from './Footer/footer';

import CathLab from './Header/Services/cathlab'; 
import ICU from './Header/Services/icu';
import OperatingTheatre from './Header/Services/ot';
import Ward from './Header/Services/ward';
import DialysisCenter from './Header/Services/dialysiscenter';
import Pharmacy from './Header/Services/pharmacy';
import Laboratory from './Header/Services/lab';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      
      <div className="flex-grow"> 
        <Routes>
          {/* Homepage */}
          <Route path="/" element={
            <>
              <Header/>
              <Main/>
            </>
          } />          
          {/* Service Pages */}
          <Route path="/services/cathlab" element={<CathLab />} />
          <Route path="/services/icu" element={<ICU />} />
          <Route path="/services/ot" element={<OperatingTheatre />} />
          <Route path="/services/ward" element={<Ward />} />
          <Route path="/services/dialysis-center" element={<DialysisCenter />} />
          <Route path="/services/pharmacy" element={<Pharmacy />} />
          <Route path="/services/lab" element={<Laboratory />} />

          
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;