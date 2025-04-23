import React from "react";
import styled from "styled-components";
import { products } from '../data/products';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f1f1f1;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #403937;
  margin-bottom: 1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1120px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const ProductName = styled.p`
  font-weight: bold;
  color: #403937;
`;

const ProductPrice = styled.span`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #8d8686;
`;

const products = [
  {
    id: 1,
    name: "Caneca de cerâmica rústica",
    price: 40,
    image: "/products/caneca-01.png",
  },
  {
    id: 2,
    name: "Camiseta Outcast",
    price: 89,
    image: "/products/camiseta-01.png",
  },
  {
    id: 3,
    name: "Caneca Decaf P&Co",
    price: 32,
    image: "/products/caneca-02.png",
  },
];

export default function Home() {
  return (
    <Container>
      <Title>Catálogo da loja</Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>R$ {product.price},00</ProductPrice>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
}
