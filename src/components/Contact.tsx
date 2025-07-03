import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Contact Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Get in touch with our team for reservations, inquiries, or to plan your perfect safari experience. 
            We're here to help make your Masai Mara adventure unforgettable.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-amber-600 rounded-lg p-2 sm:p-3 flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Phone</h4>
                    <p className="text-gray-600 text-sm sm:text-base">+254 123 456 789</p>
                    <p className="text-gray-600 text-sm sm:text-base">+254 987 654 321</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-amber-600 rounded-lg p-2 sm:p-3 flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h4>
                    <p className="text-gray-600 text-sm sm:text-base break-all">info@talekbushcamp.com</p>
                    <p className="text-gray-600 text-sm sm:text-base break-all">reservations@talekbushcamp.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-amber-600 rounded-lg p-2 sm:p-3 flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Location</h4>
                    <p className="text-gray-600 text-sm sm:text-base">Talek Gate, Masai Mara</p>
                    <p className="text-gray-600 text-sm sm:text-base">Talek, Kenya</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      16km from Ol Kiombo Airport
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-amber-600 rounded-lg p-2 sm:p-3 flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Reception Hours</h4>
                    <p className="text-gray-600 text-sm sm:text-base">24/7 Reception</p>
                    <p className="text-gray-600 text-sm sm:text-base">Check-in: Anytime</p>
                    <p className="text-gray-600 text-sm sm:text-base">Check-out: Until 14:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Languages Spoken</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">English</span>
                  <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Swahili</span>
                  <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Arabic</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              <form className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="information">General Information</option>
                    <option value="safari">Safari Arrangements</option>
                    <option value="transport">Airport Transfer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base resize-none"
                    placeholder="Tell us about your travel plans, questions, or special requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation"
                >
                  <MessageCircle className="h-5 w-5 inline mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 bg-amber-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Management Team
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="bg-amber-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-4">
                A
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Abdul</h4>
              <p className="text-gray-600 text-sm sm:text-base">Camp Manager</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Specializes in safari arrangements and guest transfers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-4">
                M
              </div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Mustafa</h4>
              <p className="text-gray-600 text-sm sm:text-base">Host Manager</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Ensures exceptional guest experiences and comfort
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;