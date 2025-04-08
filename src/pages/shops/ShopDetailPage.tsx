
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShopById, getProductsByShopId } from '@/data/mockData';
import { Shop, Product } from '@/types';

const ShopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch shop data
      const shopData = getShopById(id);
      setShop(shopData || null);
      
      // Fetch products for this shop
      const shopProducts = getProductsByShopId(id);
      setProducts(shopProducts);
      
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!shop) {
    return <div>Negozio non trovato</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-200 relative">
          {shop.bannerImage ? (
            <img 
              src={shop.bannerImage} 
              alt={`${shop.name} banner`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-gray-500">Banner non disponibile</span>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h1 className="text-3xl font-bold text-white">{shop.name}</h1>
            <p className="text-white/80">{shop.category}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
            <div className="md:w-7/12">
              <h2 className="text-xl font-semibold mb-3">Informazioni</h2>
              <p className="text-gray-600 mb-4">{shop.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Indirizzo:</span> {shop.address}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Telefono:</span> {shop.phone}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {shop.email}
                </p>
                {shop.websiteUrl && (
                  <p className="text-sm">
                    <span className="font-medium">Sito web:</span>{" "}
                    <a href={shop.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {shop.websiteUrl}
                    </a>
                  </p>
                )}
                {shop.openingHours && (
                  <p className="text-sm">
                    <span className="font-medium">Orari:</span> {shop.openingHours}
                  </p>
                )}
              </div>
            </div>
            
            <div className="md:w-4/12 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Contatti</h2>
              <form className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="La tua email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Messaggio
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Scrivi qui il tuo messaggio..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
                >
                  Invia messaggio
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">I nostri prodotti</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm">
                    <div className="h-48 bg-gray-100">
                      {product.images && product.images[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">Immagine non disponibile</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold">€{product.discountPrice.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">€{product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <button className="bg-primary text-white px-3 py-1 text-sm rounded-md hover:bg-primary/90">
                          Acquista
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                Nessun prodotto disponibile al momento
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailPage;
