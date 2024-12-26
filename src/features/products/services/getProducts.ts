import { instance } from "../../../core/api/api";
export const getProducts = async () => {
    try {
        const response = await instance.get("/products");
        return response.data;
    } catch (error) {
        throw new Error("error obteniendo productos");
    }  
};