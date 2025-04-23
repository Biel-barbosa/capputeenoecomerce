import React, { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
};

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateCartItemCount: () => void;
    cartItemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>(JSON.parse(localStorage.getItem('cart') || '[]'));
    const [cartItemCount, setCartItemCount] = useState<number>(cart.length);

    const addToCart = (product: Product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItemCount(updatedCart.length);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItemCount(updatedCart.length);
    };

    const updateCartItemCount = () => {
        setCartItemCount(cart.length);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemCount, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
