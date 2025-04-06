
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getShopById, getProductsByShopId } from "@/data/mockData";
import { 
  MapPin, Phone, Mail, Clock, ExternalLink, 
  ChevronLeft, Instagram, Facebook, Twitter,
  Briefcase, CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ShopDetailPage = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [activeTab, setActiveTab] = useState("products");
  
  if (!shopId) {
    return <div className="p-6">Shop ID not found</div>;
  }
  
  const shop = getShopById(shopId);
  
  if (!shop) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Negozio non trovato</h2>
        <p className="mb-6">Il negozio che stai cercando non esiste o è stato rimosso.</p>
        <Link to="/shops">
          <Button>Torna alla lista dei negozi</Button>
        </Link>
      </div>
    );
  }
  
  const products = getProductsByShopId(shopId);
  
  const handleContact = () => {
    toast.success(`Email inviata a ${shop.email}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/shops" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Torna alla lista dei negozi
        </Link>
      </div>
      
      {/* Shop Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600">
          {shop.bannerImage && (
            <img 
              src={shop.bannerImage} 
              alt={`Banner di ${shop.name}`} 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-white shadow-md overflow-hidden border-4 border-white -mt-12 md:-mt-16 flex items-center justify-center">
              {shop.logoImage ? (
                <img 
                  src={shop.logoImage} 
                  alt={`Logo di ${shop.name}`}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                  {shop.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{shop.name}</h1>
                  <p className="text-muted-foreground">{shop.description}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button onClick={handleContact}>Contatta</Button>
                  {shop.websiteUrl && (
                    <Button variant="outline" asChild>
                      <a href={shop.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Sito Web
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shop Info & Content Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Sidebar with Shop Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Informazioni</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mr-3 mt-0.5" />
                  <span>{shop.address}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
                  <span>{shop.phone}</span>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
                  <span>{shop.email}</span>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
                  <span>P.IVA: {shop.vatNumber}</span>
                </div>
                
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
                  <span>C.F.: {shop.fiscalCode}</span>
                </div>
                
                {shop.openingHours && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-muted-foreground shrink-0 mr-3 mt-0.5" />
                    <div className="space-y-1">
                      {shop.openingHours.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Social Media Links */}
              {shop.socialLinks && (
                <>
                  <Separator className="my-4" />
                  <div className="flex items-center space-x-3">
                    {shop.socialLinks.instagram && (
                      <a href={shop.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {shop.socialLinks.facebook && (
                      <a href={shop.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {shop.socialLinks.twitter && (
                      <a href={shop.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Categories or tags */}
          {shop.categories && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Categorie</h3>
                <div className="flex flex-wrap gap-2">
                  {shop.categories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Main Content Area with Tabs */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Prodotti ({products.length})</TabsTrigger>
              <TabsTrigger value="about">Chi siamo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-6">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-square bg-gray-100">
                        <img 
                          src={product.images[0] || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {product.description}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="font-bold">
                            {product.discountPrice ? (
                              <div className="flex flex-col">
                                <span className="text-primary">€{product.discountPrice.toFixed(2)}</span>
                                <span className="text-xs text-muted-foreground line-through">
                                  €{product.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              `€${product.price.toFixed(2)}`
                            )}
                          </span>
                          
                          {product.inventory > 0 ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Disponibile
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              Esaurito
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nessun prodotto disponibile al momento.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              {shop.aboutUs ? (
                <div className="prose prose-sm max-w-none">
                  {shop.aboutUs.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nessuna informazione disponibile.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailPage;
