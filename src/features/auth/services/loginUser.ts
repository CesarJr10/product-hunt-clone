import { instance } from "../../../core/api/api";

export const LoginUser = async (email: string, password: string) => {
    try {
        const response = await instance.get('/users',{
            params:{
                email, 
                password
            }
        });

        const users = response.data;
        if (users.length === 0) {
            throw new Error('Credenciales incorrectas');
        }

        const user = users[0]; 
        const token = 'my_token';

        return {
            token,
            id: user.id,
            name: user.name
        };

    } catch (error) {
        throw new Error('Error al iniciar sesión');
    }
}

