
import React from "react";
import { Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import DashboardRoutes from "./DashboardRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <PublicRoutes />
      <DashboardRoutes />
    </Routes>
  );
};

export default AppRoutes;
