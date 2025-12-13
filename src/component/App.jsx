import React from 'react';
import { Routes, Route } from "react-router-dom";

// Components
import Header from './Header/header';
import Navbar from './Header/Navbar/navbar'; // Adjust path if Navbar is in a specific folder
import Main from './Main/main';
import Footer from './Footer/footer';

import CathLab from './Header/Services/cathlab'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> 
      
      {/* pt-20 adds padding so the fixed navbar doesn't hide content */}
      <div className="flex-grow pt-20"> 
        <Routes>
          {/* Homepage */}
          <Route path="/" element={
            <>
              <Header/>
              <Main/>
            </>
          } />          
          {/* Service Pages */}
          {/* This path MUST match what the Navbar generates */}
          <Route path="/services/cathlab" element={<CathLab />} />
          
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;