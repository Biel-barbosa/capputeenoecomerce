'use client';
import { useState, useMemo } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductsList from '../components/ProductsList';
import { products as allProducts } from '../data/products';
import { Product } from '../data/products';

const Container = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f0f0f5;
`;

const ContentWrapper = styled.section`
  display: flex;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const PRODUCTS_PER_PAGE = 12;

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <Container>
        <ContentWrapper>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reseta para página 1 ao trocar a categoria
            }}
          />
          <MainContent>
            <ProductsList
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </MainContent>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default HomePage;
