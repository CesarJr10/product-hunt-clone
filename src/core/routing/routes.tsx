import React from "react";
import { useAuth } from "../../shared/context/authContext";

import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../../features/products/pages/homePage";
import CreateProductPage from "../../features/products/pages/createProductPage";
import LoginPage from "../../features/auth/pages/loginPage";
import RegisterPage from "../../features/auth/pages/registerPage";

const RoutesConfig: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/createProduct"
        element={
          isAuthenticated ? <CreateProductPage /> : <Navigate to={"/login"} />
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default RoutesConfig;
