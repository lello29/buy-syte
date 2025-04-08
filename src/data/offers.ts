
import { Offer } from "@/types";

export const offers: Offer[] = [
  {
    id: "offer1",
    shopId: "shop1",
    name: "Sconto 10% su Smart TV",
    title: "Sconto 10% su Smart TV",
    description: "Offerta speciale su tutte le Smart TV",
    discount: 10,
    discountPercentage: 10,
    startDate: "2023-01-25T00:00:00.000Z",
    endDate: "2023-02-28T23:59:59.000Z",
    isActive: true,
  },
  {
    id: "offer2",
    shopId: "shop2",
    name: "Sconto 15% su Abiti",
    title: "Sconto 15% su Abiti",
    description: "Offerta speciale su tutti gli abiti",
    discount: 15,
    discountPercentage: 15,
    startDate: "2023-03-05T00:00:00.000Z",
    endDate: "2023-04-05T23:59:59.000Z",
    isActive: true,
  },
  {
    id: "offer3",
    shopId: "shop3",
    name: "Pizza a Metà Prezzo il Martedì",
    title: "Pizza a Metà Prezzo il Martedì",
    description: "Ogni martedì pizza a metà prezzo",
    discount: 50,
    discountPercentage: 50,
    startDate: "2023-05-01T00:00:00.000Z",
    endDate: "2023-06-30T23:59:59.000Z",
    isActive: true,
  },
];

export const getOffersByShopId = (shopId: string): Offer[] => {
  return offers.filter(offer => offer.shopId === shopId);
};
