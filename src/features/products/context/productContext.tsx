import { createContext, useState, useContext, ReactNode } from 'react';
import { ProductContextType } from '../interfaces/productContextType';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct debe ser utilizado dentro de ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  return (
    <ProductContext.Provider value={{ searchTerm, setSearchTerm, category, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
};