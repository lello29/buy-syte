
import React from "react";
import ShopAuthCheck from "../customers/components/ShopAuthCheck";
import ShopSettingsContainer from "./settings/ShopSettingsContainer";

const ShopSettingsPage: React.FC = () => {
  return (
    <ShopAuthCheck>
      <ShopSettingsContainer />
    </ShopAuthCheck>
  );
};

export default ShopSettingsPage;
