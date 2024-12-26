import { Product } from "./product";

export interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    product: Product;
    isAuthenticated: boolean;
  }