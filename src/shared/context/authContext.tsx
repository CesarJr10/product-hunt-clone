import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../../features/auth/interfaces/user';
import { AuthContextType } from '../../features/auth/interfaces/authContextType';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); 

  useEffect (() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (userData: { token: string; id: string; name: string; avatar?: string }) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('info', userData.name);
    setUser({ id: userData.id, name: userData.name, avatar: userData.avatar || '' }); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('info');  
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};