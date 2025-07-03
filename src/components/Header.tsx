import React, { useState } from 'react';
import { MapPin, Phone, Mail, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Talek Bush Camp</h1>
              <p className="text-xs sm:text-sm text-gray-600">Masai Mara, Kenya</p>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Accommodations
            </button>
            <button onClick={() => scrollToSection('security')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Security
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Gallery
            </button>
            <button onClick={() => scrollToSection('booking')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Book Now
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Contact
            </button>
          </nav>

          <div className="hidden xl:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>+254 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>info@talekbushcamp.com</span>
            </div>
          </div>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                Accommodations
              </button>
              <button onClick={() => scrollToSection('security')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                Security
              </button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection('booking')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                Book Now
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
                Contact
              </button>
              
              <div className="px-3 py-3 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4" />
                  <span>+254 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>info@talekbushcamp.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;