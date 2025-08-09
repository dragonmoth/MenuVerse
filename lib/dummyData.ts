export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPremium: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  themeColor: string;
  tables: number;
  logo: string;
  menu: MenuItem[];
}

export const dummyRestaurants: Restaurant[] = [
  {
    id: "fastrestaurant",
    name: "FastRestaurant",
    cuisine: "Fast Food",
    themeColor: "#FF6B35",
    tables: 20,
    logo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&h=200&fit=crop&crop=center",
    menu: [
      {
        id: "burger-classic",
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, and special sauce",
        price: 299,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "fries-premium",
        name: "Truffle Fries",
        description: "Premium fries with truffle oil and parmesan - AR preview available",
        price: 450,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop",
        isPremium: true
      },
      {
        id: "pizza-margherita",
        name: "Margherita Pizza",
        description: "Fresh mozzarella, basil, and tomato sauce",
        price: 399,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "shake-vanilla",
        name: "Vanilla Milkshake",
        description: "Creamy vanilla milkshake with whipped cream",
        price: 149,
        image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=200&fit=crop",
        isPremium: false
      }
    ]
  },
  {
    id: "spice-palace",
    name: "Spice Palace",
    cuisine: "Indian",
    themeColor: "#D4AF37",
    tables: 15,
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop&crop=center",
    menu: [
      {
        id: "biryani-chicken",
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with tender chicken and spices",
        price: 349,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d94c?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "curry-premium",
        name: "Royal Butter Chicken",
        description: "Premium butter chicken with 3D portion visualization",
        price: 450,
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=200&fit=crop",
        isPremium: true
      },
      {
        id: "naan-garlic",
        name: "Garlic Naan",
        description: "Fresh baked naan bread with garlic and herbs",
        price: 89,
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "lassi-mango",
        name: "Mango Lassi",
        description: "Traditional yogurt drink with fresh mango",
        price: 120,
        image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=300&h=200&fit=crop",
        isPremium: false
      }
    ]
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    cuisine: "Seafood",
    themeColor: "#0077BE",
    tables: 25,
    logo: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&h=200&fit=crop&crop=center",
    menu: [
      {
        id: "salmon-grilled",
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with lemon herbs",
        price: 599,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "lobster-premium",
        name: "Maine Lobster",
        description: "Fresh Maine lobster with AR ingredient breakdown",
        price: 899,
        image: "https://images.unsplash.com/photo-1559717865-a99cac1c95d8?w=300&h=200&fit=crop",
        isPremium: true
      },
      {
        id: "shrimp-scampi",
        name: "Shrimp Scampi",
        description: "Garlic butter shrimp with pasta",
        price: 449,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d94c?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "soup-clam",
        name: "Clam Chowder",
        description: "Creamy New England clam chowder",
        price: 199,
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop",
        isPremium: false
      }
    ]
  },
  {
    id: "pasta-corner",
    name: "Pasta Corner",
    cuisine: "Italian",
    themeColor: "#228B22",
    tables: 18,
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&crop=center",
    menu: [
      {
        id: "pasta-carbonara",
        name: "Spaghetti Carbonara",
        description: "Classic carbonara with pancetta and parmesan",
        price: 329,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "pasta-truffle",
        name: "Truffle Pasta",
        description: "Premium pasta with black truffle and VR dining experience",
        price: 699,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
        isPremium: true
      },
      {
        id: "lasagna-classic",
        name: "Classic Lasagna",
        description: "Layers of pasta, meat sauce, and cheese",
        price: 399,
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "tiramisu",
        name: "Tiramisu",
        description: "Traditional Italian dessert with coffee and mascarpone",
        price: 199,
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
        isPremium: false
      }
    ]
  },
  {
    id: "green-garden",
    name: "Green Garden",
    cuisine: "Healthy/Vegan",
    themeColor: "#32CD32",
    tables: 12,
    logo: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop&crop=center",
    menu: [
      {
        id: "bowl-buddha",
        name: "Buddha Bowl",
        description: "Quinoa, avocado, chickpeas, and tahini dressing",
        price: 279,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "smoothie-premium",
        name: "Superfood Smoothie",
        description: "Premium smoothie with nutritional AR visualization",
        price: 349,
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop",
        isPremium: true
      },
      {
        id: "salad-kale",
        name: "Kale Caesar Salad",
        description: "Fresh kale with vegan caesar dressing",
        price: 229,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
        isPremium: false
      },
      {
        id: "wrap-veggie",
        name: "Veggie Wrap",
        description: "Grilled vegetables in whole wheat tortilla",
        price: 199,
        image: "https://images.unsplash.com/photo-1565299585323-38174c2d8cbd?w=300&h=200&fit=crop",
        isPremium: false
      }
    ]
  }
];

export const mockReservations: Array<{
  id: string;
  restaurantId: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tablePreference: string;
  preOrder: any[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}> = [];

export const mockOrders: Array<{
  id: string;
  restaurantId: string;
  tableNumber: number;
  items: Array<{
    menuItemId: string;
    quantity: number;
    notes?: string;
  }>;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'served' | 'paid';
  timestamp: string;
}> = [];