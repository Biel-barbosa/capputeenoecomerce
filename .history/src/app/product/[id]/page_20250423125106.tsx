'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { products, Product } from '@/data/products';
import Header from '@/components/Header'

const Container = styled.div`
  max-width: 1440px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Image = styled.img`
  width: 640px;
  max-width: 100%;
  object-fit: cover;
  border-radius: 8px;
  background: #f3f3f3;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
`;

const Description = styled.p`
  margin-top: 1.5rem;
  color: #737380;
  line-height: 1.6;
`;

const Price = styled.strong`
  font-size: 1.5rem;
  color: #09090a;
  margin-top: 1rem;
`;

const Freight = styled.span`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #737380;
`;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  background-color: #115d8c;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #0d4c74;
  }
`;

export default function ProductDetailPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : '';
    const product = products.find((p: Product) => p.id === id);

    if (!product) return <div>Produto não encontrado.</div>;

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = [...cart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Produto adicionado ao carrinho!');
    };

    return (
        <Container>
            <Header/>
            <Image src={product.image} alt={product.title} />
            <Info>
                <Title>{product.title}</Title>
                <span>{product.category}</span>
                <Price>R$ {product.price.toFixed(2)}</Price>
                <Freight>
                    *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$900,00.
                </Freight>
                <Description>
                    Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo
                    para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.
                </Description>
                <Button onClick={handleAddToCart}>
                    Adicionar ao carrinho
                </Button>
            </Info>
        </Container>
    );
}
