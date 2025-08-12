// Mock data for exotic pet marketplace

export const mockUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1-555-0123",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&h=150&fit=crop&crop=face",
    registrationDate: "2024-01-15",
    isVerified: true
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1-555-0124",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    registrationDate: "2024-02-20",
    isVerified: true
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com", 
    phone: "+1-555-0125",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    registrationDate: "2024-03-10",
    isVerified: true
  }
];

export const mockListings = [
  {
    id: "1",
    title: "Beautiful Ball Python - Pastel Morph",
    price: 350,
    species: "Snake",
    subSpecies: "Ball Python",
    morph: "Pastel",
    gender: "Female",
    age: "8 months",
    quantity: 1,
    inStock: true,
    description: "Gorgeous pastel ball python with excellent feeding response. Very docile and handleable. Perfect for beginners or collectors looking for quality morphs.",
    images: [
      "https://images.unsplash.com/photo-1516505255854-da1ba2fa7e6d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618667-fbd1c5498dd9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop"
    ],
    sellerId: "1",
    datePosted: "2024-12-01"
  },
  {
    id: "2",
    title: "Crested Gecko - Flame Morph Pair",
    price: 280,
    species: "Gecko",
    subSpecies: "Crested Gecko", 
    morph: "Flame",
    gender: "Pair",
    age: "1+ year",
    quantity: 2,
    inStock: true,
    description: "Breeding pair of flame crested geckos. Both are proven breeders with excellent genetics. Female has been producing beautiful offspring.",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop"
    ],
    sellerId: "2",
    datePosted: "2024-11-28"
  },
  {
    id: "3",
    title: "Blue Tongue Skink - Northern",
    price: 450,
    species: "Lizard",
    subSpecies: "Blue Tongue Skink",
    morph: "Northern",
    gender: "Male",
    age: "6-12 months",
    quantity: 1,
    inStock: true,
    description: "Healthy northern blue tongue skink. Great appetite and very social. Loves to explore and interact with handlers.",
    images: [
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop"
    ],
    sellerId: "3",
    datePosted: "2024-11-25"
  },
  {
    id: "4",
    title: "Bearded Dragon - Red Morph",
    price: 320,
    species: "Lizard",
    subSpecies: "Bearded Dragon",
    morph: "Red",
    gender: "Female",
    age: "3-6 months",
    quantity: 1,
    inStock: true,
    description: "Vibrant red bearded dragon with excellent coloration. Hand-fed and very tame. Comes with care sheet and feeding guidelines.",
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618146830538-57a6d5c5c6d3?w=600&h=400&fit=crop"
    ],
    sellerId: "1",
    datePosted: "2024-11-20"
  },
  {
    id: "5",
    title: "Corn Snake - Anerythristic",
    price: 180,
    species: "Snake",
    subSpecies: "Corn Snake", 
    morph: "Anerythristic",
    gender: "Male",
    age: "0-3 months",
    quantity: 3,
    inStock: true,
    description: "Baby corn snakes, anerythristic morph. All feeding well on pinkie mice. Perfect starter snakes for new reptile keepers.",
    images: [
      "https://images.unsplash.com/photo-1516505255854-da1ba2fa7e6d?w=600&h=400&fit=crop"
    ],
    sellerId: "2", 
    datePosted: "2024-11-18"
  },
  {
    id: "6",
    title: "Leopard Gecko - Super Snow",
    price: 400,
    species: "Gecko",
    subSpecies: "Leopard Gecko",
    morph: "Super Snow", 
    gender: "Female",
    age: "1+ year",
    quantity: 1,
    inStock: false,
    description: "Stunning super snow leopard gecko. Beautiful white coloration with minimal patterning. This is a proven breeder female.",
    images: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop"
    ],
    sellerId: "3",
    datePosted: "2024-11-15"
  }
];

export const mockCartItems = [
  {
    id: "cart-1",
    listingId: "1",
    quantity: 1,
    userId: "1"
  }
];

export const mockMessages = [
  {
    id: "msg-1",
    fromUserId: "2",
    toUserId: "1", 
    listingId: "1",
    message: "Hi, is this ball python still available? I'm very interested!",
    timestamp: "2024-12-01T10:30:00Z",
    isRead: false
  },
  {
    id: "msg-2",
    fromUserId: "1",
    toUserId: "2",
    listingId: "1", 
    message: "Yes, she's still available! Would you like to schedule a viewing?",
    timestamp: "2024-12-01T11:15:00Z",
    isRead: true
  }
];

// Current logged in user (for demo)
export const currentUser = mockUsers[0];

// Filter options
export const speciesOptions = ["All", "Snake", "Gecko", "Lizard", "Turtle", "Amphibian"];
export const genderOptions = ["All", "Male", "Female", "Pair", "Unknown"];
export const ageOptions = ["All", "0-3 months", "3-6 months", "6-12 months", "1+ year"];