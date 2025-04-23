'use client';

import styled from 'styled-components';
import { products } from '../data/products';

const Container = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #403937;
  margin-bottom: 2rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1120px;
`;

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const Name = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #403937;
`;

const Price = styled.span`
  margin-top: 0.5rem;
  color: #8d8686;
`;

export default function Home() {
  return (
    <Container>
      <Title>Catálogo de Produtos</Title>
      <ProductGrid>
        {products.map((product) => (
          <Card key={product.id}>
            <Image src={product.image} alt={product.title} />
            <Name>{product.title}</Name>
            <Price>R$ {product.price.toFixed(2)}</Price>
          </Card>
        ))}
      </ProductGrid>
    </Container>
  );
}
