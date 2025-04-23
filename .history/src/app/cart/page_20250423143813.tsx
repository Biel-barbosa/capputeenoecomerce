'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Product } from '@/data/products';

const Container = styled.div`
  display: flex;
  padding: 2rem 14rem;
  background-color: #f0f0f5;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Right = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
`;

const CartItem = styled.div`
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  gap: 1rem;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 1rem;
  background: #FFA585;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
`;

const HelpLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #737380;
`;

export default function CartPage() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const shipping = 40;
    const total = subtotal + shipping;

    return (
        <Container>
            <Left>
                {cartItems.map((item) => (
                    <CartItem key={item.id}>
                        <ProductImage src={item.image} alt={item.title} />
                        <Info>
                            <div>
                                <strong>{item.title}</strong>
                                <p>R$ {item.price.toFixed(2)}</p>
                            </div>
                        </Info>
                    </CartItem>
                ))}
            </Left>

            <Right>
                <h2>Resumo do pedido</h2>
                <SummaryItem>
                    <span>Subtotal de produtos</span>
                    <strong>R$ {subtotal.toFixed(2)}</strong>
                </SummaryItem>
                <SummaryItem>
                    <span>Entrega</span>
                    <strong>R$ {shipping.toFixed(2)}</strong>
                </SummaryItem>
                <SummaryItem>
                    <span>Total</span>
                    <strong>R$ {total.toFixed(2)}</strong>
                </SummaryItem>
                <Button>Finalizar a compra</Button>

                <HelpLinks>
                    <span>Ajuda</span>
                    <span>reembolsos</span>
                    <span>entregas e frete</span>
                    <span>trocas e devoluções</span>
                </HelpLinks>
            </Right>
        </Container>
    );
}
