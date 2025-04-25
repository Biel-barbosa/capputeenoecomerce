// app/cart/page.tsx

'use client';

import { useCart } from '@/contexts/CartContexts';
import styled from 'styled-components';
import Header from '@/components/Header';
import Link from 'next/link';

// ... (estilos iguais)

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 40;
  const total = subtotal + delivery;

  return (
    <PageWrapper>
      <Header />
      <Container isEmpty={cart.length === 0}>
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
                  <RemoveButton onClick={() => removeFromCart(product.id)}>Remover</RemoveButton>
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
