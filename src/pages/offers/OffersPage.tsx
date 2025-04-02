
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const OffersPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 pt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Offerte Speciali</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scopri le offerte speciali dai negozi nella tua zona. Approfitta di sconti e promozioni esclusive.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Nessuna offerta disponibile al momento.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OffersPage;
