import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Bushcamp4 from "../assets/bushcamp4.jpg"
import Bushcamp7 from "../assets/bushcamp7.jpg"
import Bushcamp10 from "../assets/bushcamp10.jpg"
import Bushcamp17 from "../assets/bushcamp17.jpg"
import Bushcamp19 from "../assets/bushcamp19.jpg"
import Bushcamp20 from "../assets/bushcamp20.jpg"
import Bushcamp23 from "../assets/bushcamp23.jpg"
import Bushcamp25 from "../assets/bushcamp25.jpg"
import Bushcamp26 from "../assets/bushcamp26.jpg"
import AnimatedSection from './AnimatedSection';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: Bushcamp26,
      alt: 'Masai Mara landscape with acacia trees'
    },
    {
      src: Bushcamp4,
      alt: 'Elephants near safari camp'
    },
    {
      src: Bushcamp7,
      alt: 'Safari tent accommodation'
    },
    {
      src: Bushcamp10,
      alt: 'Cottage accommodation'
    },
    {
      src: Bushcamp17,
      alt: 'Family room interior'
    },
    {
      src: Bushcamp19,
      alt: 'African wildlife - Lions'
    },
    {
      src: Bushcamp20,
      alt: 'Gazelle in the wild'
    },
    {
      src: Bushcamp25,
      alt: 'Elephants at watering hole'
    },
    {
      src: Bushcamp23,
      alt: 'Masai Mara sunset'
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev === null ? 0 : (prev + 1) % images.length));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedImage(null);
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Gallery
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Discover the beauty of Masai Mara through our collection of stunning photographs 
              showcasing wildlife, accommodations, and the breathtaking African landscape.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {images.map((image, index) => (
            <AnimatedSection key={index} animation="scaleUp" delay={index * 100}>
              <div
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    View Image
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="relative max-w-4xl max-h-full w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
              >
                <X className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors touch-manipulation"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain mx-auto"
              />
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                <p className="text-sm sm:text-base bg-black/50 px-3 py-1 rounded-full">
                  {selectedImage + 1} of {images.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;