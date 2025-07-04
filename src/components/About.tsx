import { MapPin, Users, Heart, Award } from 'lucide-react';
import Bushcamp8 from "../assets/bushcamp8.jpg"
import AnimatedSection from './AnimatedSection';

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              About Talek Bush Camp
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Located at the heart of Masai Mara, our camp offers an authentic safari experience 
              with unparalleled wildlife viewing opportunities right at your doorstep.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <AnimatedSection animation="slideLeft" delay={200} className="order-2 lg:order-1">
            <img
              src={Bushcamp8}
              alt="Safari tent with elephants in background"
              className="rounded-lg shadow-lg w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </AnimatedSection>
          
          <AnimatedSection animation="slideRight" delay={400} className="order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Experience the Wild Like Never Before
            </h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              At Talek Bush Camp, we believe in providing an authentic African safari experience. 
              Our camp is strategically located just 300 meters from the famous Talek Gate, 
              making us the perfect base for exploring the wonders of Masai Mara National Reserve.
            </p>
            <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
              With our experienced team led by managers Abdul and Mustafa, along with our skilled 
              staff including Valentine, chef Joel, and our trusted Maasai guards Simon and Mdokon, 
              we ensure every guest feels safe, comfortable, and immersed in the natural beauty of Kenya.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">9.3/10 Rating</p>
                  <p className="text-xs sm:text-sm text-gray-600">243 Reviews</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Prime Location</p>
                  <p className="text-xs sm:text-sm text-gray-600">9.8/10 Location Score</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatedSection animation="slideUp" delay={200}>
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow">
              <Users className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Expert Staff</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our experienced team, including local Maasai guides, ensures your safety and provides 
                authentic cultural experiences throughout your stay.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={400}>
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow">
              <Heart className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Wildlife Experience</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Wake up to elephants grazing outside your tent and experience the thrill of being 
                surrounded by Africa's Big Five in their natural habitat.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideUp" delay={600} className="sm:col-span-2 lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow">
              <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Perfect Location</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Just 300m from Talek Gate and 1km from Masai Mara National Reserve, offering 
                unmatched access to the world's greatest wildlife spectacle.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;