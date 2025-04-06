
import React from "react";
import SellingOptionsCard from "./SellingOptionsCard";
import LocationCard from "./LocationCard";

interface SellingOptionsTabProps {
  sellingOptions: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  updateSellingOptions: (options: Partial<{
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  }>) => void;
  location: string;
  handleLocationChange: (value: string) => void;
}

const SellingOptionsTab: React.FC<SellingOptionsTabProps> = ({
  sellingOptions,
  updateSellingOptions,
  location,
  handleLocationChange,
}) => {
  return (
    <div className="space-y-4">
      <SellingOptionsCard 
        sellingOptions={sellingOptions}
        updateSellingOptions={updateSellingOptions}
      />
      
      <LocationCard 
        location={location}
        handleLocationChange={handleLocationChange}
      />
    </div>
  );
};

export default SellingOptionsTab;
