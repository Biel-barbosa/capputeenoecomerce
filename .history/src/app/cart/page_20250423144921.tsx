'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import { Product } from '@/data/products';

type CartItem = Product & { quantity: number };

const PageWrapper = styled.div`
  background-color: #f0f0f5;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 2rem auto;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SummarySection = styled.div`
  flex: 1;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const ProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ControlButton = styled.button`
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const Price = styled.span`
  color: #737380;
  font-weight: bold;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SummaryTitle = styled.h2`
  margin-bottom: 2rem;
`;

const Total = styled.strong`
  font-size: 1.2rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #115d8c;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-top: 2rem;
  cursor: pointer;

  &:hover {
    background: #0d4c74;
  }
`;

const HelpLinks = styled.div`
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #737380;

  a {
    display: block;
    margin-top: 0.5rem;
    color: #737380;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      );
    updateLocalStorage(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 40;
  const total = subtotal + delivery;

  return (
    <PageWrapper>
      <Header />
      <Container>
        <ProductsSection>
          {cart.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <Title>{product.title}</Title>
                <Price>R$ {(product.price * product.quantity).toFixed(2)}</Price>
                <Controls>
                  <ControlButton onClick={() => decreaseQuantity(product.id)}>-</ControlButton>
                  <span>{product.quantity}</span>
                  <ControlButton onClick={() => increaseQuantity(product.id)}>+</ControlButton>
                </Controls>
              </ProductInfo>
              <RemoveButton onClick={() => removeItem(product.id)}>Remover</RemoveButton>
            </ProductCard>
          ))}
        </ProductsSection>

        <SummarySection>
          <SummaryTitle>Resumo do pedido</SummaryTitle>
          <SummaryItem>
            <span>Subtotal de produtos</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Entrega</span>
            <span>R$ {delivery.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Total</span>
            <Total>R$ {total.toFixed(2)}</Total>
          </SummaryItem>

          <CheckoutButton>Finalizar a compra</CheckoutButton>

          <HelpLinks>
            <a href="#">Ajuda</a>
            <a href="#">Reembolsos</a>
            <a href="#">Entregas e frete</a>
            <a href="#">Trocas e devoluções</a>
          </HelpLinks>
        </SummarySection>
      </Container>
    </PageWrapper>
  );
}
