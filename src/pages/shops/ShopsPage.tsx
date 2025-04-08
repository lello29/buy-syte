
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shops, mockShops, getShopById } from '@/data/mockData';
import { Shop } from '@/types';

const ShopsPage: React.FC = () => {
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Extract unique categories from shops
  const categories = Array.from(
    new Set(allShops.map(shop => shop.category).filter(Boolean) as string[])
  );

  useEffect(() => {
    // In a real app, fetch shops from API
    setAllShops(shops);
    setFilteredShops(shops);
    setLoading(false);
  }, []);
  
  useEffect(() => {
    // Filter shops based on search term and category
    let result = [...allShops];
    
    if (searchTerm) {
      result = result.filter(shop => 
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        shop.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(shop => shop.category === selectedCategory);
    }
    
    setFilteredShops(result);
  }, [searchTerm, selectedCategory, allShops]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Esplora i negozi</h1>
      
      <div className="mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Cerca negozi..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select 
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map(shop => (
            <Link 
              key={shop.id}
              to={`/shops/${shop.id}`}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-200 relative">
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
                
                {shop.category && (
                  <span className="absolute top-2 right-2 bg-white/80 px-2 py-1 text-xs font-medium rounded">
                    {shop.category}
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                    {shop.logoImage ? (
                      <img 
                        src={shop.logoImage} 
                        alt={`${shop.name} logo`} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-xs text-gray-400">Logo</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold">{shop.name}</h3>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{shop.description}</p>
                
                <div className="text-sm text-gray-500">
                  <p>{shop.address}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">Nessun negozio trovato</p>
          <p className="text-gray-400 mt-2">Prova con un'altra ricerca</p>
        </div>
      )}
    </div>
  );
};

export default ShopsPage;
