
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchSection from "@/components/home/SearchSection";
import PromotedShopsSection from "@/components/home/PromotedShopsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import { shops, products } from "@/data/mockData";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  
  // Filter shops that have active promotions (for demo purposes we'll consider shops with id < 3 as having active promotions)
  const promotedShops = shops.filter(shop => parseInt(shop.id) < 3);

  return (
    <>
      <Navbar />
      <div className="pt-16">
        {/* Search Section */}
        <SearchSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
        />

        {/* Promoted Shops Section */}
        <PromotedShopsSection shops={promotedShops} />

        {/* Features Section */}
        <FeaturesSection />

        {/* Featured Products Section */}
        <FeaturedProductsSection products={products} />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
