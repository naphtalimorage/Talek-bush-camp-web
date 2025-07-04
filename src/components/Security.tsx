import MaasaiWorriors from "../assets/worrirs.jpeg"
import { Shield, Eye, Users, Clock, Phone, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: '24/7 Maasai Guards',
      description: 'Professional Maasai security guards Simon and Mdokon provide round-the-clock protection',
      details: ['Traditional Maasai warriors', 'Expert knowledge of local wildlife', 'Fluent in English and Swahili', 'Armed with traditional weapons']
    },
    {
      icon: Eye,
      title: 'Perimeter Monitoring',
      description: 'Continuous surveillance of camp boundaries to ensure guest safety',
      details: ['Strategic guard posts', 'Wildlife movement tracking', 'Early warning systems', 'Night vision equipment']
    },
    {
      icon: Users,
      title: 'Escort Services',
      description: 'Guided movement within camp premises, especially during night hours',
      details: ['Tent-to-restaurant escorts', 'Bathroom facility guidance', 'Emergency evacuation routes', 'Wildlife encounter protocols']
    },
    {
      icon: Clock,
      title: 'Emergency Response',
      description: 'Immediate response team available for any security or medical emergencies',
      details: ['First aid trained staff', 'Direct communication with park rangers', 'Medical evacuation procedures', 'Emergency contact protocols']
    }
  ];

  const safetyMeasures = [
    { icon: CheckCircle, text: 'Secure perimeter fencing around accommodation areas' },
    { icon: CheckCircle, text: 'Emergency communication devices in all rooms' },
    { icon: CheckCircle, text: 'Wildlife-proof food storage and waste management' },
    { icon: CheckCircle, text: 'Regular safety briefings for all guests' },
    { icon: CheckCircle, text: 'Trained staff in wildlife behavior and safety protocols' },
    { icon: CheckCircle, text: 'Emergency medical kit and trained first aid personnel' },
    { icon: CheckCircle, text: 'Direct radio contact with Kenya Wildlife Service' },
    { icon: CheckCircle, text: 'Safe room protocols for extreme weather conditions' }
  ];

  return (
    <section id="security" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                Your Safety is Our Priority
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Experience the wild beauty of Masai Mara with complete peace of mind. Our comprehensive 
              security measures ensure you can focus on creating unforgettable memories.
            </p>
          </div>
        </AnimatedSection>

        {/* Security Team Highlight */}
        <AnimatedSection animation="slideUp" delay={200}>
          <div className="bg-amber-600 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Meet Our Maasai Security Team
                </h3>
                <p className="text-amber-100 mb-6 text-base sm:text-lg">
                  Our experienced Maasai guards Simon and Mdokon bring generations of traditional 
                  knowledge and modern security training to protect our guests.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="bg-white text-amber-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                      S
                    </div>
                    <h4 className="font-semibold text-white mb-1">Simon</h4>
                    <p className="text-amber-100 text-sm">Senior Maasai Guard</p>
                    <p className="text-amber-100 text-xs mt-2">15+ years experience</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="bg-white text-amber-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mb-3">
                      M
                    </div>
                    <h4 className="font-semibold text-white mb-1">Mdokon</h4>
                    <p className="text-amber-100 text-sm">Maasai Security Specialist</p>
                    <p className="text-amber-100 text-xs mt-2">12+ years experience</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={MaasaiWorriors}
                  alt="Maasai warriors in traditional attire"
                  className="rounded-lg shadow-lg w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    Traditional Maasai warriors ensuring your safety
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Security Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {securityFeatures.map((feature, index) => (
            <AnimatedSection key={index} animation="slideUp" delay={index * 150}>
              <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors shadow-lg">
                <div className="bg-amber-600 rounded-lg p-3 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Safety Measures */}
        <AnimatedSection animation="slideUp">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              Comprehensive Safety Measures
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {safetyMeasures.map((measure, index) => (
                <AnimatedSection key={index} animation="slideUp" delay={index * 100}>
                  <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                    <measure.icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{measure.text}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Emergency Protocols */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <AnimatedSection animation="slideLeft">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 sm:p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold text-red-700">Emergency Protocols</h3>
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Wildlife Encounters</h4>
                  <p>Immediate escort to safe areas, wildlife deterrent procedures, and ranger communication.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Medical Emergencies</h4>
                  <p>On-site first aid, helicopter evacuation coordination, and hospital transfer arrangements.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Severe Weather</h4>
                  <p>Safe room protocols, weather monitoring, and guest relocation procedures.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideRight">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 sm:p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-700">24/7 Emergency Contacts</h3>
              </div>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span>Camp Security:</span>
                  <span className="font-mono text-gray-900">*911</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Medical Emergency:</span>
                  <span className="font-mono text-gray-900">*999</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kenya Wildlife Service:</span>
                  <span className="font-mono text-gray-900">*800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Camp Management:</span>
                  <span className="font-mono text-gray-900">+254 123 456 789</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-100 rounded-lg">
                <p className="text-xs text-green-800">
                  Emergency buttons are installed in all accommodation units for immediate assistance.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Security Certification */}
        <AnimatedSection animation="scaleUp" delay={400}>
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 inline-block shadow-lg">
              <Lock className="h-8 w-8 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Security Certified</h3>
              <p className="text-gray-600 text-sm max-w-md">
                Our security protocols are approved by Kenya Wildlife Service and meet international 
                safari camp safety standards.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Security;