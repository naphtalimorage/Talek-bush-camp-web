import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin, Clock, Plus, Minus, Shield as Child, User } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    accommodation: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  const accommodationPrices = {
    tent: { base: 120, adult: 40, child: 20 },
    cottage: { base: 150, adult: 50, child: 25 },
    family: { base: 250, adult: 60, child: 30 }
  };

  useEffect(() => {
    if (formData.checkIn && formData.checkOut && formData.accommodation) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (nightCount > 0) {
        setNights(nightCount);
        const accommodation = accommodationPrices[formData.accommodation as keyof typeof accommodationPrices];
        if (accommodation) {
          const basePrice = accommodation.base;
          const additionalAdults = Math.max(0, formData.adults - 2);
          const additionalAdultCost = additionalAdults * accommodation.adult;
          const childrenCost = formData.children * accommodation.child;
          const dailyTotal = basePrice + additionalAdultCost + childrenCost;
          setTotalPrice(dailyTotal * nightCount);
        }
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    } else {
      setNights(0);
      setTotalPrice(0);
    }
  }, [formData.checkIn, formData.checkOut, formData.adults, formData.children, formData.accommodation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', { ...formData, totalPrice, nights });
    alert(`Thank you for your booking request! 
    
Total: $${totalPrice} for ${nights} night${nights !== 1 ? 's' : ''}
Guests: ${formData.adults} adult${formData.adults !== 1 ? 's' : ''} ${formData.children > 0 ? `+ ${formData.children} child${formData.children !== 1 ? 'ren' : ''}` : ''}

We will contact you soon to confirm your reservation.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateGuestCount = (type: 'adults' | 'children', operation: 'add' | 'subtract') => {
    setFormData(prev => {
      const current = prev[type];
      let newValue = current;
      
      if (operation === 'add') {
        newValue = type === 'adults' ? Math.min(current + 1, 10) : Math.min(current + 1, 8);
      } else {
        newValue = type === 'adults' ? Math.max(current - 1, 1) : Math.max(current - 1, 0);
      }
      
      return { ...prev, [type]: newValue };
    });
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Book Your Safari Experience
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Reserve your stay at Talek Bush Camp and experience the magic of Masai Mara. 
            Our team will contact you to confirm your booking and arrange all details.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                  />
                </div>

                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              {/* Guest Selection */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <User className="h-4 w-4 inline mr-2" />
                    Adults
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <button
                      type="button"
                      onClick={() => updateGuestCount('adults', 'subtract')}
                      className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                      disabled={formData.adults <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-semibold px-4">{formData.adults}</span>
                    <button
                      type="button"
                      onClick={() => updateGuestCount('adults', 'add')}
                      className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                      disabled={formData.adults >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Child className="h-4 w-4 inline mr-2" />
                    Children (0-12 years)
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <button
                      type="button"
                      onClick={() => updateGuestCount('children', 'subtract')}
                      className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                      disabled={formData.children <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg font-semibold px-4">{formData.children}</span>
                    <button
                      type="button"
                      onClick={() => updateGuestCount('children', 'add')}
                      className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                      disabled={formData.children >= 8}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Accommodation Selection */}
              <div>
                <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Accommodation Type
                </label>
                <select
                  id="accommodation"
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                >
                  <option value="">Select accommodation</option>
                  <option value="tent">Safari Tent - From $120/night (up to 2 guests)</option>
                  <option value="cottage">Cottage - From $150/night (up to 2 guests)</option>
                  <option value="family">Family Room - From $250/night (up to 4 guests)</option>
                </select>
              </div>

              {/* Price Display */}
              {totalPrice > 0 && (
                <div className="bg-amber-50 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg">Booking Summary</h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{nights} night{nights !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span>{formData.adults} adult{formData.adults !== 1 ? 's' : ''} {formData.children > 0 ? `+ ${formData.children} child${formData.children !== 1 ? 'ren' : ''}` : ''}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold text-amber-600">
                        <span>Total Price:</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                />
              </div>

              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base resize-none"
                  placeholder="Airport transfers, dietary requirements, game drive preferences, etc."
                />
              </div>

              <div className="bg-amber-50 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  <Clock className="h-5 w-5 inline mr-2" />
                  Important Information
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Check-in: Available 24 hours (advance notice required)</li>
                  <li>• Check-out: Until 14:00</li>
                  <li>• Airport transfers available (additional charge)</li>
                  <li>• Game drives and cultural tours can be arranged</li>
                  <li>• Free cancellation up to 24 hours before arrival</li>
                  <li>• Payment accepted: Visa, Mastercard, Cash, M-Pesa</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation"
              >
                Submit Booking Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;