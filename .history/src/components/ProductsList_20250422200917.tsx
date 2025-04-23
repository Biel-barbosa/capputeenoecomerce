'use client';
import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Product } from '@/data/products'; // Certifique-se de que você tem o tipo de dados correto

// Container do body com fundo colorido
const BodyContainer = styled.div`
  background-color: #f0f0f5;
  padding: 2rem;
`;

// Grid de produtos
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

// Card do produto
const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 248px;
  height: 356px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;

// Título do produto
const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #41414d;
  text-align: center;
  margin-top: 1rem;
`;

// Preço do produto
const ProductPrice = styled.p`
  font-size: 0.875rem;
  color: #737380;
  text-align: center;
`;

// Paginação
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ isActive }) => (isActive ? '#115d8c' : '#e9e9f0')};
  color: ${({ isActive }) => (isActive ? 'white' : '#737380')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#0e4a68' : '#d0d0d0')};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #e0e0e0;
  }
`;

const ProductsList = ({ products }: { products: Product[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <BodyContainer>
            {/* Grid de produtos */}
            <ProductGrid>
                {currentProducts.map((product) => (
                    <ProductCard key={product.id}>
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={248}
                            height={248}
                            objectFit="cover"
                        />
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductPrice>{product.price}</ProductPrice>
                    </ProductCard>
                ))}
            </ProductGrid>

            {/* Paginação */}
            <PaginationContainer>
                <PageButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </PageButton>
                {[...Array(totalPages).keys()].map((number) => (
                    <PageButton
                        key={number}
                        onClick={() => paginate(number + 1)}
                        isActive={currentPage === number + 1}
                    >
                        {number + 1}
                    </PageButton>
                ))}
                <PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo
                </PageButton>
            </PaginationContainer>
        </BodyContainer>
    );
};

export default ProductsList;
