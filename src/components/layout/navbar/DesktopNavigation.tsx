
import React from "react";
import { Link } from "react-router-dom";

const DesktopNavigation = () => {
  return (
    <div className="hidden md:flex space-x-4">
      <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
      <Link to="/shops" className="text-gray-600 hover:text-primary">Negozi</Link>
      <Link to="/offers" className="text-gray-600 hover:text-primary">Offerte</Link>
    </div>
  );
};

export default DesktopNavigation;
