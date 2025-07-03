import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, Mail, Clock, Minimize2, Maximize2 } from 'lucide-react';

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
    "Contact manager"
  ];

  const botResponses: { [key: string]: string } = {
    "check availability": "I'd be happy to check availability for you! Please let me know your preferred check-in and check-out dates, and the number of guests.",
    "safari packages": "We offer various safari packages including full-day game drives, cultural village tours, and photography safaris. Prices start from $80 per person. Would you like specific details?",
    "airport transfer": "We provide airport transfer services from Ol Kiombo Airport (16km away) for $50 per vehicle. Our managers Abdul and Mustafa can arrange this for you.",
    "pricing information": "Our accommodation rates: Safari Tent from $120/night, Cottage from $150/night, Family Room from $250/night. All include breakfast and basic amenities.",
    "contact manager": "You can reach our managers directly: Abdul (+254 123 456 789) specializes in safari arrangements, and Mustafa handles guest services. They're available 24/7.",
    "default": "Thank you for your message! For immediate assistance, please call us at +254 123 456 789 or email info@talekbushcamp.com. Our team will respond shortly."
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
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && userMessage.includes(key.replace(' ', ''))) {
        return response;
      }
    }
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
                    <span>+254 123 456 789</span>
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