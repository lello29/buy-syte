
import React from "react";
import SellingOptionsCard from "./SellingOptionsCard";
import LocationCard from "./LocationCard";

interface SellingOptionsTabProps {
  sellingOptions: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  updateSellingOptions: (newOptions: any) => void;
  location: string;
  handleLocationChange: (value: string) => void;
}

const SellingOptionsTab: React.FC<SellingOptionsTabProps> = ({
  sellingOptions,
  updateSellingOptions,
  location,
  handleLocationChange
}) => {
  return (
    <>
      <SellingOptionsCard 
        sellingOptions={sellingOptions} 
        updateSellingOptions={updateSellingOptions} 
      />
      <LocationCard 
        location={location} 
        handleLocationChange={handleLocationChange} 
      />
    </>
  );
};

export default SellingOptionsTab;
