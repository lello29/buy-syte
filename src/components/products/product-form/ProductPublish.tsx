
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Wand, Save, Copy, Star } from "lucide-react";
import { toast } from "sonner";

interface ProductPublishProps {
  data: any;
  updateData: (data: any) => void;
  onSubmit: () => void;
  isMobile?: boolean;
}

const ProductPublish: React.FC<ProductPublishProps> = ({ data, updateData, onSubmit }) => {
  const [useAISeo, setUseAISeo] = useState(false);
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false);
  const [seoData, setSeoData] = useState({
    keywords: data.seo?.keywords || [],
    optimizedTitle: data.seo?.optimizedTitle || data.name || ""
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [isActive, setIsActive] = useState(data.isActive ?? true);
  const [featured, setFeatured] = useState(data.featured ?? false);
  const [discountPrice, setDiscountPrice] = useState(data.discountPrice ?? "");

  const updateSeoData = (newSeoData: any) => {
    const updated = { ...seoData, ...newSeoData };
    setSeoData(updated);
    updateData({ seo: updated });
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    
    const newKeywords = [...seoData.keywords, keywordInput.trim()];
    updateSeoData({ keywords: newKeywords });
    setKeywordInput("");
  };

  const removeKeyword = (index: number) => {
    const newKeywords = [...seoData.keywords];
    newKeywords.splice(index, 1);
    updateSeoData({ keywords: newKeywords });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const generateSeoData = async () => {
    setIsGeneratingSeo(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedSeo = {
        optimizedTitle: `${data.name} - ${data.category} di Qualità Premium`,
        keywords: [
          data.category,
          "qualità premium",
          "miglior prezzo",
          "vendita online",
          data.name.toLowerCase(),
        ]
      };
      
      updateSeoData(generatedSeo);
      toast.success("SEO ottimizzato con AI");
    } catch (error) {
      toast.error("Errore nella generazione SEO");
    } finally {
      setIsGeneratingSeo(false);
    }
  };

  const handleDuplicateProduct = () => {
    toast.info("Funzione di duplicazione prodotto in fase di sviluppo");
  };

  const toggleIsActive = (checked: boolean) => {
    setIsActive(checked);
    updateData({ isActive: checked });
  };

  const toggleFeatured = (checked: boolean) => {
    setFeatured(checked);
    updateData({ featured: checked });
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : "";
    setDiscountPrice(value);
    updateData({ discountPrice: value });
  };

  // Calculate SEO score based on completeness of product data
  const calculateSeoScore = () => {
    let score = 0;
    
    // Basic info checks
    if (data.name && data.name.length >= 5) score += 20;
    if (data.description && data.description.length >= 50) score += 20;
    if (data.category) score += 10;
    
    // Images check
    if (data.images && data.images.length > 0) score += 20;
    if (data.images && data.images.length >= 3) score += 10;
    
    // SEO checks
    if (seoData.keywords.length >= 3) score += 10;
    if (seoData.optimizedTitle && seoData.optimizedTitle.length >= 10) score += 10;
    
    return score;
  };
  
  const seoScore = calculateSeoScore();
  
  const getSeoScoreColor = () => {
    if (seoScore >= 80) return "bg-green-500";
    if (seoScore >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Riepilogo e pubblicazione</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Stato pubblicazione</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="product-active">Prodotto attivo</Label>
                <p className="text-sm text-muted-foreground">
                  Il prodotto sarà visibile sul sito
                </p>
              </div>
              <Switch
                id="product-active"
                checked={isActive}
                onCheckedChange={toggleIsActive}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="product-featured">Prodotto in evidenza</Label>
                <p className="text-sm text-muted-foreground">
                  Mostra in homepage e sezioni speciali
                </p>
              </div>
              <Switch
                id="product-featured"
                checked={featured}
                onCheckedChange={toggleFeatured}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Prezzo e offerte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Prezzo base</Label>
                <p className="font-medium">{data.price ? `€${data.price}` : "Non impostato"}</p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="discount-price">Prezzo scontato (opzionale)</Label>
                <Input
                  id="discount-price"
                  type="number"
                  step="0.01"
                  placeholder="Inserisci prezzo scontato"
                  value={discountPrice}
                  onChange={handleDiscountChange}
                />
              </div>
              
              {data.price && discountPrice && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground">Sconto</span>
                  <Badge variant={Number(discountPrice) < data.price ? "default" : "destructive"}>
                    {Number(discountPrice) < data.price 
                      ? `-${Math.round(100 - (Number(discountPrice) * 100 / data.price))}%` 
                      : "Nessuno sconto"}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Ottimizzazione SEO</CardTitle>
            <div className="flex items-center space-x-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${getSeoScoreColor()}`}>
                {seoScore}
              </div>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <CardDescription>
            Migliora la visibilità del prodotto nei motori di ricerca
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">Usa AI per SEO</span>
            <Switch
              checked={useAISeo}
              onCheckedChange={setUseAISeo}
            />
          </div>

          {useAISeo && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={generateSeoData}
              disabled={isGeneratingSeo}
            >
              <Wand className="mr-2 h-4 w-4" />
              {isGeneratingSeo ? "Generazione in corso..." : "Ottimizza SEO con AI"}
            </Button>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="seo-title">Titolo SEO</Label>
              <Input
                id="seo-title"
                placeholder="Titolo ottimizzato per i motori di ricerca"
                value={seoData.optimizedTitle}
                onChange={(e) => updateSeoData({ optimizedTitle: e.target.value })}
              />
            </div>

            <div>
              <Label>Parole chiave</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {seoData.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-muted" onClick={() => removeKeyword(index)}>
                    {keyword} &times;
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Aggiungi parola chiave"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" onClick={addKeyword}>
                  Aggiungi
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Azioni</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button onClick={handleDuplicateProduct} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" />
              Duplica prodotto
            </Button>
            <Button onClick={onSubmit} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Salva prodotto
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Riepilogo prodotto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {isActive && <Badge variant="outline" className="bg-green-50">Attivo</Badge>}
              {!isActive && <Badge variant="outline" className="bg-red-50 text-red-700">Inattivo</Badge>}
              {featured && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  <Star className="h-3 w-3 mr-1" />
                  In evidenza
                </Badge>
              )}
              {data.publicationDate && (
                <Badge variant="outline">
                  Pubblicazione programmata
                </Badge>
              )}
              {data.category && (
                <Badge variant="secondary">{data.category}</Badge>
              )}
            </div>

            <h3 className="text-lg font-medium">{data.name || "Nome prodotto"}</h3>
            
            <div className="flex items-end gap-2">
              {discountPrice ? (
                <>
                  <span className="text-xl font-bold">€{discountPrice}</span>
                  <span className="text-muted-foreground line-through">€{data.price}</span>
                </>
              ) : (
                <span className="text-xl font-bold">€{data.price || "0.00"}</span>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {data.description || "Nessuna descrizione"}
            </p>

            <Separator className="my-2" />

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantità:</span>
              <span>{data.inventory || "0"} pezzi</span>
            </div>

            {data.variants && data.variants.length > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Varianti:</span>
                <span>{data.variants.length} tipi</span>
              </div>
            )}

            {data.images && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Immagini:</span>
                <span>{data.images.length} / 10</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPublish;
