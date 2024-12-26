import { User } from "./user";

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;  
    login: (userData: { token: string; id: string; name: string; avatar?: string }) => void; 
    logout: () => void;
  }