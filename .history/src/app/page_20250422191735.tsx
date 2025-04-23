'use client';
import { useState, useMemo } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import ProductsList from '../components/ProductsList';
import { products as allProducts } from '../data/products'; // seus produtos mockados
import { Product } from '../data/products';

const Container = styled.main`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro combinado: por categoria + nome
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

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <Container>
        <ContentWrapper>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <MainContent>
            <ProductsList products={filteredProducts} />
          </MainContent>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default HomePage;
