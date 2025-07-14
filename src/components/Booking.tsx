import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Minus, Shield as Child, User, CreditCard, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import Bushcamp6 from "../assets/bushcamp6.jpg";
import AnimatedSection from './AnimatedSection';

// Types for the booking flow
interface SearchFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  pricePerNight: number;
  totalPrice: number;
  maxGuests: number;
  amenities: string[];
  images: string;
  cancellationPolicy: string;
}

interface TravelerDetails {
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface PaymentDetails {
  method: string;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

interface BookingDetails {
  propertyId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  travelerDetails: TravelerDetails;
  paymentDetails: PaymentDetails;
  totalPrice: number;
  nights: number;
}

interface BookingConfirmation {
  bookingId: string;
  status: 'confirmed' | 'pending';
  propertyDetails: {
    name: string;
    address: string;
    contactInfo: string;
  };
}

const Booking = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // State to track the current step in the booking flow
  const [currentStep, setCurrentStep] = useState<number>(1);

  // State for each step of the booking process
  // Set default dates to current date and next day
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [searchData, setSearchData] = useState<SearchFormData>({
    checkIn: formatDate(today),
    checkOut: formatDate(tomorrow),
    adults: 2,
    children: 0
  });


  const [availableRooms, setAvailableRooms] = useState<RoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const [travelerDetails, setTravelerDetails] = useState<TravelerDetails>({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    method: 'credit_card'
  });

  const [bookingPreview, setBookingPreview] = useState<BookingDetails | null>(null);
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingConfirmation | null>(null);

  // Define selectedProperty state with default values
  const [selectedProperty, setSelectedProperty] = useState({
    id: 'property1',
    name: 'Talek Bush Camp',
    location: 'Masai Mara, Kenya',
    description: 'Luxury tented camp in the heart of Masai Mara',
    price: 0,
    rating: 4.5
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication before proceeding with booking
  const checkAuthAndProceed = () => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Continue with the booking flow
  };

  // Calculate nights between check-in and check-out
  const [nights, setNights] = useState<number>(0);

  useEffect(() => {
    if (searchData.checkIn && searchData.checkOut) {
      const checkInDate = new Date(searchData.checkIn);
      const checkOutDate = new Date(searchData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (nightCount > 0) {
        setNights(nightCount);
        // Fetch available rooms whenever dates change and are valid
        getPropertyAvailability();
      } else {
        setNights(0);
      }
    } else {
      setNights(0);
    }
  }, [searchData.checkIn, searchData.checkOut]);

  // Mock API calls (in a real app, these would be actual API calls)
  const getPropertyAvailability = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to accommodation/availability
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response data
      const mockRooms: RoomType[] = [
        {
          id: 'room1',
          name: 'Standard Safari Tent',
          description: 'Comfortable tent with queen bed and en-suite bathroom',
          price: 120 * nights,
          pricePerNight: 120,
          totalPrice: 120 * nights,
          maxGuests: 2,
          amenities: ['En-suite bathroom', 'Hot water', 'Mosquito nets'],
          images: Bushcamp6,
          cancellationPolicy: 'Free cancellation up to 24 hours before arrival'
        },
        {
          id: 'room2',
          name: 'Deluxe Safari Tent',
          description: 'Spacious tent with king bed and private veranda',
          price: 180 * nights,
          pricePerNight: 180,
          totalPrice: 180 * nights,
          maxGuests: 2,
          amenities: ['En-suite bathroom', 'Hot water', 'Mosquito nets', 'Private veranda'],
          images: Bushcamp6,
          cancellationPolicy: 'Free cancellation up to 24 hours before arrival'
        }
      ];

      setAvailableRooms(mockRooms);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Failed to get property availability. Please try again.');
      setLoading(false);
    }
  };


  const getBookingPreview = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to order/preview
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedRoom) {
        const preview: BookingDetails = {
          propertyId: selectedProperty.id,
          roomId: selectedRoom.id,
          checkIn: searchData.checkIn,
          checkOut: searchData.checkOut,
          adults: searchData.adults,
          children: searchData.children,
          travelerDetails: travelerDetails,
          paymentDetails: paymentDetails,
          totalPrice: selectedRoom.totalPrice,
          nights: nights
        };

        setBookingPreview(preview);
      }

      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Failed to get booking preview. Please try again.');
      setLoading(false);
    }
  };

  const createBooking = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to order/create
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock response data
      const confirmation: BookingConfirmation = {
        bookingId: 'BK' + Math.floor(Math.random() * 10000),
        status: 'confirmed',
        propertyDetails: {
          name: selectedProperty.name,
          address: selectedProperty.location,
          contactInfo: 'info@talekbushcamp.com | +254 123 456 789'
        }
      };

      setBookingConfirmation(confirmation);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Failed to create booking. Please try again.');
      setLoading(false);
    }
  };

  // Handle form changes for each step
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const updateGuestCount = (type: 'adults' | 'children', operation: 'add' | 'subtract') => {
    setSearchData(prev => {
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

  // Handle traveler details form changes
  const handleTravelerDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTravelerDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle payment details form changes
  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle step navigation
  const goToNextStep = () => {
    // Check authentication before proceeding
    if (!checkAuthAndProceed()) {
      return;
    }

    if (currentStep === 1) {
      // Validate search form, room selection, and traveler details
      if (!searchData.checkIn || !searchData.checkOut) {
        setError('Please select check-in and check-out dates');
        return;
      }

      if (!selectedRoom) {
        setError('Please select a room');
        return;
      }

      if (!travelerDetails.name || !travelerDetails.email || !travelerDetails.phone) {
        setError('Please fill in all required traveler details');
        return;
      }

      // Get booking preview and proceed directly to payment/booking step
      getBookingPreview();
      setCurrentStep(4);
      return;
    } else if (currentStep === 4) {
      // Create the booking
      createBooking();
      setCurrentStep(5);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const goToPreviousStep = () => {
    if (currentStep === 4) {
      // From payment step, go back to selection step
      setCurrentStep(1);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  // Render step indicators
  const renderStepIndicators = () => {
    const steps = [
      { number: 1, name: 'Select & Book', icon: <Calendar className="h-5 w-5" /> },
      { number: 4, name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
      { number: 5, name: 'Confirmation', icon: <Check className="h-5 w-5" /> }
    ];

    return (
      <div className="flex justify-between items-center mb-8 px-2">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= step.number 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.icon}
            </div>
            <span className={`text-xs font-medium ${
              currentStep >= step.number ? 'text-amber-600' : 'text-gray-500'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`hidden sm:block h-0.5 w-16 mt-5 ${
                currentStep > step.number ? 'bg-amber-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render search step with integrated room selection
  const renderSearchStep = () => {
    return (
      <div className="space-y-6">
        {/* Date and Guest Selection Section */}
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="font-semibold text-lg mb-4">Select Dates & Guests</h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Check-in Date
              </label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={searchData.checkIn}
                onChange={handleSearchChange}
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
                value={searchData.checkOut}
                onChange={handleSearchChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
              />
            </div>
          </div>

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
                  disabled={searchData.adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-semibold px-4">{searchData.adults}</span>
                <button
                  type="button"
                  onClick={() => updateGuestCount('adults', 'add')}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                  disabled={searchData.adults >= 10}
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
                  disabled={searchData.children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-semibold px-4">{searchData.children}</span>
                <button
                  type="button"
                  onClick={() => updateGuestCount('children', 'add')}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                  disabled={searchData.children >= 8}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {searchData.checkIn && searchData.checkOut && nights > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              <p>Stay duration: <span className="font-semibold">{nights} night{nights !== 1 ? 's' : ''}</span></p>
            </div>
          )}
        </div>

        {/* Available Rooms Section */}
        {searchData.checkIn && searchData.checkOut && nights > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-xl">Available Room Types</h3>
              {loading && (
                <div className="flex items-center text-amber-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-amber-600 mr-2"></div>
                  <span className="text-sm">Updating...</span>
                </div>
              )}
            </div>

            {!loading && availableRooms.length === 0 ? (
              <div className="text-center py-8 border rounded-lg bg-gray-50">
                <p className="text-gray-500">No rooms available for the selected dates.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {availableRooms.map(room => (
                  <div 
                    key={room.id} 
                    className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                      selectedRoom?.id === room.id ? 'border-amber-500 ring-2 ring-amber-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-gray-100 h-48 sm:h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          [Room Image]
                        </div>
                      </div>
                      <div className="p-4 sm:col-span-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold">{room.name}</h4>
                          <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
                            ${room.pricePerNight}/night
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{room.description}</p>
                        <div className="mb-3">
                          <span className="text-sm text-gray-600">Max guests: {room.maxGuests}</span>
                        </div>
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h5>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map(amenity => (
                              <span key={amenity} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mb-3">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Cancellation Policy:</h5>
                          <p className="text-sm text-gray-600">{room.cancellationPolicy}</p>
                        </div>
                        <div className="flex justify-between items-center border-t pt-3">
                          <div className="text-lg font-bold text-amber-600">
                            Total: ${room.totalPrice}
                            <span className="text-sm font-normal text-gray-500 ml-1">
                              for {nights} night{nights !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <button 
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              selectedRoom?.id === room.id 
                                ? 'bg-amber-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedRoom(room)}
                          >
                            {selectedRoom?.id === room.id ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Traveler Information Section - Only show when a room is selected */}
        {selectedRoom && (
          <div className="mt-6 border rounded-lg p-6 bg-white">
            <h3 className="font-semibold text-xl mb-4">Traveler Information</h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={travelerDetails.name}
                    onChange={handleTravelerDetailsChange}
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
                    value={travelerDetails.email}
                    onChange={handleTravelerDetailsChange}
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
                  value={travelerDetails.phone}
                  onChange={handleTravelerDetailsChange}
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
                  value={travelerDetails.specialRequests}
                  onChange={handleTravelerDetailsChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base resize-none"
                  placeholder="Airport transfers, dietary requirements, etc."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // // Render look step (property availability)
  // const renderLookStep = () => {
  //   return (
  //     <div className="space-y-6">
  //       <div className="bg-amber-50 rounded-lg p-4 mb-6">
  //         <h3 className="font-semibold text-gray-900 mb-2">Your Search</h3>
  //         <div className="grid grid-cols-2 gap-2 text-sm">
  //           <div><span className="font-medium">Destination:</span> {searchData.destination}</div>
  //           <div><span className="font-medium">Dates:</span> {searchData.checkIn} to {searchData.checkOut}</div>
  //           <div><span className="font-medium">Guests:</span> {searchData.adults} adults, {searchData.children} children</div>
  //           <div><span className="font-medium">Duration:</span> {nights} nights</div>
  //         </div>
  //       </div>
  //
  //       <h3 className="font-semibold text-xl mb-4">Available Properties</h3>
  //
  //       {searchResults.length === 0 ? (
  //         <div className="text-center py-8">
  //           <p className="text-gray-500">No properties found matching your criteria.</p>
  //         </div>
  //       ) : (
  //         <div className="space-y-4">
  //           {searchResults.map(property => (
  //             <div
  //               key={property.id}
  //               className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
  //                 selectedProperty?.id === property.id ? 'border-amber-500 ring-2 ring-amber-500' : 'border-gray-200'
  //               }`}
  //               onClick={() => setSelectedProperty(property)}
  //             >
  //               <div className="grid sm:grid-cols-3 gap-4">
  //                 <div className="bg-gray-100 h-48 sm:h-full flex items-center justify-center">
  //                   <div className="text-center text-gray-400">
  //                     [Property Image]
  //                   </div>
  //                 </div>
  //                 <div className="p-4 sm:col-span-2">
  //                   <div className="flex justify-between items-start">
  //                     <h4 className="text-lg font-semibold">{property.name}</h4>
  //                     <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
  //                       ${property.price}/night
  //                     </div>
  //                   </div>
  //                   <p className="text-gray-500 text-sm mb-2">{property.location}</p>
  //                   <p className="text-gray-700 mb-4">{property.description}</p>
  //                   <div className="flex justify-between items-center">
  //                     <div className="flex items-center">
  //                       <span className="text-amber-500">★★★★</span>
  //                       <span className="text-gray-400">★</span>
  //                       <span className="ml-1 text-sm text-gray-600">{property.rating}/5</span>
  //                     </div>
  //                     <button
  //                       className={`px-4 py-2 rounded-lg text-sm font-medium ${
  //                         selectedProperty?.id === property.id
  //                           ? 'bg-amber-600 text-white'
  //                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  //                       }`}
  //                       onClick={() => setSelectedProperty(property)}
  //                     >
  //                       {selectedProperty?.id === property.id ? 'Selected' : 'Select'}
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // // Render preview step (room selection and details)
  // const renderPreviewStep = () => {
  //   return (
  //     <div className="space-y-6">
  //       <div className="bg-amber-50 rounded-lg p-4 mb-6">
  //         <h3 className="font-semibold text-gray-900 mb-2">Your Stay at Talek Bush Camp</h3>
  //         <div className="grid grid-cols-2 gap-2 text-sm">
  //           <div><span className="font-medium">Property:</span> {selectedProperty.name}</div>
  //           <div><span className="font-medium">Location:</span> {selectedProperty.location}</div>
  //           <div><span className="font-medium">Dates:</span> {searchData.checkIn} to {searchData.checkOut}</div>
  //           <div><span className="font-medium">Duration:</span> {nights} nights</div>
  //         </div>
  //       </div>
  //
  //       <h3 className="font-semibold text-xl mb-4">Available Room Types</h3>
  //
  //       {availableRooms.length === 0 ? (
  //         <div className="text-center py-8">
  //           <p className="text-gray-500">No rooms available for the selected dates.</p>
  //         </div>
  //       ) : (
  //         <div className="space-y-4">
  //           {availableRooms.map(room => (
  //             <div
  //               key={room.id}
  //               className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
  //                 selectedRoom?.id === room.id ? 'border-amber-500 ring-2 ring-amber-500' : 'border-gray-200'
  //               }`}
  //               onClick={() => setSelectedRoom(room)}
  //             >
  //               <div className="grid sm:grid-cols-3 gap-4">
  //                 <div className="bg-gray-100 h-48 sm:h-full flex items-center justify-center">
  //                   <div className="text-center text-gray-400">
  //                     [Room Image]
  //                   </div>
  //                 </div>
  //                 <div className="p-4 sm:col-span-2">
  //                   <div className="flex justify-between items-start">
  //                     <h4 className="text-lg font-semibold">{room.name}</h4>
  //                     <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
  //                       ${room.pricePerNight}/night
  //                     </div>
  //                   </div>
  //                   <p className="text-gray-700 mb-2">{room.description}</p>
  //                   <div className="mb-3">
  //                     <span className="text-sm text-gray-600">Max guests: {room.maxGuests}</span>
  //                   </div>
  //                   <div className="mb-3">
  //                     <h5 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h5>
  //                     <div className="flex flex-wrap gap-2">
  //                       {room.amenities.map(amenity => (
  //                         <span key={amenity} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
  //                           {amenity}
  //                         </span>
  //                       ))}
  //                     </div>
  //                   </div>
  //                   <div className="mb-3">
  //                     <h5 className="text-sm font-medium text-gray-700 mb-1">Cancellation Policy:</h5>
  //                     <p className="text-sm text-gray-600">{room.cancellationPolicy}</p>
  //                   </div>
  //                   <div className="flex justify-between items-center border-t pt-3">
  //                     <div className="text-lg font-bold text-amber-600">
  //                       Total: ${room.totalPrice}
  //                       <span className="text-sm font-normal text-gray-500 ml-1">
  //                         for {nights} night{nights !== 1 ? 's' : ''}
  //                       </span>
  //                     </div>
  //                     <button
  //                       className={`px-4 py-2 rounded-lg text-sm font-medium ${
  //                         selectedRoom?.id === room.id
  //                           ? 'bg-amber-600 text-white'
  //                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  //                       }`}
  //                       onClick={() => setSelectedRoom(room)}
  //                     >
  //                       {selectedRoom?.id === room.id ? 'Selected' : 'Select'}
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //
  //       {selectedRoom && (
  //         <div className="mt-6">
  //           <h3 className="font-semibold text-xl mb-4">Traveler Information</h3>
  //           <div className="space-y-4">
  //             <div className="grid sm:grid-cols-2 gap-4">
  //               <div>
  //                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
  //                   Full Name
  //                 </label>
  //                 <input
  //                   type="text"
  //                   id="name"
  //                   name="name"
  //                   value={travelerDetails.name}
  //                   onChange={handleTravelerDetailsChange}
  //                   required
  //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
  //                 />
  //               </div>
  //               <div>
  //                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
  //                   Email Address
  //                 </label>
  //                 <input
  //                   type="email"
  //                   id="email"
  //                   name="email"
  //                   value={travelerDetails.email}
  //                   onChange={handleTravelerDetailsChange}
  //                   required
  //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
  //                 />
  //               </div>
  //             </div>
  //             <div>
  //               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
  //                 Phone Number
  //               </label>
  //               <input
  //                 type="tel"
  //                 id="phone"
  //                 name="phone"
  //                 value={travelerDetails.phone}
  //                 onChange={handleTravelerDetailsChange}
  //                 required
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
  //               />
  //             </div>
  //             <div>
  //               <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
  //                 Special Requests (Optional)
  //               </label>
  //               <textarea
  //                 id="specialRequests"
  //                 name="specialRequests"
  //                 value={travelerDetails.specialRequests}
  //                 onChange={handleTravelerDetailsChange}
  //                 rows={3}
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base resize-none"
  //                 placeholder="Airport transfers, dietary requirements, etc."
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // Render book step (payment and confirmation)
  const renderBookStep = () => {
    return (
      <div className="space-y-6">
        {bookingPreview && (
          <>
            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Property:</span> {selectedProperty.name}</div>
                  <div><span className="font-medium">Room Type:</span> {selectedRoom?.name}</div>
                  <div><span className="font-medium">Check-in:</span> {bookingPreview.checkIn}</div>
                  <div><span className="font-medium">Check-out:</span> {bookingPreview.checkOut}</div>
                  <div><span className="font-medium">Guests:</span> {bookingPreview.adults} adults, {bookingPreview.children} children</div>
                  <div><span className="font-medium">Duration:</span> {bookingPreview.nights} nights</div>
                </div>

                <div className="border-t pt-3 mt-3">
                  <h4 className="font-medium text-gray-900 mb-2">Price Breakdown:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Room rate ({bookingPreview.nights} nights):</span>
                      <span>${selectedRoom?.pricePerNight} × {bookingPreview.nights} = ${selectedRoom?.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes and fees:</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-amber-600 pt-2 border-t mt-2">
                      <span>Total:</span>
                      <span>${bookingPreview.totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-3 mt-3">
                  <h4 className="font-medium text-gray-900 mb-2">Cancellation Policy:</h4>
                  <p className="text-sm text-gray-700">{selectedRoom?.cancellationPolicy}</p>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-xl mb-4">Payment Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer ${
                      paymentDetails.method === 'credit_card' 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentDetails(prev => ({ ...prev, method: 'credit_card' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit_card"
                        name="method"
                        value="credit_card"
                        checked={paymentDetails.method === 'credit_card'}
                        onChange={handlePaymentDetailsChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label htmlFor="credit_card" className="ml-2 block text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                    </div>
                  </div>
                  <div 
                    className={`border rounded-lg p-3 cursor-pointer ${
                      paymentDetails.method === 'pay_at_property' 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentDetails(prev => ({ ...prev, method: 'pay_at_property' }))}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="pay_at_property"
                        name="method"
                        value="pay_at_property"
                        checked={paymentDetails.method === 'pay_at_property'}
                        onChange={handlePaymentDetailsChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300"
                      />
                      <label htmlFor="pay_at_property" className="ml-2 block text-sm font-medium text-gray-700">
                        Pay at Property
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {paymentDetails.method === 'credit_card' && (
                <>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentDetails.cardNumber || ''}
                      onChange={handlePaymentDetailsChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder
                      </label>
                      <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={paymentDetails.cardHolder || ''}
                        onChange={handlePaymentDetailsChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentDetails.expiryDate || ''}
                          onChange={handlePaymentDetailsChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentDetails.cvv || ''}
                          onChange={handlePaymentDetailsChange}
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-amber-50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  <Clock className="h-5 w-5 inline mr-2" />
                  Important Information
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Check-in: Available 24 hours (advance notice required)</li>
                  <li>• Check-out: Until 14:00</li>
                  <li>• Airport transfers available (additional charge)</li>
                  <li>• Game drives and cultural tours can be arranged</li>
                  <li>• Free cancellation up to 24 hours before arrival</li>
                  <li>• Payment accepted: Visa, Mastercard, Cash, M-Pesa</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Render confirmation step
  const renderConfirmationStep = () => {
    return (
      <div className="text-center py-8">
        {bookingConfirmation ? (
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your booking has been successfully confirmed. A confirmation email has been sent to your email address.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mt-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-4">Booking Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Booking ID:</span>
                  <span>{bookingConfirmation.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span className="capitalize">{bookingConfirmation.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Property:</span>
                  <span>{bookingConfirmation.propertyDetails.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{bookingConfirmation.propertyDetails.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Contact:</span>
                  <span>{bookingConfirmation.propertyDetails.contactInfo}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  // Reset the booking flow
                  setCurrentStep(1);
                  setSearchData({
                    checkIn: '',
                    checkOut: '',
                    adults: 2,
                    children: 0
                  });
                  setAvailableRooms([]);
                  setSelectedRoom(null);
                  setTravelerDetails({
                    name: '',
                    email: '',
                    phone: '',
                    specialRequests: ''
                  });
                  setPaymentDetails({
                    method: 'credit_card'
                  });
                  setBookingPreview(null);
                  setBookingConfirmation(null);
                }}
                className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Book Another Stay
              </button>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            <p>Loading confirmation...</p>
          </div>
        )}
      </div>
    );
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSearchStep();
      case 4:
        return renderBookStep();
      case 5:
        return renderConfirmationStep();
      default:
        return renderSearchStep(); // Default to search step
    }
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="slideUp">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Book Your Safari Experience
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Reserve your stay at Talek Bush Camp and experience the magic of Masai Mara.
            </p>
          </div>
        </AnimatedSection>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
        />

        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="slideUp" delay={200}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              {/* Step indicators */}
              {renderStepIndicators()}

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
                  <X className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {/* Loading indicator */}
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading...</p>
                </div>
              )}

              {/* Step content */}
              {!loading && renderStepContent()}

              {/* Navigation buttons */}
              {!loading && currentStep < 5 && (
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
                  >
                    {currentStep === 4 ? 'Confirm Booking' : 'Continue'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Booking;
