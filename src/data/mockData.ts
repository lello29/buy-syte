
import { Shop, Product } from "@/types";

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

// Create a simple function to get products by shop ID
export const getProductsByShopId = (shopId: string): Product[] => {
  return mockProducts.filter(product => product.shopId === shopId);
};

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

// Mock data for products, shops, and other entities
export const shops = mockShops;
export const products = mockProducts;
export const categories = [
  { id: "cat-1", name: "Abbigliamento", description: "Abbigliamento e accessori", slug: "abbigliamento" },
  { id: "cat-2", name: "Elettronica", description: "Prodotti elettronici", slug: "elettronica" }
];
export const offers = [];
export const collaborators = [
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
export const tasks = [];
export const orders = [];
