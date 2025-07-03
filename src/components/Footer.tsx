import React from 'react';
import { MapPin, Phone, Mail, Star, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Talek Bush Camp</h3>
                <p className="text-gray-400 text-sm sm:text-base">Masai Mara, Kenya</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Experience the wild beauty of Masai Mara with authentic accommodations 
              and exceptional service in the heart of Africa's greatest wildlife reserve.
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-sm sm:text-base">9.3/10</span>
              <span className="text-gray-400 text-xs sm:text-sm">(243 reviews)</span>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Accommodations</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book Now</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Safari Game Drives</li>
              <li>Airport Transfers</li>
              <li>Maasai Village Tours</li>
              <li>Cultural Experiences</li>
              <li>Photography Safaris</li>
              <li>Restaurant & Dining</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+254 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">info@talekbushcamp.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Talek Gate, Masai Mara, Kenya</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-sm sm:text-base">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm sm:text-base text-center md:text-left">
              © 2024 Talek Bush Camp. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;