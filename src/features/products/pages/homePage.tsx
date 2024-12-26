import React from "react";
import CustomNavbar from "../../../shared/components/navbar";
import ProductList from "../components/productList";

const HomePage: React.FC = () => {

  return (
    <div>
      <CustomNavbar />
      <ProductList />
    </div>
  );
};

export default HomePage;
