'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header';
import { Product } from '@/data/products';
import Link from 'next/link';

type CartItem = Product & { quantity: number };

const PageWrapper = styled.div`
  background-color: #f0f0f5;
  min-height: 100vh;
`;

const Container = styled.div<{ isEmpty: boolean }>`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: ${({ isEmpty }) => (isEmpty ? 'column' : 'row')}; /* Coluna quando vazio, linha quando tem itens */
  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'space-between')}; /* Alinhar ao centro quando vazio */
  align-items: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')}; /* Alinhar ao centro quando vazio */
  gap: 2rem;
  height: 100vh; /* Ocupa toda a altura da tela */
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

// Novo estilo para a mensagem de carrinho vazio
const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column; /* Garantir que seja apenas uma coluna */
  justify-content: center;
  align-items: center;
  height: 100vh; /* Garantir que ocupe toda a altura da tela */
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

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar o carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Atualizar o localStorage e o estado do carrinho
  const updateLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Aumentar a quantidade de um produto
  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updatedCart);
  };

  // Diminuir a quantidade de um produto
  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      );
    updateLocalStorage(updatedCart);
  };

  // Remover um produto do carrinho
  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  // Calcular subtotal, entrega e total
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 40; // Custo fixo de entrega
  const total = subtotal + delivery;

  return (
    <PageWrapper>
      <Header />
      <Container isEmpty={cart.length === 0}> {/* Passando isEmpty como prop */}
        {cart.length === 0 ? (
          <EmptyCartMessage>
            <p>Seu carrinho está vazio</p>
            <Link href="/" passHref>
              <button>Ir para as compras</button>
            </Link>
          </EmptyCartMessage>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </PageWrapper>
  );
}
