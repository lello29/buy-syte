
import { 
  Barcode, 
  Info, 
  Package, 
  ImagePlus, 
  Settings, 
  ShoppingBag
} from "lucide-react";

export const STEPS = [
  { id: "barcode", label: "Codice", icon: Barcode, subtitle: "Inizia con un codice" },
  { id: "basic-info", label: "Info base", icon: Info, subtitle: "Titolo e prezzo" },
  { id: "details", label: "Dettagli", icon: Package, subtitle: "Specifiche prodotto" },
  { id: "images", label: "Immagini", icon: ImagePlus, subtitle: "Foto e media" },
  { id: "options", label: "Opzioni", icon: Settings, subtitle: "Varianti e vendita" },
  { id: "publish", label: "Pubblica", icon: ShoppingBag, subtitle: "Finalizza e pubblica" }
];
