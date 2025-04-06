
import { toast } from "sonner";

export const generateUniqueCode = () => {
  // Generate a unique code for the product
  return "SHOP" + Date.now().toString().slice(-8);
};

export const searchProductByBarcode = (barcodeValue: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    toast.loading("Ricerca prodotto nell'archivio centrale...");
    
    // Simulate product search in the shared database
    setTimeout(() => {
      if (barcodeValue.startsWith("8001") || barcodeValue.startsWith("978")) {
        // Product found in the central database
        const productData = {
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
        
        toast.dismiss();
        resolve(productData);
      } else {
        toast.dismiss();
        toast.error("Nessun prodotto trovato con questo codice");
        toast.info("Puoi inserire manualmente i dettagli del prodotto");
        reject("No product found");
      }
    }, 1500);
  });
};
