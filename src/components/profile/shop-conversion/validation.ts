
import { ShopFormData, ShopFormErrors } from "./types";

export const validateShopForm = (formData: ShopFormData): ShopFormErrors => {
  const errors: ShopFormErrors = {};
  
  if (!formData.shopName.trim()) {
    errors.shopName = "Nome negozio obbligatorio";
  }
  
  if (!formData.description.trim()) {
    errors.description = "Descrizione obbligatoria";
  }
  
  if (!formData.address.trim()) {
    errors.address = "Indirizzo obbligatorio";
  }
  
  if (!formData.phone.trim()) {
    errors.phone = "Telefono obbligatorio";
  }
  
  if (!formData.fiscalCode.trim()) {
    errors.fiscalCode = "Codice Fiscale obbligatorio";
  }
  
  if (!formData.vatNumber.trim()) {
    errors.vatNumber = "Partita IVA obbligatoria";
  }
  
  return errors;
};
