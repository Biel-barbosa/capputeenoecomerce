'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContexts';
import styled from 'styled-components';
import Header from '@/components/Header'; 
import { Product } from '@/data/products';  // Importando o tipo Product

const ProductPageContainer = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #f9f9f9;
  justify-content: center;
  flex-direction: column; /* Para telas pequenas */

  /* Maior espaçamento nas laterais em telas maiores */
  @media (min-width: 1024px) {
    padding: 2rem 8rem; /* Mais espaçamento nas laterais */
  }
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Duas colunas */
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  
  /* Ajuste para telas pequenas */
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Uma coluna */
    gap: 1rem;
  }
`;

const ProductImage = styled.img`
  width: 550px; /* Diminuindo o tamanho da imagem */
  height: 550px;
  object-fit: cover; /* Garantindo que a imagem seja ajustada corretamente */
  
  /* Ajuste para telas pequenas */
  @media (max-width: 768px) {
    width: 100%; /* Imagem ocupa toda a largura */
    height: auto; /* Altura automática */
  }
`;

const ProductInfo = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #41414D;

  /* Ajuste de tamanho de fonte para telas menores */
  @media (max-width: 768px) {
    font-size: 1rem; /* Diminui o tamanho da fonte */
  }
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #09090A;
`;

const AddToCartButton = styled.button`
  background-color: #115d8c;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 12rem;
  
  /* Ajuste para telas pequenas */
  @media (max-width: 768px) {
    margin-top: 2rem; /* Reduzindo o espaçamento na tela pequena */
    font-size: 1rem; /* Reduzindo o tamanho da fonte */
  }
`;

const CategoryLabel = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #41414D;
  margin-bottom: 1rem;
  padding-bottom: 10px;

  /* Ajuste de tamanho da categoria para telas menores */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProductPage = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : ''; 

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async (productId: string) => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data: Product = await response.json();
        setProduct(data);
        console.log('Produto carregado:', data); 
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    if (id) fetchProduct(id);
  }, [id]);

  if (!product) return <div>Carregando...</div>;

  const validPrice = !isNaN(product.price) ? product.price : 0;

  const handleAddToCart = () => {
    if (validPrice > 0) {
      addToCart(product);
    }
  };

  const categoryLabel = product.category.toLowerCase() === 't-shirts'
    ? 'Camiseta'
    : product.category.toLowerCase() === 'mugs'
      ? 'Caneca'
      : '';

  return (
    <>
      <Header /> 
      <ProductPageContainer>
        <ProductDetails>
          <ProductImage src={product.image} alt={product.title} />
          <ProductInfo>
            {categoryLabel && <CategoryLabel>{categoryLabel}</CategoryLabel>}
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <ProductPrice>R$ {validPrice.toFixed(2)}</ProductPrice>
            <AddToCartButton onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </AddToCartButton>
          </ProductInfo>
        </ProductDetails>
      </ProductPageContainer>
    </>
  );
};

export default ProductPage;
