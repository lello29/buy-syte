
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
}

const SearchSection = ({ searchTerm, setSearchTerm, location, setLocation }: SearchSectionProps) => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Cerca il tuo prodotto vicino a te
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Cosa stai cercando?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg w-full"
              />
            </div>
            <div className="relative md:w-1/3">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Località (opzionale)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 py-6 text-lg w-full"
              />
            </div>
            <Button size="lg" className="text-lg px-8 py-6">
              Cerca
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
