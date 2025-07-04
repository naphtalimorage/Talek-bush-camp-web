// Simple test script to verify the enhanced chat response functionality
// This simulates different user questions and shows what responses would be generated

// Import the getBotResponse function logic (simplified version for testing)
function getBotResponse(userMessage) {
  // Convert to lowercase for case-insensitive matching
  const message = userMessage.toLowerCase();

  // Define common question patterns - ordered from most specific to most general (same as in LiveChat.tsx)
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

  // Define responses (simplified version of botResponses from LiveChat.tsx)
  const botResponses = {
    // Basic inquiries
    "check availability": "I'd be happy to check availability for you! Please let me know your preferred check-in and check-out dates, and the number of guests.",
    "safari packages": "We offer various safari packages including full-day game drives, cultural village tours, and photography safaris. Prices start from $80 per person. Would you like specific details?",
    "airport transfer": "We provide airport transfer services from Ol Kiombo Airport (16km away) for $50 per vehicle. Our managers Abdul and Mustafa can arrange this for you.",
    "pricing information": "Our accommodation rates: Safari Tent from $120/night, Cottage from $150/night, Family Room from $250/night. All include breakfast and basic amenities.",
    "contact manager": "You can reach our managers directly: Abdul (+254 123 456 789) specializes in safari arrangements, and Mustafa handles guest services. They're available 24/7.",

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

  // Check for direct keyword matches first
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && message.includes(key)) {
      return { key, response };
    }
  }

  // Check for question patterns
  for (const { pattern, key } of questionPatterns) {
    if (pattern.test(message)) {
      return { key, response: botResponses[key] || botResponses.default };
    }
  }

  // If no match found, return default response
  return { key: 'default', response: botResponses.default };
}

// Test cases
const testQuestions = [
  "Where is Talek Bush Camp located?",
  "How do I get to your camp from Nairobi?",
  "What kind of rooms do you have?",
  "Tell me about your facilities",
  "What activities can we do at the camp?",
  "I want to see lions and elephants",
  "Can we visit a Maasai village?",
  "What's the weather like in August?",
  "Do you have WiFi?",
  "Are you environmentally friendly?",
  "We're celebrating our anniversary",
  "Is the camp suitable for children?",
  "How much does it cost to stay?",
  "I'd like to check availability for next month",
  "Do you offer safari packages?",
  "Can you arrange airport transfers?",
  "I need to speak with the manager",
  "What time is breakfast served?",  // Should use default response
  "Hello, just checking in"          // Should use default response
];

// Run tests
console.log("TESTING ENHANCED CHAT RESPONSES\n");
testQuestions.forEach(question => {
  const result = getBotResponse(question);
  console.log(`Q: ${question}`);
  console.log(`Matched key: "${result.key}"`);
  console.log(`A: ${result.response}`);
  console.log("-------------------\n");
});

console.log("Test completed. The enhanced chat should now respond intelligently to a wide variety of questions about Talek Bush Camp.");
