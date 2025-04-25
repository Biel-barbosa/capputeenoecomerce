'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Product = {
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const storedCart = localStorage.getItem('cart');
                if (storedCart) {
                    const parsedCart = JSON.parse(storedCart);
                    if (Array.isArray(parsedCart)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const normalizedCart = parsedCart.map((item: any) => ({
                            ...item,
                            price: Number(item.price),
                        }));
                        setCart(normalizedCart);
                        setCartItemCount(normalizedCart.length);
                    } else {
                        console.error('localStorage contém dados inválidos para o carrinho');
                        setCart([]);
                        setCartItemCount(0);
                    }
                }
            } catch (error) {
                console.error('Erro ao parsear o localStorage:', error);
                setCart([]);
                setCartItemCount(0);
            }
        }
    }, []);

    const addToCart = (product: Product) => {
        console.log("Produto recebido no addToCart:", product);

        const price = Number(product.price);
        if (isNaN(price)) {
            console.error('Preço inválido ao adicionar ao carrinho:', product.price);
            return;
        }

        const productWithNumericPrice: Product = {
            ...product,
            price,
        };

        const updatedCart = [...cart, productWithNumericPrice];
        setCart(updatedCart);

        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } catch (error) {
                console.error('Erro ao salvar no localStorage:', error);
            }
        }

        setCartItemCount(updatedCart.length);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);

        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } catch (error) {
                console.error('Erro ao salvar no localStorage:', error);
            }
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
