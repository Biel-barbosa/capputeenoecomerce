'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export type CartItem = Product & { quantity: number };

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateCart: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            setCart(JSON.parse(stored));
        }
    }, []);

    const saveCart = (items: CartItem[]) => {
        setCart(items);
        localStorage.setItem('cart', JSON.stringify(items));
    };

    const addToCart = (product: Product) => {
        const existing = cart.find(item => item.id === product.id);

        let updatedCart: CartItem[];

        if (existing) {
            updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        saveCart(updatedCart);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        saveCart(updatedCart);
    };

    const updateCart = (items: CartItem[]) => {
        saveCart(items);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>
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
