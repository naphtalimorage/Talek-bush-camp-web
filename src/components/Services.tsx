import React from 'react';
import { Bed, Users, Wifi, Car, Utensils, ShieldCheck, TreePine, Waves } from 'lucide-react';

const Services = () => {
  const accommodations = [
    {
      name: 'Safari Tent',
      beds: '1 Single bed + 1 Extra-large double bed',
      capacity: 3,
      price: 'From $120/night',
      image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      features: ['Private bathroom', 'Garden view', 'Mosquito net', 'Free WiFi'],
      description: 'Authentic safari experience with comfort and nature views'
    },
    {
      name: 'Cottage',
      beds: '1 Single bed + 1 Extra-large double bed',
      capacity: 3,
      price: 'From $150/night',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      features: ['Private bathroom', 'Balcony', 'Work desk', 'Seating area'],
      description: 'Comfortable cottage with modern amenities and private balcony'
    },
    {
      name: 'Family Room',
      beds: '2 Single beds + 2 Extra-large double beds',
      capacity: 6,
      price: 'From $250/night',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
      features: ['Private bathroom', 'Garden view', 'Family-friendly', 'Extra space'],
      description: 'Spacious family accommodation perfect for larger groups'
    }
  ];

  const facilities = [
    { icon: Utensils, title: 'Restaurant', description: 'African, Asian & European cuisine with dietary options' },
    { icon: Wifi, title: 'Free WiFi', description: 'Basic 6 Mbps throughout the camp' },
    { icon: Car, title: 'Free Parking', description: 'Private parking available on-site' },
    { icon: ShieldCheck, title: '24/7 Security', description: 'Professional guards including Maasai security' },
    { icon: TreePine, title: 'Garden & Terrace', description: 'Sun terrace, garden, and outdoor seating areas' },
    { icon: Waves, title: 'Swimming Pool', description: 'Outdoor swimming pool for relaxation' }
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Accommodations & Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Choose from our comfortable accommodations, each designed to provide you with 
            the perfect blend of comfort and authentic safari experience.
          </p>
        </div>

        {/* Accommodations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {accommodations.map((room, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="relative">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Up to {room.capacity} guests
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Bed className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{room.beds}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Up to {room.capacity} guests</span>
                </div>
                
                <div className="space-y-2 mb-4">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <span className="text-xl sm:text-2xl font-bold text-amber-600">{room.price}</span>
                  <button 
                    onClick={scrollToBooking}
                    className="w-full sm:w-auto bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Camp Facilities & Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <div className="bg-amber-100 rounded-lg p-2 sm:p-3 flex-shrink-0">
                  <facility.icon className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{facility.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-amber-50 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-3 text-base sm:text-lg">Additional Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-gray-600">
              <div>• Airport shuttle service</div>
              <div>• Game drive arrangements</div>
              <div>• Maasai village tours</div>
              <div>• Laundry service</div>
              <div>• Currency exchange</div>
              <div>• Tour desk assistance</div>
              <div>• Packed lunches</div>
              <div>• Cultural experiences</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;