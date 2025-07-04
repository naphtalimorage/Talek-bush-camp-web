import  { useState, useEffect, useMemo } from 'react';
import {  Phone, Mail, Menu, X } from 'lucide-react';
import Logo from "../assets/Talek-Logo.webp"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navigationItems = useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Accommodations' },
    { id: 'security', label: 'Security' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'booking', label: 'Book Now' },
    { id: 'contact', label: 'Contact' }
  ], []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-1">
            <img src={Logo} alt="Talek Bush Camp Logo"  className="h-10 w-10 sm:h-14 sm:w-14 "/>
            <div>
              <h1 className="text-lg sm:text-sm font-bold text-gray-900">Talek Bush Camp</h1>
              <p className="text-xs sm:text-xm text-gray-600">Masai Mara, Kenya</p>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative font-medium transition-all duration-300 ${
                  isActive(item.id)
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {item.label}
                {isActive(item.id) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full transition-all duration-300"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="hidden xl:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>+254 741 219 994</span>
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
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-3 rounded-md transition-all duration-300 ${
                    isActive(item.id)
                      ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {isActive(item.id) && (
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}

              <div className="px-3 py-3 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Phone className="h-4 w-4" />
                  <span>+254 741 219 994</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>info@wildwonderskenya.com</span>
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
