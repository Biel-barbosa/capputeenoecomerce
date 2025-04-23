// src/components/CartItem.tsx
import React from 'react';
import { Product } from '../contexts/CartContext'; // Certifique-se de importar o tipo 'Product'

interface CartItemProps {
    product: Product;
    onRemove: (id: string) => void;
    onIncrease: (product: Product) => void;
    onDecrease: (product: Product) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onRemove, onIncrease, onDecrease }) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-300">
            <div className="flex items-center">
                <img src={product.image} alt={product.title} className="w-24 h-24 object-cover mr-4" />
                <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">{product.price}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={() => onIncrease(product)} className="px-2 py-1 bg-blue-500 text-white rounded">+</button>
                <button onClick={() => onDecrease(product)} className="px-2 py-1 bg-blue-500 text-white rounded">-</button>
                <button onClick={() => onRemove(product.id)} className="px-4 py-1 bg-red-500 text-white rounded">Remover</button>
            </div>
        </div>
    );
};

export default CartItem;
