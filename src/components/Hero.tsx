import { Star, MapPin, Wifi, Car, Utensils, Shield } from 'lucide-react';

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
        <img
          src="https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt="Masai Mara landscape with acacia trees"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-20">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white text-lg sm:text-xl font-semibold">9.3/10 Superb</span>
              <span className="text-gray-300 text-sm sm:text-base">(243 reviews)</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-base sm:text-lg">Excellent Location - 9.8/10</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base">Talek Gate, Masai Mara, Kenya</p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Talek Bush Camp
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Experience Masai Mara the way it should be! In the wild bushes at the heart of the great Masai Mara, 
            surrounded by the National Park & Natural Conservancies.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 px-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2">
              <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-white text-sm sm:text-base">Free WiFi</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2">
              <Car className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-white text-sm sm:text-base">Free Parking</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2">
              <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-white text-sm sm:text-base">Restaurant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-white text-sm sm:text-base">24/7 Security</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={scrollToBooking}
              className="bg-amber-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 touch-manipulation"
            >
              Learn More
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">300m</h3>
              <p className="text-gray-300 text-sm sm:text-base">From Talek Gate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">16km</h3>
              <p className="text-gray-300 text-sm sm:text-base">From Ol Kiombo Airport</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">1km</h3>
              <p className="text-gray-300 text-sm sm:text-base">From Masai Mara Reserve</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;