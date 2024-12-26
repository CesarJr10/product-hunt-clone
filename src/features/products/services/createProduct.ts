import { instance } from "../../../core/api/api";

export const createProduct = async (newProduct: any) => {
  try {
    const response = await instance.post("/products", newProduct);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
};
