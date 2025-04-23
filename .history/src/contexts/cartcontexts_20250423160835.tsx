'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    const [cart, setCart] = useState<Product[]>([]);
    const [cartItemCount, setCartItemCount] = useState<number>(0);

    // Verificar se estamos no lado do cliente antes de acessar localStorage
    useEffect(() => {
        // Só tenta acessar o localStorage no lado do cliente
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            try {
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    // Verifique se parsedCart é um array válido
                    if (Array.isArray(parsedCart)) {
                        setCart(parsedCart);
                        setCartItemCount(parsedCart.length);
                    }
                }
            } catch (error) {
                console.error('Erro ao parsear o localStorage', error);
                setCart([]);
                setCartItemCount(0);
            }
        }
    }, []); // O useEffect será executado apenas uma vez, quando o componente for montado

    const addToCart = (product: Product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
        setCartItemCount(updatedCart.length);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
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

export { CartContext };
