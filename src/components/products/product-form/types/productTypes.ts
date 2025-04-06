
import { Product } from "@/types";

export type ProductFormData = Partial<Product> & {
  variants?: {
    name: string;
    options: { value: string; price?: number; stock?: number }[];
  }[];
  sellingOptions?: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  seo?: {
    keywords: string[];
    optimizedTitle: string;
  };
  images: (string | File)[];
  isSharedProduct?: boolean;
  barcode?: string;
}

export interface ValidationError {
  step: number;
  field: string;
  message: string;
}
