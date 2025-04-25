'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContexts';
import { Product } from '@/data/products';

const PageWrapper = styled.div`
  background-color: #f0f0f5;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

const Container = styled.div<{ isEmpty: boolean }>`
  max-width: 1440px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: ${({ isEmpty }) => (isEmpty ? 'column' : 'row')};
  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'space-between')};
  align-items: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')};
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const ProductsSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: row; 
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  align-items: center; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: row;  
    padding: 1rem;
    gap: 1rem; 
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;


const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #41414d;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Price = styled.span`
  color: #41414D;
  font-weight: bold;
  font-size: 1rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #41414D;

  span {
    font-size: 0.95rem;
    font-weight: 500;
    color: #41414D;
  }
`;

const ControlButton = styled.button`
  background: #e0e0e0;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #d5d5d5;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #de3838;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const SummarySection = styled.div`
  flex: 1;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: fit-content;
  color: #41414D;

  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const SummaryTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #41414D;

  /* Responsividade para telas menores */
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const Total = styled.strong`
  font-size: 1.25rem;
  color: #09090a;
`;

const CheckoutButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 1rem;
  background: ${({ disabled }) => (disabled ? '#9ed6a0' : '#51b853')};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#9ed6a0' : '#4aa24b')};
  }
`;

const HelpLinks = styled.div`
  margin-top: 2.5rem;
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

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;

  p {
    font-size: 2rem;
    color: #41414d;
    margin-bottom: 2rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #115d8c;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #0d4c74;
    }
  }
`;

type CartItem = Product & { quantity: number };

export default function CartPage() {
  const { cart, updateCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, [cart]);

  const changeQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    updateCart(updated);
    setCartItems(updated);
  };

  const handleRemove = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCart(updated);
    setCartItems(updated);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateCart([]);
    localStorage.removeItem('cart');
    alert('Compra finalizada com sucesso!');
    window.location.href = '/';
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 40;
  const total = subtotal + delivery;

  return (
    <PageWrapper>
      <Header />
      <Container isEmpty={cartItems.length === 0}>
        {cartItems.length === 0 ? (
          <EmptyCartMessage>
            <p>Seu carrinho está vazio</p>
            <Link href="/">
              <button>Ir para as compras</button>
            </Link>
          </EmptyCartMessage>
        ) : (
          <>
            <ProductsSection>
              {cartItems.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImage src={product.image} alt={product.title} />
                  <ProductInfo>
                    <Title>{product.title}</Title>
                    <Price>R$ {(product.price * product.quantity).toFixed(2)}</Price>
                    <Controls>
                      <ControlButton onClick={() => changeQuantity(product.id, -1)}>-</ControlButton>
                      <span>{product.quantity}</span>
                      <ControlButton onClick={() => changeQuantity(product.id, 1)}>+</ControlButton>
                    </Controls>
                  </ProductInfo>
                  <RemoveButton onClick={() => handleRemove(product.id)}>Remover</RemoveButton>
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

              <CheckoutButton onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? 'Finalizando compra...' : 'Finalizar a compra'}
              </CheckoutButton>

              <HelpLinks>
                <a href="#">Ajuda</a>
                <a href="#">Reembolsos</a>
                <a href="#">Entregas e frete</a>
                <a href="#">Trocas e devoluções</a>
              </HelpLinks>
            </SummarySection>
          </>
        )}
      </Container>
    </PageWrapper>
  );
}
