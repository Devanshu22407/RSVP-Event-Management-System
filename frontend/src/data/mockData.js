// Mock data for events - in a real app, this would come from a database
export const mockEvents = [
  {
    _id: '1',
    title: 'Gujarat Tech Summit 2025',
    description: 'Join the biggest technology conference in Gujarat featuring AI, blockchain, and emerging technologies.',
    fullDescription: 'The Gujarat Tech Summit 2025 is a premier technology conference bringing together industry leaders, innovators, and tech enthusiasts from across India. This year\'s summit will feature keynote speeches from top technology executives, hands-on workshops, startup showcases, and networking opportunities.\n\nKey highlights include:\n• AI and Machine Learning workshops\n• Blockchain technology demonstrations\n• Startup pitch competitions\n• Networking sessions with industry leaders\n• Panel discussions on future tech trends\n\nDon\'t miss this opportunity to connect with like-minded professionals and learn about the latest technological advancements shaping our future.',
    category: 'Technology',
    date: '2025-10-15',
    startDate: '2025-10-15T09:00:00Z',
    endDate: '2025-10-15T18:00:00Z',
    time: { start: '09:00', end: '18:00' },
    location: {
      venue: 'Mahatma Mandir Convention Centre',
      address: 'Sector 13C, Gandhinagar',
      city: 'Gandhinagar',
      state: 'Gujarat'
    },
    organizer: {
      _id: 'org1',
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul@techsummit.com'
    },
    capacity: 500,
    attendees: ['user1', 'user2', 'user3', 'user4', 'user5'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    views: 245,
    price: 'Free',
    tags: ['Technology', 'AI', 'Blockchain', 'Networking']
  },
  {
    _id: '2',
    title: 'Ahmedabad Food Festival',
    description: 'Experience the rich culinary heritage of Gujarat with traditional and modern food stalls.',
    fullDescription: 'The Ahmedabad Food Festival celebrates the diverse and rich culinary traditions of Gujarat and India. This three-day festival features over 100 food stalls, cooking demonstrations by renowned chefs, and cultural performances.\n\nWhat to expect:\n• Traditional Gujarati thali experiences\n• Street food from across India\n• Live cooking demonstrations\n• Food competitions and contests\n• Cultural performances and music\n• Family-friendly activities\n\nCome hungry and leave with unforgettable memories of authentic Indian flavors!',
    category: 'Food & Drink',
    date: '2025-10-22',
    startDate: '2025-10-22T11:00:00Z',
    endDate: '2025-10-24T22:00:00Z',
    time: { start: '11:00', end: '22:00' },
    location: {
      venue: 'Sabarmati Riverfront',
      address: 'Sabarmati Riverfront Road',
      city: 'Ahmedabad',
      state: 'Gujarat'
    },
    organizer: {
      _id: 'org2',
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya@foodfest.com'
    },
    capacity: 1000,
    attendees: ['user1', 'user3', 'user6', 'user7', 'user8', 'user9', 'user10'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
    views: 189,
    price: '₹200',
    tags: ['Food', 'Culture', 'Festival', 'Family']
  },
  {
    _id: '3',
    title: 'Mumbai Business Networking Meet',
    description: 'Connect with entrepreneurs, investors, and business leaders in Mumbai\'s premier networking event.',
    fullDescription: 'Join Mumbai\'s most influential business leaders, entrepreneurs, and investors for an evening of meaningful connections and opportunities. This exclusive networking event brings together professionals from various industries to share insights, explore collaborations, and build lasting business relationships.\n\nEvent highlights:\n• Panel discussion on emerging market trends\n• Investor pitch session for startups\n• One-on-one networking opportunities\n• Industry-specific roundtable discussions\n• Cocktail reception and dinner\n\nDress code: Business formal. Registration includes networking session, dinner, and welcome drinks.',
    category: 'Business',
    date: '2025-11-05',
    startDate: '2025-11-05T18:00:00Z',
    endDate: '2025-11-05T22:00:00Z',
    time: { start: '18:00', end: '22:00' },
    location: {
      venue: 'The Taj Mahal Palace',
      address: 'Apollo Bunder, Colaba',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    organizer: {
      _id: 'org3',
      firstName: 'Arjun',
      lastName: 'Singh',
      email: 'arjun@mumbainetwork.com'
    },
    capacity: 150,
    attendees: ['user2', 'user4', 'user8'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop',
    views: 156,
    price: '₹1500',
    tags: ['Business', 'Networking', 'Entrepreneurship', 'Investment']
  },
  {
    _id: '4',
    title: 'Bangalore Yoga & Wellness Retreat',
    description: 'A weekend retreat focused on mental wellness, yoga, and mindfulness practices.',
    fullDescription: 'Escape the hustle and bustle of city life and join us for a rejuvenating weekend retreat in the serene outskirts of Bangalore. This wellness retreat combines traditional yoga practices with modern mindfulness techniques to help you achieve inner peace and physical well-being.\n\nRetreat includes:\n• Daily yoga and meditation sessions\n• Ayurvedic wellness consultations\n• Healthy, organic meal preparations\n• Nature walks and outdoor activities\n• Stress management workshops\n• Digital detox sessions\n\nAll levels welcome - from beginners to advanced practitioners. Accommodation and meals included in the package.',
    category: 'Health & Wellness',
    date: '2025-11-12',
    startDate: '2025-11-12T08:00:00Z',
    endDate: '2025-11-14T17:00:00Z',
    time: { start: '08:00', end: '17:00' },
    location: {
      venue: 'Serenity Wellness Resort',
      address: 'Kanakapura Road',
      city: 'Bangalore',
      state: 'Karnataka'
    },
    organizer: {
      _id: 'org4',
      firstName: 'Anjali',
      lastName: 'Mehta',
      email: 'anjali@serenityretreat.com'
    },
    capacity: 50,
    attendees: ['user1', 'user5', 'user9'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    views: 92,
    price: '₹3500',
    tags: ['Wellness', 'Yoga', 'Meditation', 'Retreat']
  },
  {
    _id: '5',
    title: 'Delhi Art & Culture Exhibition',
    description: 'Discover contemporary Indian art and cultural performances in the heart of Delhi.',
    fullDescription: 'Experience the vibrant world of contemporary Indian art at this exclusive exhibition featuring works from emerging and established artists across the country. The exhibition showcases diverse art forms including paintings, sculptures, digital art, and interactive installations.\n\nExhibition features:\n• 50+ contemporary artworks\n• Live painting demonstrations\n• Cultural performances and music\n• Artist meet and greet sessions\n• Art workshops for visitors\n• Photography exhibitions\n\nA perfect blend of traditional Indian art forms with modern artistic expressions. Special guided tours available on weekends.',
    category: 'Arts & Culture',
    date: '2025-11-20',
    startDate: '2025-11-20T10:00:00Z',
    endDate: '2025-11-22T20:00:00Z',
    time: { start: '10:00', end: '20:00' },
    location: {
      venue: 'National Gallery of Modern Art',
      address: 'Jaipur House, Near India Gate',
      city: 'New Delhi',
      state: 'Delhi'
    },
    organizer: {
      _id: 'org5',
      firstName: 'Kavya',
      lastName: 'Reddy',
      email: 'kavya@artexhibition.com'
    },
    capacity: 300,
    attendees: ['user2', 'user6', 'user10'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    views: 134,
    price: '₹300',
    tags: ['Art', 'Culture', 'Exhibition', 'Performance']
  },
  {
    _id: '6',
    title: 'Pune Marathon Training Camp',
    description: 'Intensive training camp for marathon runners of all levels in the scenic hills of Pune.',
    fullDescription: 'Prepare for your next marathon with our intensive training camp designed for runners of all levels. Located in the beautiful hills surrounding Pune, this camp offers professional coaching, nutritional guidance, and a supportive community of fellow runners.\n\nTraining camp includes:\n• Professional coaching and training plans\n• Nutrition and diet consultations\n• Injury prevention workshops\n• Group running sessions\n• Strength and conditioning training\n• Recovery and stretching sessions\n\nWhether you\'re a beginner looking to complete your first 5K or an experienced runner training for a full marathon, our expert coaches will help you achieve your goals.',
    category: 'Sports & Fitness',
    date: '2025-12-01',
    startDate: '2025-12-01T06:00:00Z',
    endDate: '2025-12-03T18:00:00Z',
    time: { start: '06:00', end: '18:00' },
    location: {
      venue: 'Sahyadri Hills Training Center',
      address: 'Lonavala-Pune Highway',
      city: 'Pune',
      state: 'Maharashtra'
    },
    organizer: {
      _id: 'org6',
      firstName: 'Vikram',
      lastName: 'Joshi',
      email: 'vikram@marathoncamp.com'
    },
    capacity: 75,
    attendees: ['user3', 'user7'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    views: 87,
    price: '₹2500',
    tags: ['Sports', 'Fitness', 'Marathon', 'Training']
  },
  {
    _id: '7',
    title: 'Rajasthan Music Festival',
    description: 'Traditional and contemporary music performances in the royal city of Jaipur.',
    fullDescription: 'Immerse yourself in the rich musical heritage of Rajasthan at this spectacular music festival featuring traditional folk music, classical performances, and contemporary fusion acts. Set against the backdrop of Jaipur\'s magnificent architecture, this festival celebrates the diverse musical traditions of India.\n\nFestival highlights:\n• Traditional Rajasthani folk performances\n• Classical Indian music concerts\n• Contemporary fusion and world music\n• Interactive music workshops\n• Cultural dance performances\n• Local artisan markets\n\nExperience the magic of Rajasthani culture through music, dance, and art in the beautiful Pink City.',
    category: 'Music',
    date: '2025-12-15',
    startDate: '2025-12-15T17:00:00Z',
    endDate: '2025-12-17T23:00:00Z',
    time: { start: '17:00', end: '23:00' },
    location: {
      venue: 'City Palace Amphitheater',
      address: 'City Palace Complex',
      city: 'Jaipur',
      state: 'Rajasthan'
    },
    organizer: {
      _id: 'org7',
      firstName: 'Meera',
      lastName: 'Sharma',
      email: 'meera@rajasthanmusic.com'
    },
    capacity: 800,
    attendees: ['user1', 'user4', 'user6', 'user8'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    views: 203,
    price: '₹800',
    tags: ['Music', 'Culture', 'Traditional', 'Festival']
  },
  {
    _id: '8',
    title: 'Chennai Education Summit',
    description: 'Explore innovative teaching methods and educational technology at this premier education conference.',
    fullDescription: 'Join educators, researchers, and edtech innovators at Chennai\'s premier education summit. This comprehensive conference focuses on transforming education through technology, innovative teaching methodologies, and inclusive learning practices.\n\nSummit topics include:\n• Digital transformation in education\n• AI and machine learning in learning\n• Inclusive education practices\n• Future skills and curriculum design\n• EdTech startup showcases\n• Teacher training and development\n\nNetwork with education professionals, discover cutting-edge tools, and gain insights into the future of learning.',
    category: 'Education',
    date: '2025-12-28',
    startDate: '2025-12-28T09:00:00Z',
    endDate: '2025-12-29T17:00:00Z',
    time: { start: '09:00', end: '17:00' },
    location: {
      venue: 'IIT Madras Convention Center',
      address: 'IIT Madras Campus',
      city: 'Chennai',
      state: 'Tamil Nadu'
    },
    organizer: {
      _id: 'org8',
      firstName: 'Dr. Suresh',
      lastName: 'Kumar',
      email: 'suresh@edusummit.com'
    },
    capacity: 400,
    attendees: ['user2', 'user5', 'user9'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    views: 168,
    price: '₹1200',
    tags: ['Education', 'Technology', 'Innovation', 'Learning']
  }
];

// Mock communities data
export const mockCommunities = [
  {
    id: '1',
    name: 'Gujarat Tech Innovators',
    description: 'A vibrant community of tech enthusiasts, developers, and entrepreneurs from Gujarat, focusing on emerging technologies and startup culture.',
    members: 2150,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop',
    tags: ['Programming', 'Startups', 'AI', 'Blockchain'],
    isVerified: true,
    activity: 'Very Active',
    location: 'Gujarat, India',
    upcomingEvents: 5,
    description_full: 'Gujarat Tech Innovators is the largest technology community in Gujarat, bringing together developers, entrepreneurs, designers, and tech enthusiasts. We organize regular meetups, hackathons, and workshops to foster innovation and collaboration in the tech ecosystem.'
  },
  {
    id: '2',
    name: 'Mumbai Business Network',
    description: 'Professional networking community for entrepreneurs, business leaders, and professionals in Mumbai and surrounding areas.',
    members: 1890,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
    tags: ['Networking', 'Entrepreneurship', 'Investment', 'Leadership'],
    isVerified: true,
    activity: 'Very Active',
    location: 'Mumbai, Maharashtra',
    upcomingEvents: 3,
    description_full: 'Mumbai Business Network connects ambitious professionals and entrepreneurs across Mumbai. Our community focuses on meaningful business relationships, knowledge sharing, and collaborative growth opportunities.'
  },
  {
    id: '3',
    name: 'Indian Wellness Community',
    description: 'Holistic wellness community promoting mental health, fitness, yoga, and mindful living across India.',
    members: 1567,
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    tags: ['Yoga', 'Meditation', 'Fitness', 'Mental Health'],
    isVerified: true,
    activity: 'Active',
    location: 'Pan India',
    upcomingEvents: 4,
    description_full: 'Indian Wellness Community is dedicated to promoting holistic health and well-being. We organize wellness retreats, yoga sessions, mental health workshops, and fitness challenges to help our members lead healthier, more balanced lives.'
  },
  {
    id: '4',
    name: 'Delhi Arts & Culture Circle',
    description: 'Creative community celebrating Indian arts, culture, music, and traditional crafts in the National Capital Region.',
    members: 1245,
    category: 'Arts',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
    tags: ['Art', 'Music', 'Culture', 'Heritage'],
    isVerified: true,
    activity: 'Active',
    location: 'Delhi NCR',
    upcomingEvents: 6,
    description_full: 'Delhi Arts & Culture Circle celebrates the rich cultural heritage of India through art exhibitions, cultural performances, workshops, and heritage walks. Join us to explore and preserve India\'s artistic traditions.'
  },
  {
    id: '5',
    name: 'Bangalore Food Explorers',
    description: 'Food enthusiasts community exploring diverse cuisines, restaurants, and culinary experiences in Bangalore.',
    members: 1078,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop',
    tags: ['Food', 'Restaurants', 'Cooking', 'Culture'],
    isVerified: false,
    activity: 'Very Active',
    location: 'Bangalore, Karnataka',
    upcomingEvents: 7,
    description_full: 'Bangalore Food Explorers brings together food lovers to discover amazing restaurants, share recipes, organize food walks, and celebrate the diverse culinary landscape of Bangalore and beyond.'
  },
  {
    id: '6',
    name: 'Chennai Music Lovers',
    description: 'Music community celebrating South Indian classical music, contemporary sounds, and musical collaborations.',
    members: 934,
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
    tags: ['Classical Music', 'Contemporary', 'Concerts', 'Learning'],
    isVerified: true,
    activity: 'Active',
    location: 'Chennai, Tamil Nadu',
    upcomingEvents: 4,
    description_full: 'Chennai Music Lovers is a community for music enthusiasts who appreciate both traditional and contemporary music. We organize concerts, music appreciation sessions, and workshops for musicians of all levels.'
  },
  {
    id: '7',
    name: 'Pune Photography Club',
    description: 'Photography enthusiasts sharing techniques, organizing photo walks, and showcasing visual storytelling.',
    members: 823,
    category: 'Arts',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=250&fit=crop',
    tags: ['Photography', 'Visual Arts', 'Workshops', 'Travel'],
    isVerified: true,
    activity: 'Active',
    location: 'Pune, Maharashtra',
    upcomingEvents: 5,
    description_full: 'Pune Photography Club connects photographers of all skill levels. We organize photo walks, workshops, exhibitions, and provide a platform for photographers to learn, share, and grow together.'
  },
  {
    id: '8',
    name: 'Kolkata Literature Society',
    description: 'Literary community celebrating Bengali and Indian literature through book clubs, discussions, and author meetups.',
    members: 712,
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    tags: ['Literature', 'Books', 'Writing', 'Culture'],
    isVerified: false,
    activity: 'Moderate',
    location: 'Kolkata, West Bengal',
    upcomingEvents: 3,
    description_full: 'Kolkata Literature Society is a haven for book lovers and literature enthusiasts. We organize book readings, author interactions, writing workshops, and celebrate the rich literary heritage of Bengal and India.'
  },
  {
    id: '9',
    name: 'Hyderabad Runners Club',
    description: 'Running community promoting fitness, organizing marathons, and supporting runners of all levels in Hyderabad.',
    members: 656,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    tags: ['Running', 'Fitness', 'Marathon', 'Health'],
    isVerified: true,
    activity: 'Very Active',
    location: 'Hyderabad, Telangana',
    upcomingEvents: 4,
    description_full: 'Hyderabad Runners Club is a supportive community for runners of all levels. From beginners to marathon veterans, we provide training programs, organize runs, and promote a healthy, active lifestyle.'
  },
  {
    id: '10',
    name: 'Ahmedabad Startup Ecosystem',
    description: 'Entrepreneurial community supporting startups, innovation, and business development in Gujarat.',
    members: 545,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop',
    tags: ['Startups', 'Innovation', 'Funding', 'Mentorship'],
    isVerified: false,
    activity: 'Active',
    location: 'Ahmedabad, Gujarat',
    upcomingEvents: 2,
    description_full: 'Ahmedabad Startup Ecosystem nurtures entrepreneurial talent and supports startup growth in Gujarat. We connect founders with mentors, investors, and resources needed to build successful businesses.'
  }
];