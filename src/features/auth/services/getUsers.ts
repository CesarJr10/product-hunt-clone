import { instance } from "../../../core/api/api";

export const getUsers = async () => {
    try {
      const response = await instance.get('/users');
      return response.data;  
    } catch (error) {
      throw new Error('Error obteniendo usuarios');
    }
};
