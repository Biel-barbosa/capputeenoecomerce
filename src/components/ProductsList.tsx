'use client';

import styled from 'styled-components';
import { Product } from '@/data/products';
import Link from 'next/link';

type Props = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Container = styled.main`
  flex: 1;
  background-color: #f0f0f5;
  padding: 2rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 248px);
  gap: 2rem;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 248px;
  height: 300px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 156px;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  color: #41414d;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.span`
  font-weight: bold;
  color: #41414D;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  background: ${({ isActive }) => (isActive ? '#FFA585' : 'transparent')};
  border: 1px solid #dcdce5;
  color: ${({ isActive }) => (isActive ? '#fff' : '#737380')};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductsList = ({ products, currentPage, totalPages, onPageChange }: Props) => {
  return (
    <Container>
      <ProductsGrid>
        {products.map((product) => (
          // Remover a tag <a> aqui, o Link já se encarrega disso
          <Link href={`/product/${product.id}`} passHref key={product.id}>
            <ProductCard>
              <ProductImage src={product.image} alt={product.title} />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          </Link>
        ))}
      </ProductsGrid>

      <PaginationContainer>
        <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} isActive={false}>
          Anterior
        </PageButton>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <PageButton
              key={page}
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PageButton>
          );
        })}

        <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} isActive={false}>
          Próximo
        </PageButton>
      </PaginationContainer>
    </Container>
  );
};

export default ProductsList;
