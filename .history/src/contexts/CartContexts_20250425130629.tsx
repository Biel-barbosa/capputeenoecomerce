'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => {
            const itemPrice = Number(item.price);
            return !isNaN(itemPrice) ? acc + itemPrice : acc;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const delivery = 40;
    const total = subtotal + delivery;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>

            {cart.length === 0 ? (
                <p>O carrinho está vazio.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex items-center justify-between p-4 border rounded">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h2 className="text-lg font-medium">{item.title}</h2>
                                    <p className="text-gray-600">
                                        {isNaN(item.price) ? 'Preço inválido' : `R$ ${item.price.toFixed(2)}`}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:underline"
                            >
                                Remover
                            </button>
                        </div>
                    ))}

                    <div className="mt-8 p-4 border-t">
                        <p className="text-lg">Subtotal: <strong>R$ {subtotal.toFixed(2)}</strong></p>
                        <p className="text-lg">Entrega: <strong>R$ {delivery.toFixed(2)}</strong></p>
                        <p className="text-xl mt-2">Total: <strong>R$ {total.toFixed(2)}</strong></p>

                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
