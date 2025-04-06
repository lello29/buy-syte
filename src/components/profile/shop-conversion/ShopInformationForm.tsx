
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";
import { ShopFormData, ShopFormErrors } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ShopInformationFormProps {
  formData: ShopFormData;
  errors: ShopFormErrors;
  loading: boolean;
  currentUserEmail: string;
  onChange: (field: keyof ShopFormData, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGetLocation: () => void;
}

const SHOP_CATEGORIES = [
  "Abbigliamento",
  "Alimentari",
  "Arredamento",
  "Elettronica",
  "Farmacia",
  "Informatica",
  "Libri",
  "Ristorante",
  "Servizi",
  "Sport",
  "Altro"
];

export const ShopInformationForm: React.FC<ShopInformationFormProps> = ({
  formData,
  errors,
  loading,
  currentUserEmail,
  onChange,
  onSubmit,
  onGetLocation,
}) => {
  const {
    shopName,
    description,
    address,
    phone,
    fiscalCode,
    vatNumber,
    latitude,
    longitude,
    category,
  } = formData;

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shopName">Nome Negozio <span className="text-red-500">*</span></Label>
          <Input
            id="shopName"
            placeholder="Es. Elettronica Store"
            value={shopName}
            onChange={(e) => onChange("shopName", e.target.value)}
            required
            className={errors.shopName ? "border-red-500" : ""}
          />
          {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Categoria Negozio <span className="text-red-500">*</span></Label>
          <Select 
            value={category} 
            onValueChange={(value) => onChange("category", value)}
          >
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Seleziona una categoria" />
            </SelectTrigger>
            <SelectContent>
              {SHOP_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descrizione <span className="text-red-500">*</span></Label>
          <Textarea
            id="description"
            placeholder="Descrivi brevemente la tua attività e i prodotti/servizi offerti"
            value={description}
            onChange={(e) => onChange("description", e.target.value)}
            required
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Indirizzo <span className="text-red-500">*</span></Label>
          <Input
            id="address"
            placeholder="Es. Via Roma 123, Milano"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            required
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        
        <div className="space-y-2">
          <Label>Posizione Geografica</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={onGetLocation}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Usa Posizione Attuale
              </Button>
            </div>
            <div className="space-y-1">
              <Label htmlFor="latitude" className="text-xs">Latitudine</Label>
              <Input
                id="latitude"
                placeholder="Es. 45.4642"
                value={latitude || ""}
                onChange={(e) => onChange("latitude", parseFloat(e.target.value) || 0)}
                type="number"
                step="0.000001"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="longitude" className="text-xs">Longitudine</Label>
              <Input
                id="longitude"
                placeholder="Es. 9.1900"
                value={longitude || ""}
                onChange={(e) => onChange("longitude", parseFloat(e.target.value) || 0)}
                type="number"
                step="0.000001"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefono <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              placeholder="Es. +39 02 1234567"
              value={phone}
              onChange={(e) => onChange("phone", e.target.value)}
              required
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={currentUserEmail}
              disabled
              className="bg-gray-100"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fiscalCode">Codice Fiscale <span className="text-red-500">*</span></Label>
            <Input
              id="fiscalCode"
              placeholder="Es. RSSMRA80A01H501U"
              value={fiscalCode}
              onChange={(e) => onChange("fiscalCode", e.target.value)}
              required
              className={errors.fiscalCode ? "border-red-500" : ""}
            />
            {errors.fiscalCode && <p className="text-red-500 text-sm">{errors.fiscalCode}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vatNumber">Partita IVA <span className="text-red-500">*</span></Label>
            <Input
              id="vatNumber"
              placeholder="Es. 12345678901"
              value={vatNumber}
              onChange={(e) => onChange("vatNumber", e.target.value)}
              required
              className={errors.vatNumber ? "border-red-500" : ""}
            />
            {errors.vatNumber && <p className="text-red-500 text-sm">{errors.vatNumber}</p>}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Converti in Account Negozio
        </Button>
      </div>
    </form>
  );
};
