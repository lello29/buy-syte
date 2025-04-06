import { toast } from "sonner";

// Product types for better type checking
export interface Product {
  name: string;
  description: string;
  category: string;
  price: number;
  inventory: number;
  weight: number;
  dimensions: string;
  sku: string;
  barcode: string;
  technicalSpecs?: string;
}

export const generateUniqueCode = () => {
  // Generate a unique code for the product
  return "SHOP" + Date.now().toString().slice(-8);
};

// Common barcode prefixes based on GS1 standards
const BARCODE_PREFIXES = {
  ITALY: ["80", "81", "82", "83", "84", "85", "86", "87", "88", "89"],
  BOOKS: ["978", "979"], // ISBN
  MAGAZINES: ["977"], // ISSN
  COUPONS: ["99"],
  INTERNAL: ["04", "2"],
};

// Update the search function to provide realistic product data based on barcode type
export const searchProductByBarcode = (barcodeValue: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    toast.loading("Ricerca prodotto nell'archivio centrale...");
    
    // Simulate product search in the shared database
    setTimeout(() => {
      try {
        // Validate barcode format first
        if (!barcodeValue || barcodeValue.length < 8) {
          throw new Error("Formato codice a barre non valido");
        }

        let productData: Product | null = null;
        const prefix = barcodeValue.substring(0, 3);
        
        // Italian product
        if (BARCODE_PREFIXES.ITALY.some(p => barcodeValue.startsWith(p))) {
          productData = {
            name: "Pasta Barilla Spaghetti N.5",
            description: "Pasta di semola di grano duro",
            category: "Alimentari",
            price: 1.29,
            inventory: 50,
            weight: 0.5,
            dimensions: "10x5x20 cm",
            sku: "BARILLA-SPA5",
            barcode: barcodeValue
          };
        } 
        // Book
        else if (BARCODE_PREFIXES.BOOKS.some(p => barcodeValue.startsWith(p))) {
          productData = {
            name: "Il Nome della Rosa",
            description: "Romanzo storico di Umberto Eco",
            category: "Libri",
            price: 12.50,
            inventory: 15,
            weight: 0.7,
            dimensions: "15x3x22 cm",
            sku: "LIBRO-ECO-01",
            barcode: barcodeValue
          };
        }
        // Magazine
        else if (BARCODE_PREFIXES.MAGAZINES.some(p => barcodeValue.startsWith(p))) {
          productData = {
            name: "Focus Storia",
            description: "Rivista mensile di approfondimento storico",
            category: "Riviste",
            price: 4.90,
            inventory: 25,
            weight: 0.3,
            dimensions: "21x0.5x28 cm",
            sku: "FOCUS-STORIA-05",
            barcode: barcodeValue
          };
        }
        // Other known format
        else if (barcodeValue.startsWith("4")) {
          productData = {
            name: "Cuffie Bluetooth Sony WH-1000XM4",
            description: "Cuffie wireless con cancellazione del rumore",
            category: "Elettronica",
            price: 299.99,
            inventory: 10,
            weight: 0.25,
            dimensions: "18x8x25 cm",
            sku: "SONY-WH1000XM4",
            barcode: barcodeValue,
            technicalSpecs: "Bluetooth 5.0, Autonomia 30h, Cancellazione attiva del rumore"
          };
        }
        
        if (productData) {
          toast.dismiss();
          toast.success("Prodotto trovato nel database centrale");
          resolve(productData);
        } else {
          throw new Error("Nessun prodotto trovato");
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Nessun prodotto trovato con questo codice");
        toast.info("Puoi inserire manualmente i dettagli del prodotto");
        reject("No product found");
      }
    }, 1500);
  });
};
