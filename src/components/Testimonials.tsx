import React from 'react';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Frédéric',
      country: 'France',
      rating: 5,
      text: 'The camp is next to the park. Seeing animals in the Camp. Friendly manager and staffs. Good breakfast and meals. Fantastic Safaris organized by the camp. Everything was perfect.'
    },
    {
      name: 'Jordán',
      country: 'Hungary',
      rating: 5,
      text: 'Wonderful location! The canteen is simple but the foods are so nice and delicious!!! You never stay hungry here.'
    },
    {
      name: 'Walter',
      country: 'India',
      rating: 5,
      text: 'Property was wonderful, stay was comfortable. staff was cordial & helpful.'
    },
    {
      name: 'Annie',
      country: 'India',
      rating: 5,
      text: 'The property was amazing. The host Mustafa was really kind. Even the staff Valentine & chef Joel were superb. The food was yum.'
    },
    {
      name: 'Matjaz',
      country: 'Slovenia',
      rating: 5,
      text: 'They have guards, owner is kind, the whole staff are kind. We have the best experience in the tent, everything was perfect, they organised game drives, masai village.... one of the best experience.'
    },
    {
      name: 'Eva',
      country: 'Slovakia',
      rating: 5,
      text: 'I never been in camp that feel safe and wild at one time. We loved our masais guards Simon and Mdokon who take care of us and we got the chance to learn something about kenyas environment.'
    },
    {
      name: 'Patricia',
      country: 'Ireland',
      rating: 5,
      text: 'Epic stay at Talek! Really feels like you\'re in the wilds of Africa surrounded by nature! We had a full day Safari which was one of the best days ever!'
    },
    {
      name: 'Stewart',
      country: 'Brazil',
      rating: 5,
      text: 'Abdul, the manager, organised everything for us. From the transfer in Nairobi to the tours in the park and transfer back. The tent was very comfortable.'
    },
    {
      name: 'Anja',
      country: 'Germany',
      rating: 5,
      text: 'The Location near the gate was Great and you always felt safe around camp. Safari was the best I have had so far. Prices are also reasonable.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              What Our Guests Say
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">9.3/10</span>
              <span className="text-gray-600 text-sm sm:text-base">from 243 reviews</span>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Real guests, real stays, real opinions. See what travelers from around the world 
              have to say about their experience at Talek Bush Camp.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="slideUp" delay={index * 100}>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mr-3 flex-shrink-0" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 italic leading-relaxed text-sm sm:text-base">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.country}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="slideUp" delay={400}>
          <div className="mt-12 bg-amber-50 rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Guest Satisfaction Ratings
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600">9.7</p>
                <p className="text-gray-600 text-sm sm:text-base">Staff</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600">9.8</p>
                <p className="text-gray-600 text-sm sm:text-base">Location</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600">9.4</p>
                <p className="text-gray-600 text-sm sm:text-base">Comfort</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600">9.3</p>
                <p className="text-gray-600 text-sm sm:text-base">Cleanliness</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Testimonials;