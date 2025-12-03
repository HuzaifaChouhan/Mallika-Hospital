import React, { useState, useEffect, useRef } from 'react';
import MalikaHospitallogo from '../../../assets/MalikaHospital-logo.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const navItems = [
    {
      title: 'About Us',
      dropdownItems: [],
    },
    {
      title: 'Our Services',
      dropdownItems: ['CATHLAB', 'ICU', 'OT', 'WARD', 'DIAYSIS CENTER', 'PHARMACY', 'LAB'],
    },
    {
      title: 'Sugeries',
      dropdownItems: ['General Surgery', 'Plastic Surgery', 'Onco Surgery', 'Orthopedic', 'Urology', 'Neuro Surgery', 'Ent', 'Proctology', 'Obstetrics & Gynecology', 'Opthalmology', 'Vascular Surgery'],
    },
    {
      title: 'Consultants',
      dropdownItems: ['Cardiology', 'Neurology', 'Urology', 'Physician & Diabetology', 'Neprology', 'Gastroenterology', 'Oncology', 'Pediatrician', 'Dermatology', 'Radiology'],
    },
    {
      title: 'Cashless & TPA',
      dropdownItems: [],
    },
    {
      title: 'Govt.Sch',
      dropdownItems: [],
    },
    {
      title: 'Contact',
      dropdownItems: [],
    },
    {
      title: 'Media',
      dropdownItems: [],
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (title) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="transpraent backdrop-blur-lg shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#">
              <img className='size-27' src={MalikaHospitallogo} alt="Malika Hospital"/>
            </a>
          </div>

          {/* Desktop Navigation & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex size-fit" ref={dropdownRef}>
              {navItems.map((item) => (
                <div key={item.title} className="relative">
                  <button
                    onClick={() => {
                      if (item.dropdownItems.length > 0) {
                        toggleDropdown(item.title);
                      }
                    }}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    {item.title}
                  
                    {/* Show arrow ONLY if dropdownItems exist */}
                    {item.dropdownItems.length > 0 && (
                      <svg
                        className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  {/* Smooth Dropdown */}
                  <div
                    className={`origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out transform ${
                      activeDropdown === item.title
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="py-1" role="menu">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 transition-colors duration-150"
                          role="menuitem"
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* CTA Button for Desktop */}
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-400 hover:text-white focus:outline-none p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Mobile Menu Panel */}
      <div
        // --- CHANGED SECTION ---
        // Replaced 'max-h-96' with 'max-h-screen'
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <div key={item.title} className="px-2">
            <div className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-slate-700">
              <span className="text-gray-300 text-base font-medium">{item.title}</span>

              {/* Only show arrow if dropdown exists */}
              {item.dropdownItems.length > 0 && (
                <button
                  onClick={() => toggleDropdown(item.title)}
                  className="text-gray-300 hover:text-white focus:outline-none p-1"
                >
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      activeDropdown === item.title ? 'rotate-180' : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
              {activeDropdown === item.title && (
                 <div className="pl-4 pr-2 py-2 space-y-1 max-h-60 overflow-y-auto">
                  {item.dropdownItems.map((dropdownItem) => (
                    <a
                      key={dropdownItem}
                      href="#"
                      className="text-gray-400 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      {dropdownItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* CTA Button for Mobile */}
          <div className="px-2 pt-4 border-t border-slate-700">
            <a
              href="#"
              className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;