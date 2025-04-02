
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod1",
    shopId: "shop1",
    name: "Smart TV 55 pollici",
    description: "TV LED 4K Ultra HD con HDR",
    price: 699.99,
    discountPrice: 599.99,
    category: "TV",
    inventory: 15,
    images: [
      "https://source.unsplash.com/400x300/?tv",
      "https://source.unsplash.com/400x300/?smarttv",
    ],
    isActive: true,
    createdAt: "2023-01-20T10:00:00.000Z",
    updatedAt: "2023-02-10T14:00:00.000Z",
  },
  {
    id: "prod2",
    shopId: "shop1",
    name: "Notebook Ultraleggero",
    description: "Laptop con processore Intel i7 e SSD da 512GB",
    price: 1299.00,
    category: "Notebook",
    inventory: 8,
    images: [
      "https://source.unsplash.com/400x300/?laptop",
      "https://source.unsplash.com/400x300/?notebook",
    ],
    isActive: true,
    createdAt: "2023-02-01T11:30:00.000Z",
    updatedAt: "2023-03-15T16:30:00.000Z",
  },
  {
    id: "prod3",
    shopId: "shop2",
    name: "Abito Elegante",
    description: "Abito da sera in seta con ricami",
    price: 249.50,
    discountPrice: 199.50,
    category: "Abbigliamento",
    inventory: 20,
    images: [
      "https://source.unsplash.com/400x300/?dress",
      "https://source.unsplash.com/400x300/?eveningdress",
    ],
    isActive: true,
    createdAt: "2023-03-01T09:00:00.000Z",
    updatedAt: "2023-04-01T12:00:00.000Z",
  },
  {
    id: "prod4",
    shopId: "shop2",
    name: "Scarpe in Pelle",
    description: "Scarpe da uomo in vera pelle",
    price: 149.00,
    category: "Scarpe",
    inventory: 12,
    images: [
      "https://source.unsplash.com/400x300/?shoes",
      "https://source.unsplash.com/400x300/?menshoes",
    ],
    isActive: true,
    createdAt: "2023-04-10T15:00:00.000Z",
    updatedAt: "2023-05-01T18:00:00.000Z",
  },
  {
    id: "prod5",
    shopId: "shop3",
    name: "Pizza Margherita",
    description: "Pizza con pomodoro, mozzarella e basilico",
    price: 7.50,
    category: "Pizza",
    inventory: 50,
    images: [
      "https://source.unsplash.com/400x300/?pizza",
      "https://source.unsplash.com/400x300/?margheritapizza",
    ],
    isActive: true,
    createdAt: "2023-05-01T12:00:00.000Z",
    updatedAt: "2023-06-01T10:00:00.000Z",
  },
  {
    id: "prod6",
    shopId: "shop3",
    name: "Spaghetti alle Vongole",
    description: "Spaghetti con vongole fresche",
    price: 12.00,
    category: "Primi Piatti",
    inventory: 30,
    images: [
      "https://source.unsplash.com/400x300/?spaghetti",
      "https://source.unsplash.com/400x300/?seafoodpasta",
    ],
    isActive: true,
    createdAt: "2023-06-15T13:30:00.000Z",
    updatedAt: "2023-07-01T11:30:00.000Z",
  },
  {
    id: "prod7",
    shopId: "shop4",
    name: "Il Signore degli Anelli",
    description: "J.R.R. Tolkien",
    price: 19.90,
    category: "Fantasy",
    inventory: 10,
    images: [
      "https://source.unsplash.com/400x300/?book",
      "https://source.unsplash.com/400x300/?fantasybook",
    ],
    isActive: true,
    createdAt: "2023-07-01T14:00:00.000Z",
    updatedAt: "2023-08-01T13:00:00.000Z",
  },
  {
    id: "prod8",
    shopId: "shop4",
    name: "1984",
    description: "George Orwell",
    price: 15.50,
    category: "Distopico",
    inventory: 15,
    images: [
      "https://source.unsplash.com/400x300/?book",
      "https://source.unsplash.com/400x300/?dystopianbook",
    ],
    isActive: true,
    createdAt: "2023-08-10T16:00:00.000Z",
    updatedAt: "2023-09-01T15:00:00.000Z",
  },
  {
    id: "prod9",
    shopId: "shop5",
    name: "Gelato al Cioccolato",
    description: "Gelato artigianale al cioccolato fondente",
    price: 3.50,
    category: "Gelato",
    inventory: 100,
    images: [
      "https://source.unsplash.com/400x300/?icecream",
      "https://source.unsplash.com/400x300/?chocolateicecream",
    ],
    isActive: true,
    createdAt: "2023-09-01T11:00:00.000Z",
    updatedAt: "2023-10-01T09:00:00.000Z",
  },
  {
    id: "prod10",
    shopId: "shop5",
    name: "Sorbetto al Limone",
    description: "Sorbetto rinfrescante al limone",
    price: 3.00,
    category: "Sorbetto",
    inventory: 80,
    images: [
      "https://source.unsplash.com/400x300/?sorbet",
      "https://source.unsplash.com/400x300/?lemon sorbet",
    ],
    isActive: true,
    createdAt: "2023-10-15T17:00:00.000Z",
    updatedAt: "2023-11-01T16:00:00.000Z",
  },
];

export const getProductsByShopId = (shopId: string): Product[] => {
  return products.filter(product => product.shopId === shopId);
};
