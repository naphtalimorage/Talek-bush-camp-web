import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, Clock, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);
  const [isWindowActive, setIsWindowActive] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Talek Bush Camp. I'm here to help you with bookings, safari arrangements, and any questions about our camp. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Check availability",
    "Safari packages", 
    "Airport transfer",
    "Pricing information",
    "Activities",
    "Location",
    "Accommodation"
  ];

  const botResponses: { [key: string]: string } = {
    // Basic inquiries
    "check availability": "I'd be happy to check availability for you! Please let me know your preferred check-in and check-out dates, and the number of guests.",
    "safari packages": "We offer various safari packages including full-day game drives, cultural village tours, and photography safaris. Prices start from $80 per person. To make a booking, please use our booking system on the website.",
    "airport transfer": "We provide airport transfer services from Ol Kiombo Airport (16km away) for $50 per vehicle. Our managers Abdul and Mustafa can arrange this for you.",
    "pricing information": "Our accommodation rates: Safari Tent from $120/night, Cottage from $150/night, Family Room from $250/night. All include breakfast and basic amenities. To make a reservation, please use our secure booking system.",
    "contact manager": "You can reach our managers directly: Abdul (+254 741 219 994) specializes in safari arrangements, and Mustafa handles guest services. They're available 24/7.",

    // Location information
    "location": "Talek Bush Camp is located in the heart of the Maasai Mara National Reserve in Kenya, right on the banks of the Talek River. We're just 5km from the main Talek Gate entrance to the reserve.",
    "directions": "From Nairobi, you can reach us by road (approximately 5-6 hours) or by flight to Ol Kiombo Airstrip (16km from our camp). We offer airport pickup services and can provide detailed driving directions upon request.",

    // Accommodation
    "accommodation": "We offer various accommodation options including Safari Tents, Cottages, and Family Rooms. All units feature comfortable beds with mosquito nets, private bathrooms with hot water, and verandas overlooking the bush.",
    "rooms": "Our rooms include Safari Tents (perfect for couples), Cottages (with extra space and privacy), and Family Rooms (accommodating up to 5 people). All accommodations are tastefully decorated with local crafts and modern amenities.",
    "facilities": "Our camp facilities include a restaurant serving international and local cuisine, a bar with panoramic views, free Wi-Fi in common areas, a gift shop, and a relaxation area overlooking the Talek River.",

    // Activities
    "activities": "At Talek Bush Camp, you can enjoy game drives, guided nature walks, cultural visits to Maasai villages, bird watching, bush breakfasts, sundowners, and evening campfires with Maasai warriors sharing stories.",
    "game drives": "We offer morning, afternoon, and full-day game drives in custom-designed 4x4 safari vehicles with experienced guides. The Maasai Mara is home to the Big Five and hosts the Great Migration from July to October.",
    "cultural": "Experience authentic Maasai culture through village visits where you can learn about traditional customs, participate in dances, and purchase handcrafted souvenirs directly from local artisans.",

    // Practical information
    "weather": "The Maasai Mara enjoys pleasant weather year-round. Daytime temperatures typically range from 25-30°C (77-86°F), while nights can be cooler at 10-15°C (50-59°F). The rainy seasons are typically April-May and November.",
    "what to pack": "We recommend packing light, neutral-colored clothing, a warm jacket for evenings, comfortable walking shoes, sun protection (hat, sunglasses, sunscreen), insect repellent, binoculars, and a camera with extra batteries.",
    "internet": "We provide free Wi-Fi in the main areas of the camp. However, please note that due to our remote location, the connection may sometimes be slow or intermittent.",

    // Conservation
    "conservation": "Talek Bush Camp is committed to sustainable tourism. We employ local staff, use solar power, practice water conservation, minimize waste, and contribute to local conservation initiatives protecting the Mara ecosystem.",
    "wildlife": "The Maasai Mara is home to incredible wildlife including lions, elephants, buffalos, leopards, rhinos, giraffes, zebras, and numerous antelope species. From July to October, witness the spectacular wildebeest migration.",

    // Special services
    "special occasions": "We can arrange special celebrations such as bush dinners, honeymoon packages, birthday surprises, and anniversary events. Please contact us in advance to organize these memorable experiences.",
    "children": "Children are welcome at Talek Bush Camp! We offer family-friendly accommodations, special meal options for kids, and tailored activities that introduce young ones to wildlife and Maasai culture in a safe environment.",

    // Default response
    "default": "Thank you for your message! I'm here to help with any questions about Talek Bush Camp. For immediate assistance, please call us at +254 741 219 994 or email info@talekbushcamp.com. Our team will respond shortly."
  };

  // Track window/tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsWindowActive(!document.hidden);
      if (!document.hidden && isOpen) {
        setHasUnreadMessages(false);
      }
    };

    const handleFocus = () => {
      setIsWindowActive(true);
      if (isOpen) {
        setHasUnreadMessages(false);
      }
    };

    const handleBlur = () => {
      setIsWindowActive(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
    if (isOpen && isWindowActive) {
      setHasUnreadMessages(false);
    }
  }, [messages, isOpen, isWindowActive]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnreadMessages(false);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage.toLowerCase());
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Show notification if window is not active
      if (!isWindowActive || !isOpen) {
        setHasUnreadMessages(true);
      }
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    // Convert to lowercase for case-insensitive matching
    const message = userMessage.toLowerCase();

    // Define common question patterns - ordered from most specific to most general
    const questionPatterns = [
      // Specific inquiries - these should be checked first
      { pattern: /safari package|tour package|package deal|package offer/i, key: "safari packages" },
      { pattern: /price|cost|rate|fee|charge|how much( does it cost| is it)?|pricing/i, key: "pricing information" },
      { pattern: /airport (transfer|pickup|shuttle)|transfer (from|to) airport|pickup (from|at) airport/i, key: "airport transfer" },
      { pattern: /check (availability|dates)|book|reservation|available|when can i|when is it available/i, key: "check availability" },
      { pattern: /manager|contact person|speak (with|to) someone|talk to|call|phone number/i, key: "contact manager" },

      // Location and directions
      { pattern: /how (can|do|would) (i|we) get (to|there)|directions to|travel to|journey to|route to|from .* to|getting (to|there)/i, key: "directions" },
      { pattern: /where is|location of|address|situated|find|how to (get|reach|arrive)/i, key: "location" },

      // Accommodation and facilities
      { pattern: /room type|accommodation type|place to stay|lodge|tent|cottage|sleep|bed/i, key: "accommodation" },
      { pattern: /facilities|amenities|offer|provide|service|feature|what('s| is) (available|included)/i, key: "facilities" },

      // Activities and experiences
      { pattern: /activity|activities|things to do|experience|entertainment|tour|excursion/i, key: "activities" },
      { pattern: /game drive|safari ride|wildlife tour|animal viewing|see animals/i, key: "game drives" },
      { pattern: /maasai|masai|tribe|cultural|village|local people|tradition|indigenous/i, key: "cultural" },

      // Practical information
      { pattern: /weather|climate|temperature|season|when to visit|best time/i, key: "weather" },
      { pattern: /pack|bring|luggage|suitcase|clothes|clothing|wear|what should i bring/i, key: "what to pack" },
      { pattern: /wifi|wi-fi|internet|connection|online|network|connectivity/i, key: "internet" },

      // Special interests
      { pattern: /conservation|sustainable|environment|eco(-friendly)?|green|responsible/i, key: "conservation" },
      { pattern: /animal|wildlife|big five|migration|lion|elephant|buffalo|leopard|rhino|zebra|giraffe/i, key: "wildlife" },
      { pattern: /birthday|anniversary|honeymoon|celebration|special occasion|romantic/i, key: "special occasions" },
      { pattern: /child|children|kid|family|young|baby|infant|toddler/i, key: "children" }
    ];

    // Check for direct keyword matches first (exact matches take priority)
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && message.includes(key)) {
        return response;
      }
    }

    // Check for question patterns
    for (const { pattern, key } of questionPatterns) {
      if (pattern.test(message)) {
        return botResponses[key] || botResponses.default;
      }
    }

    // If no match found, return default response
    return botResponses.default;
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={handleOpenChat}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-amber-600 hover:bg-amber-700'
        } text-white touch-manipulation flex items-center justify-center`}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
        {hasUnreadMessages && (
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse border-2 border-white">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 ${
          // Mobile: Full screen on small devices
          'bottom-0 left-0 right-0 top-0 sm:bottom-4 sm:right-4 sm:left-auto sm:top-auto sm:w-80 md:w-96 ' +
          (isMinimized 
            ? 'sm:h-14 h-16' 
            : 'sm:h-[500px] md:h-[550px]'
          )
        }`}>
          {/* Chat Header */}
          <div className="bg-amber-600 text-white p-3 sm:p-4 rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base truncate">Talek Bush Camp</h3>
                  {!isMinimized && (
                    <p className="text-xs text-amber-100">Usually replies instantly</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isMinimized && (
                  <div className="hidden sm:flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs">Online</span>
                  </div>
                )}
                <button
                  onClick={handleMinimizeChat}
                  className="hidden sm:block p-1 hover:bg-white/20 rounded transition-colors touch-manipulation"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={handleCloseChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors touch-manipulation"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Content - Hidden when minimized */}
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-amber-600 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        ) : (
                          <Bot className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        )}
                      </div>
                      <div className={`rounded-lg p-2.5 sm:p-3 ${
                        message.sender === 'user'
                          ? 'bg-amber-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-amber-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <Bot className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-600" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-2.5 sm:p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="p-3 sm:p-4 border-t border-gray-200 bg-white flex-shrink-0">
                  <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 px-2 py-1 rounded-full transition-colors touch-manipulation"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-lg flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent min-w-0"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputMessage.trim() === ''}
                    className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 active:bg-amber-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors touch-manipulation flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                {/* Contact Options */}
                <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs text-gray-500">
                  <div className="flex items-center justify-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>+254 741 219 994</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Minimized State Content */}
          {isMinimized && (
            <div className="flex-1 flex items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Chat minimized</span>
              </div>
              {hasUnreadMessages && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChat;
