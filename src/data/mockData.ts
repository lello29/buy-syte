import { User, Shop, Product, Offer, Collaborator, Task, Order, OrderItem } from "@/types";

// Mock data for users
export const users: User[] = [
  {
    id: "user1",
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    role: "user",
    favorites: ["shop1", "shop3"],
    loyaltyPoints: 120,
    isActive: true,
    createdAt: "2022-01-01T12:00:00.000Z",
    updatedAt: "2023-03-05T18:30:00.000Z",
  },
  {
    id: "user2",
    name: "Laura Bianchi",
    email: "laura.bianchi@example.com",
    role: "shop",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: "2022-02-15T09:45:00.000Z",
    updatedAt: "2023-04-10T21:15:00.000Z",
  },
  {
    id: "user3",
    name: "Giovanni Verdi",
    email: "giovanni.verdi@example.com",
    role: "shop",
    favorites: [],
    loyaltyPoints: 0,
    isActive: false,
    createdAt: "2022-03-20T15:20:00.000Z",
    updatedAt: "2023-05-20T11:00:00.000Z",
  },
  {
    id: "user4",
    name: "Elisa Neri",
    email: "elisa.neri@example.com",
    role: "collaborator",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: "2022-04-10T08:00:00.000Z",
    updatedAt: "2023-06-01T16:40:00.000Z",
  },
  {
    id: "user5",
    name: "Luca Gialli",
    email: "luca.gialli@example.com",
    role: "admin",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: "2022-05-01T10:30:00.000Z",
    updatedAt: "2023-07-15T09:00:00.000Z",
  },
  {
    id: "user6",
    name: "Francesca Russo",
    email: "francesca.russo@example.com",
    role: "collaborator",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: "2022-06-12T14:00:00.000Z",
    updatedAt: "2023-08-01T14:20:00.000Z",
  },
  {
    id: "user7",
    name: "Roberto Viola",
    email: "roberto.viola@example.com",
    role: "user",
    favorites: ["shop2"],
    loyaltyPoints: 75,
    isActive: true,
    createdAt: "2022-07-01T16:00:00.000Z",
    updatedAt: "2023-09-10T17:30:00.000Z",
  },
  {
    id: "user8",
    name: "Alessia Argento",
    email: "alessia.argento@example.com",
    role: "user",
    favorites: ["shop1", "shop2", "shop3"],
    loyaltyPoints: 210,
    isActive: true,
    createdAt: "2022-08-05T11:30:00.000Z",
    updatedAt: "2023-10-01T20:00:00.000Z",
  },
  {
    id: "user9",
    name: "Simone Azzurri",
    email: "simone.azzurri@example.com",
    role: "shop",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: "2022-09-15T13:45:00.000Z",
    updatedAt: "2023-11-15T12:45:00.000Z",
  },
  {
    id: "user10",
    name: "Chiara Rosa",
    email: "chiara.rosa@example.com",
    role: "collaborator",
    favorites: [],
    loyaltyPoints: 0,
    isActive: false,
    createdAt: "2022-10-20T07:00:00.000Z",
    updatedAt: "2023-12-01T10:10:00.000Z",
  },
];

export const shops: Shop[] = [
  {
    id: "shop1",
    userId: "user2",
    name: "Elettronica Moderna",
    description: "Negozio di elettronica con i migliori prodotti tecnologici",
    address: "Via Roma 123, Milano",
    phone: "+39 02 1234567",
    email: "info@elettronicamoderna.it",
    products: [],
    offers: [],
    aiCredits: 100,
    lastUpdated: "2023-01-15T10:30:00.000Z",
    createdAt: "2022-09-10T14:20:00.000Z",
    logoImage: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=500&h=500&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop",
    websiteUrl: "https://elettronicamoderna.it",
    openingHours: "Lun-Ven: 9:00-19:00\nSab: 9:30-18:00\nDom: Chiuso",
    aboutUs: "Elettronica Moderna è un negozio specializzato in prodotti di tecnologia all'avanguardia. Fondato nel 2015, offriamo una vasta gamma di dispositivi elettronici dei migliori marchi.\n\nIl nostro team di esperti è sempre disponibile per consigliarti il prodotto più adatto alle tue esigenze.",
    categories: ["Elettronica", "Informatica", "Smartphone", "Accessori"],
    socialLinks: {
      facebook: "https://facebook.com/elettronicamoderna",
      instagram: "https://instagram.com/elettronica_moderna",
      twitter: "https://twitter.com/elettronica_m"
    }
  },
  {
    id: "shop2",
    userId: "user3",
    name: "Moda Italiana",
    description: "Abbigliamento e accessori made in Italy",
    address: "Corso Vittorio Emanuele 45, Roma",
    phone: "+39 06 7654321",
    email: "info@modaitaliana.it",
    products: [],
    offers: [],
    aiCredits: 85,
    lastUpdated: "2023-02-20T16:45:00.000Z",
    createdAt: "2022-07-15T11:30:00.000Z",
    logoImage: "https://images.unsplash.com/photo-1589363460779-cbd8008e459d?w=500&h=500&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    openingHours: "Lun-Sab: 10:00-20:00\nDom: 15:00-19:00",
    aboutUs: "Moda Italiana è un marchio di abbigliamento che celebra lo stile e l'artigianato italiano. Fondata nel 2010, la nostra boutique offre capi di alta qualità realizzati da stilisti italiani emergenti e affermati.",
    categories: ["Abbigliamento", "Accessori", "Scarpe"],
    socialLinks: {
      instagram: "https://instagram.com/moda_italiana",
      facebook: "https://facebook.com/modaitaliana"
    }
  },
  {
    id: "shop3",
    userId: "user9",
    name: "Ristorante Bella Napoli",
    description: "Autentica cucina napoletana con forno a legna",
    address: "Via Toledo 78, Napoli",
    phone: "+39 081 9876543",
    email: "info@bellanapoli.it",
    products: [],
    offers: [],
    aiCredits: 92,
    lastUpdated: "2023-03-10T12:00:00.000Z",
    createdAt: "2022-11-01T18:00:00.000Z",
    logoImage: "https://images.unsplash.com/photo-1517248135464-602a88cfed82?w=500&h=500&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop",
    openingHours: "Lun-Dom: 12:00-15:00, 19:00-23:00",
    aboutUs: "Il Ristorante Bella Napoli offre un'esperienza culinaria unica con piatti tradizionali napoletani preparati con ingredienti freschi e di alta qualità. La nostra pizza è cotta nel forno a legna secondo l'antica tradizione.",
    categories: ["Ristoranti", "Pizza", "Cucina Napoletana"],
  },
  {
    id: "shop4",
    userId: "user10",
    name: "Libreria Il Sognalibro",
    description: "Un angolo di cultura e fantasia nel cuore della città",
    address: "Via Montenapoleone 10, Milano",
    phone: "+39 02 0123456",
    email: "info@ilsognalibro.it",
    products: [],
    offers: [],
    aiCredits: 78,
    lastUpdated: "2023-04-05T09:15:00.000Z",
    createdAt: "2023-01-20T10:00:00.000Z",
  },
  {
    id: "shop5",
    userId: "user4",
    name: "Gelateria Artigianale",
    description: "Gelati artigianali prodotti con ingredienti naturali",
    address: "Piazza Navona 22, Roma",
    phone: "+39 06 1122334",
    email: "info@gelateriaartigianale.it",
    products: [],
    offers: [],
    aiCredits: 65,
    lastUpdated: "2023-05-15T14:30:00.000Z",
    createdAt: "2023-02-28T16:00:00.000Z",
  },
  {
    id: "shop6",
    userId: "user6",
    name: "Officina Meccanica",
    description: "Riparazioni auto e moto di tutte le marche",
    address: "Via Emilia 56, Bologna",
    phone: "+39 051 4455667",
    email: "info@officinameccanica.it",
    products: [],
    offers: [],
    aiCredits: 50,
    lastUpdated: "2023-06-20T17:45:00.000Z",
    createdAt: "2023-03-15T12:00:00.000Z",
  },
  {
    id: "shop7",
    userId: "user7",
    name: "Pasticceria Dolce Tentazione",
    description: "Dolci e torte per ogni occasione",
    address: "Corso Garibaldi 34, Torino",
    phone: "+39 011 7788990",
    email: "info@dolcetentazione.it",
    products: [],
    offers: [],
    aiCredits: 110,
    lastUpdated: "2023-07-01T11:00:00.000Z",
    createdAt: "2023-04-01T08:00:00.000Z",
  },
  {
    id: "shop8",
    userId: "user8",
    name: "Studio Fotografico",
    description: "Servizi fotografici professionali per privati e aziende",
    address: "Via Veneto 89, Roma",
    phone: "+39 06 2233445",
    email: "info@studiofotografico.it",
    products: [],
    offers: [],
    aiCredits: 95,
    lastUpdated: "2023-08-10T15:15:00.000Z",
    createdAt: "2023-05-10T14:00:00.000Z",
  },
  {
    id: "shop9",
    userId: "user5",
    name: "Negozio di Arredamento",
    description: "Mobili e complementi d'arredo per la tua casa",
    address: "Via Dante 12, Verona",
    phone: "+39 045 5566778",
    email: "info@arredamento.it",
    products: [],
    offers: [],
    aiCredits: 80,
    lastUpdated: "2023-09-01T13:30:00.000Z",
    createdAt: "2023-06-01T10:00:00.000Z",
  },
  {
    id: "shop10",
    userId: "user1",
    name: "Agenzia Viaggi",
    description: "Organizzazione di viaggi e vacanze su misura",
    address: "Piazza del Duomo 1, Firenze",
    phone: "+39 055 8899001",
    email: "info@agenziaviaggi.it",
    products: [],
    offers: [],
    aiCredits: 70,
    lastUpdated: "2023-10-15T16:00:00.000Z",
    createdAt: "2023-07-15T18:00:00.000Z",
  },
];

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

export const offers: Offer[] = [
  {
    id: "offer1",
    shopId: "shop1",
    title: "Sconto 10% su Smart TV",
    description: "Offerta speciale su tutte le Smart TV",
    discountPercentage: 10,
    startDate: "2023-01-25T00:00:00.000Z",
    endDate: "2023-02-28T23:59:59.000Z",
    isActive: true,
    createdAt: "2023-01-20T10:00:00.000Z",
  },
  {
    id: "offer2",
    shopId: "shop2",
    title: "Sconto 15% su Abiti",
    description: "Offerta speciale su tutti gli abiti",
    discountPercentage: 15,
    startDate: "2023-03-05T00:00:00.000Z",
    endDate: "2023-04-05T23:59:59.000Z",
    isActive: true,
    createdAt: "2023-03-01T09:00:00.000Z",
  },
  {
    id: "offer3",
    shopId: "shop3",
    title: "Pizza a Metà Prezzo il Martedì",
    description: "Ogni martedì pizza a metà prezzo",
    discountPercentage: 50,
    startDate: "2023-05-01T00:00:00.000Z",
    endDate: "2023-06-30T23:59:59.000Z",
    isActive: true,
    createdAt: "2023-05-01T12:00:00.000Z",
  },
];

export const collaborators: Collaborator[] = [
  {
    id: "collab1",
    userId: "user4",
    name: "Elisa Neri",
    email: "elisa.neri@example.com",
    phone: "+39 333 4455667",
    coverageArea: "Milano",
    availability: "Lun-Ven, 9:00-18:00",
    rating: 4.5,
    completedTasks: 25,
    isActive: true,
    createdAt: "2022-04-10T08:00:00.000Z",
  },
  {
    id: "collab2",
    userId: "user6",
    name: "Francesca Russo",
    email: "francesca.russo@example.com",
    phone: "+39 345 6677889",
    coverageArea: "Roma",
    availability: "Mar-Sab, 10:00-19:00",
    rating: 4.8,
    completedTasks: 30,
    isActive: true,
    createdAt: "2022-06-12T14:00:00.000Z",
  },
  {
    id: "collab3",
    userId: "user10",
    name: "Chiara Rosa",
    email: "chiara.rosa@example.com",
    phone: "+39 320 1122334",
    coverageArea: "Napoli",
    availability: "Mer-Dom, 11:00-20:00",
    rating: 4.2,
    completedTasks: 18,
    isActive: false,
    createdAt: "2022-10-20T07:00:00.000Z",
  },
];

export const tasks: Task[] = [
  {
    id: "task1",
    shopId: "shop1",
    collaboratorId: "collab1",
    title: "Installazione Impianto Audio",
    description: "Installazione di un nuovo impianto audio nel negozio",
    status: "completed",
    reward: 150.00,
    dueDate: "2023-02-28T23:59:59.000Z",
    createdAt: "2023-01-20T10:00:00.000Z",
    updatedAt: "2023-02-28T23:59:59.000Z",
  },
  {
    id: "task2",
    shopId: "shop2",
    collaboratorId: "collab2",
    title: "Organizzazione Evento Moda",
    description: "Organizzazione di un evento per la presentazione della nuova collezione",
    status: "assigned",
    reward: 200.00,
    dueDate: "2023-04-05T23:59:59.000Z",
    createdAt: "2023-03-01T09:00:00.000Z",
    updatedAt: "2023-03-15T12:00:00.000Z",
  },
  {
    id: "task3",
    shopId: "shop3",
    title: "Promozione sui Social Media",
    description: "Creazione di una campagna pubblicitaria sui social media",
    status: "open",
    reward: 100.00,
    dueDate: "2023-05-31T23:59:59.000Z",
    createdAt: "2023-05-01T12:00:00.000Z",
    updatedAt: "2023-05-15T14:00:00.000Z",
  },
];

export const orders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    shopId: "shop1",
    products: [
      {
        productId: "prod1",
        productName: "Smart TV 55 pollici",
        quantity: 1,
        price: 599.99
      }
    ],
    status: "delivered",
    totalPrice: 599.99,
    shippingAddress: "Via Roma 123, Milano",
    paymentMethod: "Carta di Credito",
    createdAt: "2023-04-15T10:30:00.000Z",
    updatedAt: "2023-04-16T15:00:00.000Z"
  },
  {
    id: "order2",
    userId: "user1",
    shopId: "shop2",
    products: [
      {
        productId: "prod3",
        productName: "Abito Elegante",
        quantity: 1,
        price: 199.50
      }
    ],
    status: "processing",
    totalPrice: 199.50,
    shippingAddress: "Via Roma 123, Milano",
    paymentMethod: "PayPal",
    createdAt: "2023-05-20T14:45:00.000Z",
    updatedAt: "2023-05-20T14:45:00.000Z"
  },
  {
    id: "order3",
    userId: "user7",
    shopId: "shop3",
    products: [
      {
        productId: "prod5",
        productName: "Pizza Margherita",
        quantity: 2,
        price: 15.00
      },
      {
        productId: "prod6",
        productName: "Spaghetti alle Vongole",
        quantity: 1,
        price: 12.00
      }
    ],
    status: "delivered",
    totalPrice: 27.00,
    shippingAddress: "Via Garibaldi 45, Roma",
    paymentMethod: "Contanti alla consegna",
    createdAt: "2023-06-10T19:20:00.000Z",
    updatedAt: "2023-06-10T20:15:00.000Z"
  },
  {
    id: "order4",
    userId: "user8",
    shopId: "shop1",
    products: [
      {
        productId: "prod2",
        productName: "Notebook Ultraleggero",
        quantity: 1,
        price: 1299.00
      }
    ],
    status: "shipped",
    totalPrice: 1299.00,
    shippingAddress: "Corso Vittorio Emanuele 80, Torino",
    paymentMethod: "Bonifico Bancario",
    createdAt: "2023-07-05T11:10:00.000Z",
    updatedAt: "2023-07-06T09:30:00.000Z"
  },
  {
    id: "order5",
    userId: "user1",
    shopId: "shop4",
    products: [
      {
        productId: "prod7",
        productName: "Il Signore degli Anelli",
        quantity: 1,
        price: 19.90
      },
      {
        productId: "prod8",
        productName: "1984",
        quantity: 1,
        price: 15.50
      }
    ],
    status: "delivered",
    totalPrice: 35.40,
    shippingAddress: "Via Roma 123, Milano",
    paymentMethod: "Carta di Credito",
    createdAt: "2023-08-18T16:40:00.000Z",
    updatedAt: "2023-08-20T12:00:00.000Z"
  }
];

export const getProductsByShopId = (shopId: string): Product[] => {
  return products.filter(product => product.shopId === shopId);
};

export const getOffersByShopId = (shopId: string): Offer[] => {
  return offers.filter(offer => offer.shopId === shopId);
};

export const getTasksByCollaboratorId = (collaboratorId: string): Task[] => {
  return tasks.filter(task => task.collaboratorId === collaboratorId);
};

export const getUsersByRole = (role: string): User[] => {
  return users.filter(user => user.role === role);
};

export const getShopById = (shopId: string): Shop | undefined => {
  return shops.find(shop => shop.id === shopId);
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrdersByShopId = (shopId: string): Order[] => {
  return orders.filter(order => order.shopId === shopId);
};
