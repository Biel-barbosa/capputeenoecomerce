// utils/cart.ts
import { Product } from '@/data/products';

export function addToCart(product: Product) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];
  const exists = cart.find((item) => item.id === product.id);

  if (!exists) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
