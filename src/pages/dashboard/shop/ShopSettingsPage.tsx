
import React from "react";
import ShopAuthCheck from "@/pages/dashboard/shop/components/ShopAuthCheck";
import ShopSettingsContainer from "./settings/ShopSettingsContainer";

const ShopSettingsPage: React.FC = () => {
  return (
    <ShopAuthCheck>
      <ShopSettingsContainer />
    </ShopAuthCheck>
  );
};

export default ShopSettingsPage;
