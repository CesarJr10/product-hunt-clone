import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../shared/context/authContext';
import { ProductProvider } from '../features/products/context/productContext';
import RoutesConfig from './routing/routes';

export const MainContainer:React.FC = () => {
    return(
        <AuthProvider>
            <ProductProvider>
                <Router>
                    <RoutesConfig />
                </Router>
            </ProductProvider>
        </AuthProvider>

    )
}