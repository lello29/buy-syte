
import { User, Shop, Product, Order, Offer, Collaborator, Task, WishlistItem, UserRole } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: "u1",
    name: "Mario Rossi",
    email: "mario@example.com",
    role: "user",
    favorites: ["s1", "s3"],
    loyaltyPoints: 120,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-06-20T14:15:00Z"
  },
  {
    id: "u2",
    name: "Elettronica Store",
    email: "store@elettronica.com",
    role: "shop",
    favorites: [],
    loyaltyPoints: 0,
    createdAt: "2022-11-05T09:45:00Z",
    updatedAt: "2023-07-12T16:30:00Z"
  },
  {
    id: "u3",
    name: "Luigi Bianchi",
    email: "luigi@example.com",
    role: "collaborator",
    favorites: ["s2"],
    loyaltyPoints: 50,
    createdAt: "2023-02-20T11:15:00Z",
    updatedAt: "2023-05-18T13:45:00Z"
  },
  {
    id: "u4",
    name: "Admin",
    email: "admin@shophub.com",
    role: "admin",
    favorites: [],
    loyaltyPoints: 0,
    createdAt: "2022-10-01T08:00:00Z",
    updatedAt: "2023-08-01T10:00:00Z"
  }
];

// Mock Shops
export const shops: Shop[] = [
  {
    id: "s1",
    userId: "u2",
    name: "Elettronica Store",
    description: "Negozio di elettronica con i migliori prodotti tecnologici",
    address: "Via Roma 123, Milano",
    phone: "+39 02 1234567",
    email: "store@elettronica.com",
    products: [],
    offers: [],
    aiCredits: 100,
    lastUpdated: "2023-07-12T16:30:00Z",
    createdAt: "2022-11-05T09:45:00Z"
  },
  {
    id: "s2",
    userId: "u5",
    name: "Moda Italiana",
    description: "Abbigliamento italiano di alta qualità",
    address: "Via Montenapoleone 10, Milano",
    phone: "+39 02 7654321",
    email: "info@modaitaliana.com",
    products: [],
    offers: [],
    aiCredits: 50,
    lastUpdated: "2023-06-25T12:20:00Z",
    createdAt: "2023-01-10T14:30:00Z"
  },
  {
    id: "s3",
    userId: "u6",
    name: "Alimentari Freschi",
    description: "Prodotti freschi e locali",
    address: "Via Garibaldi 45, Roma",
    phone: "+39 06 9876543",
    email: "info@alimentarifreschi.com",
    products: [],
    offers: [],
    aiCredits: 25,
    lastUpdated: "2023-08-01T09:10:00Z",
    createdAt: "2023-03-15T11:00:00Z"
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: "p1",
    shopId: "s1",
    name: "Smartphone XYZ",
    description: "L'ultimo modello di smartphone con fotocamera avanzata",
    price: 799.99,
    discountPrice: 749.99,
    category: "Elettronica",
    inventory: 25,
    images: ["/placeholder.svg"],
    isActive: true,
    createdAt: "2023-05-10T09:00:00Z",
    updatedAt: "2023-07-01T10:30:00Z"
  },
  {
    id: "p2",
    shopId: "s1",
    name: "Laptop UltraThin",
    description: "Laptop leggero e potente per professionisti",
    price: 1299.99,
    category: "Elettronica",
    inventory: 10,
    images: ["/placeholder.svg"],
    isActive: true,
    createdAt: "2023-04-15T14:20:00Z",
    updatedAt: "2023-06-20T11:45:00Z"
  },
  {
    id: "p3",
    shopId: "s2",
    name: "Giacca in Pelle",
    description: "Giacca in pelle italiana di alta qualità",
    price: 349.99,
    category: "Abbigliamento",
    inventory: 15,
    images: ["/placeholder.svg"],
    isActive: true,
    createdAt: "2023-03-20T13:15:00Z",
    updatedAt: "2023-05-30T09:50:00Z"
  },
  {
    id: "p4",
    shopId: "s3",
    name: "Olio d'Oliva Extra Vergine",
    description: "Olio d'oliva biologico di prima spremitura",
    price: 12.99,
    category: "Alimentari",
    inventory: 50,
    images: ["/placeholder.svg"],
    isActive: true,
    createdAt: "2023-07-05T10:40:00Z",
    updatedAt: "2023-07-25T15:20:00Z"
  }
];

// Assign products to shops
shops[0].products = products.filter(product => product.shopId === "s1");
shops[1].products = products.filter(product => product.shopId === "s2");
shops[2].products = products.filter(product => product.shopId === "s3");

// Mock Orders
export const orders: Order[] = [
  {
    id: "o1",
    userId: "u1",
    shopId: "s1",
    products: [
      {
        productId: "p1",
        productName: "Smartphone XYZ",
        quantity: 1,
        price: 749.99
      },
      {
        productId: "p2",
        productName: "Laptop UltraThin",
        quantity: 1,
        price: 1299.99
      }
    ],
    status: "delivered",
    totalPrice: 2049.98,
    shippingAddress: "Via Verdi 45, Milano",
    paymentMethod: "Carta di Credito",
    createdAt: "2023-06-15T11:30:00Z",
    updatedAt: "2023-06-18T14:20:00Z"
  },
  {
    id: "o2",
    userId: "u1",
    shopId: "s2",
    products: [
      {
        productId: "p3",
        productName: "Giacca in Pelle",
        quantity: 1,
        price: 349.99
      }
    ],
    status: "processing",
    totalPrice: 349.99,
    shippingAddress: "Via Verdi 45, Milano",
    paymentMethod: "PayPal",
    createdAt: "2023-07-20T16:45:00Z",
    updatedAt: "2023-07-21T09:10:00Z"
  }
];

// Mock Offers
export const offers: Offer[] = [
  {
    id: "of1",
    shopId: "s1",
    title: "Sconti Estivi",
    description: "20% di sconto su tutti i prodotti elettronici",
    discountPercentage: 20,
    startDate: "2023-07-01T00:00:00Z",
    endDate: "2023-08-31T23:59:59Z",
    isActive: true,
    createdAt: "2023-06-25T14:00:00Z"
  },
  {
    id: "of2",
    shopId: "s2",
    title: "Promozione Back to School",
    description: "Sconti speciali su abbigliamento per studenti",
    discountPercentage: 15,
    startDate: "2023-08-15T00:00:00Z",
    endDate: "2023-09-15T23:59:59Z",
    isActive: true,
    createdAt: "2023-08-01T10:30:00Z"
  }
];

// Assign offers to shops
shops[0].offers = offers.filter(offer => offer.shopId === "s1");
shops[1].offers = offers.filter(offer => offer.shopId === "s2");

// Mock Collaborators
export const collaborators: Collaborator[] = [
  {
    id: "c1",
    userId: "u3",
    name: "Luigi Bianchi",
    email: "luigi@example.com",
    phone: "+39 333 1234567",
    coverageArea: "Milano Centro",
    availability: "Lun-Ven 9:00-18:00",
    rating: 4.8,
    completedTasks: 45,
    createdAt: "2023-02-20T11:15:00Z"
  },
  {
    id: "c2",
    userId: "u7",
    name: "Giulia Verdi",
    email: "giulia@example.com",
    phone: "+39 344 7654321",
    coverageArea: "Milano Nord, Monza",
    availability: "Mar-Sab 10:00-19:00",
    rating: 4.5,
    completedTasks: 32,
    createdAt: "2023-03-10T13:45:00Z"
  }
];

// Mock Tasks
export const tasks: Task[] = [
  {
    id: "t1",
    shopId: "s1",
    collaboratorId: "c1",
    title: "Consegna Urgente",
    description: "Consegna di un laptop UltraThin al cliente in Via Manzoni",
    status: "completed",
    reward: 15,
    dueDate: "2023-07-10T18:00:00Z",
    createdAt: "2023-07-10T09:30:00Z",
    updatedAt: "2023-07-10T16:45:00Z"
  },
  {
    id: "t2",
    shopId: "s2",
    title: "Inventario Settimanale",
    description: "Verifica inventario e aggiornamento sistema",
    status: "open",
    reward: 20,
    dueDate: "2023-08-15T19:00:00Z",
    createdAt: "2023-08-10T14:20:00Z",
    updatedAt: "2023-08-10T14:20:00Z"
  }
];

// Mock Wishlist Items
export const wishlistItems: WishlistItem[] = [
  {
    id: "w1",
    userId: "u1",
    productId: "p2",
    shopId: "s1",
    addedAt: "2023-07-05T16:30:00Z"
  },
  {
    id: "w2",
    userId: "u1",
    productId: "p3",
    shopId: "s2",
    addedAt: "2023-07-15T09:45:00Z"
  }
];

// Function to get user by role
export const getUsersByRole = (role: UserRole): User[] => {
  return users.filter(user => user.role === role);
};

// Function to get user by id
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Function to get shop by id
export const getShopById = (id: string): Shop | undefined => {
  return shops.find(shop => shop.id === id);
};

// Function to get orders by user id
export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

// Function to get wishlist by user id
export const getWishlistByUserId = (userId: string): WishlistItem[] => {
  return wishlistItems.filter(item => item.userId === userId);
};

// Function to get products by shop id
export const getProductsByShopId = (shopId: string): Product[] => {
  return products.filter(product => product.shopId === shopId);
};

// Function to get offers by shop id
export const getOffersByShopId = (shopId: string): Offer[] => {
  return offers.filter(offer => offer.shopId === shopId);
};

// Function to get tasks by shop id
export const getTasksByShopId = (shopId: string): Task[] => {
  return tasks.filter(task => task.shopId === shopId);
};

// Function to get tasks by collaborator id
export const getTasksByCollaboratorId = (collaboratorId: string): Task[] => {
  return tasks.filter(task => task.collaboratorId === collaboratorId);
};
