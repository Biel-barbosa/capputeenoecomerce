import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContexts';
import styled from 'styled-components';

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

const ProductPageContainer = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const ProductDetails = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const ProductInfo = styled.div`
  font-size: 1.2rem;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #115d8c;
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

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtendo o id do produto da URL
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);

  // Carregar o produto com base no id
  useEffect(() => {
    if (id) {
      // Suponha que você tenha um método para buscar o produto, como uma API ou um mock
      const fetchProduct = async (id: string) => {
        const response = await fetch(`/api/products/${id}`);
        const data: Product = await response.json();
        setProduct(data);
      };

      fetchProduct(id as string);
    }
  }, [id]);

  if (!product) {
    return <div>Carregando...</div>; // Aguarda o carregamento do produto
  }

  const handleAddToCart = () => {
    if (product.price && !isNaN(product.price)) {
      addToCart(product); // Verifica se o preço é válido antes de adicionar ao carrinho
    }
  };

  return (
    <ProductPageContainer>
      <ProductDetails>
        <ProductImage src={product.image} alt={product.title} />
        <ProductInfo>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice> {/* Formata o preço */}
          <AddToCartButton onClick={handleAddToCart}>Adicionar ao Carrinho</AddToCartButton>
        </ProductInfo>
      </ProductDetails>
    </ProductPageContainer>
  );
};

export default ProductPage;
