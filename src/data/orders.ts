
import { Order } from "@/types";

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

export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrdersByShopId = (shopId: string): Order[] => {
  return orders.filter(order => order.shopId === shopId);
};
