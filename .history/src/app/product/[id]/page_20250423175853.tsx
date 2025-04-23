'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContexts';
import styled from 'styled-components';
import Header from '@/components/Header'; // Importando o Header

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string; // Adicionando a categoria ao tipo
};

const ProductPageContainer = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #f9f9f9;
  justify-content: center;
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Duas colunas */
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 550px; /* Diminuindo o tamanho da imagem */
  height: 550px;
  object-fit: cover; /* Garantindo que a imagem seja ajustada corretamente */
`;

const ProductInfo = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  color: #41414D;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #000;
`;

const AddToCartButton = styled.button`
  background-color: #115d8c;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
`;

const CategoryLabel = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: #115d8c;
  margin-bottom: 1rem;
  padding-bottom: 10px; /* Adicionando padding extra */
  border-bottom: 1px solid #ccc; /* Linha de separação abaixo da categoria */
`;

const ProductPage = () => {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : ''; // Garantia de string

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async (productId: string) => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data: Product = await response.json();
        setProduct(data);
        console.log('Produto carregado:', data); // Verificando a resposta da API
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

  // A categoria será exibida acima do título, de acordo com o tipo
  const categoryLabel = product.category === 'T-Shirts' ? 'Camiseta' : product.category === 'Mug' ? 'Caneca' : '';

  // Verificando se a categoria está sendo passada corretamente
  console.log('Categoria:', categoryLabel);

  return (
    <>
      <Header /> {/* Header importado aqui */}
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
