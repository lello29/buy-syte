
import { Shop, Product, Task, Order, Collaborator } from "@/types";

// Adding or updating mock data to support our fallback strategy
export const mockShops: Shop[] = [
  {
    id: "shop-1",
    userId: "user-1",
    name: "Negozio Demo 1",
    description: "Un negozio di esempio per la demo",
    address: "Via Roma 123, Milano",
    phone: "+39 02 12345678",
    email: "negozio1@example.com",
    products: [],
    offers: [],
    aiCredits: 10,
    isApproved: true,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fiscalCode: "ABCDEF12G34H567I",
    vatNumber: "12345678901",
    category: "Abbigliamento"
  },
  {
    id: "shop-2",
    userId: "user-2",
    name: "Negozio Demo 2",
    description: "Un altro negozio di esempio",
    address: "Via Verdi 45, Roma",
    phone: "+39 06 87654321",
    email: "negozio2@example.com",
    products: [],
    offers: [],
    aiCredits: 5,
    isApproved: true,
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    fiscalCode: "LMNOPQ12R34S567T",
    vatNumber: "09876543210",
    category: "Elettronica"
  }
];

export const mockProducts: Product[] = [
  {
    id: "product-1",
    shopId: "shop-1",
    name: "Prodotto Demo 1",
    description: "Una descrizione del prodotto demo",
    price: 29.99,
    category: "Abbigliamento",
    inventory: 100,
    images: ["https://via.placeholder.com/150"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "product-2",
    shopId: "shop-1",
    name: "Prodotto Demo 2",
    description: "Un'altra descrizione di prodotto demo",
    price: 49.99,
    discountPrice: 39.99,
    category: "Elettronica",
    inventory: 50,
    images: ["https://via.placeholder.com/150"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    shopId: "shop-1",
    products: [
      {
        productId: "product-1",
        productName: "Prodotto Demo 1",
        quantity: 2,
        price: 29.99
      }
    ],
    status: "delivered",
    totalPrice: 59.98,
    shippingAddress: "Via Roma 123, Milano",
    paymentMethod: "Credit Card",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "order-2",
    userId: "user-1",
    shopId: "shop-2",
    products: [
      {
        productId: "product-2",
        productName: "Prodotto Demo 2",
        quantity: 1,
        price: 39.99
      }
    ],
    status: "processing",
    totalPrice: 39.99,
    shippingAddress: "Via Roma 123, Milano",
    paymentMethod: "PayPal",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: "task-1",
    shopId: "shop-1",
    collaboratorId: "collab-1",
    title: "Consegna prodotti",
    description: "Consegnare i prodotti all'indirizzo del cliente",
    status: "completed",
    reward: 15,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "task-2",
    shopId: "shop-1",
    collaboratorId: "collab-1",
    title: "Servizio fotografico",
    description: "Realizzare foto dei nuovi prodotti",
    status: "assigned",
    reward: 30,
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock collaborators data
export const mockCollaborators: Collaborator[] = [
  {
    id: "collab-1",
    userId: "user-3",
    name: "Collaboratore Demo",
    email: "collab@example.com",
    phone: "+39 333 1234567",
    coverageArea: "Milano",
    availability: "Lun-Ven",
    rating: 4.5,
    completedTasks: 10,
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Exporting also mock data for users, orders, etc.
export const users = [
  {
    id: "user-1",
    name: "Mario Rossi",
    email: "mario@example.com",
    role: "user",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "user-2", 
    name: "Giulia Bianchi",
    email: "giulia@example.com",
    role: "shop",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fiscalCode: "BNCGLI80A01H501E",
    vatNumber: "12345678901"
  }
];

// Create a simple function to get products by shop ID
export const getProductsByShopId = (shopId: string): Product[] => {
  return mockProducts.filter(product => product.shopId === shopId);
};

// Function to get shop by ID
export const getShopById = (shopId: string): Shop | undefined => {
  return mockShops.find(shop => shop.id === shopId);
};

// Function to get orders by user ID
export const getOrdersByUserId = (userId: string): Order[] => {
  return mockOrders.filter(order => order.userId === userId);
};

// Function to get tasks by collaborator ID
export const getTasksByCollaboratorId = (collaboratorId: string): Task[] => {
  return mockTasks.filter(task => task.collaboratorId === collaboratorId);
};

// Mock data for all entities
export const shops = mockShops;
export const products = mockProducts;
export const categories = [
  { id: "cat-1", name: "Abbigliamento", description: "Abbigliamento e accessori", slug: "abbigliamento" },
  { id: "cat-2", name: "Elettronica", description: "Prodotti elettronici", slug: "elettronica" }
];
export const offers = [];
export const collaborators = mockCollaborators;
export const tasks = mockTasks;
export const orders = mockOrders;
