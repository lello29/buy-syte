
import { Offer } from "@/types";

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

export const getOffersByShopId = (shopId: string): Offer[] => {
  return offers.filter(offer => offer.shopId === shopId);
};
