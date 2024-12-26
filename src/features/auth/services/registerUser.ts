import { instance } from "../../../core/api/api";
import { User } from "../interfaces/user";


export const registerUser = async (user: User) => {
    try {
      const response = await instance.post('/users', user);
      return response.data;
    } catch (error) {
      throw new Error('Error registrando usuario');
    }
};

export const generateAvatarUrl = (name: string): string => {
  const color = '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
  return `https://via.placeholder.com/150/${color.slice(1)}/000000?text=${initials}`;
};
