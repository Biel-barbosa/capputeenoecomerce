'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { products as allProducts } from '../data/products';
import ProductsList from '@/components/ProductsList';

const Container = styled.main`
  width: 100%;
  padding: 2rem 4vw;
  background-color: #f0f0f5;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 2rem 3vw;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 2vw;
  }

  @media (max-width: 480px) {
    padding: 1rem 2vw;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding: 0rem 12rem

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Categories = styled.div`
  display: flex;
  gap: 2rem;

  button {
    background: none;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    padding-bottom: 4px;
    transition: 0.2s;
    color: #737380;

    &.active {
      color: #41414d;
      border-color: #ffa585;
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: center;
  }
`;

const SortSelect = styled.select`
  background: #f0f0f5;
  color: #737380;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HomePage = () => {
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortOption === 'price-asc') {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      products = products.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'bestsellers') {
      products = products.sort((a, b) => b.sales - a.sales);
    } else {
      products = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return products;
  }, [category, searchTerm, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <Container>
        <FiltersWrapper>
          <Categories>
            {['all', 't-shirts', 'mugs'].map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'active' : ''}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat === 'all' ? 'Todos os produtos' : cat === 't-shirts' ? 'Camisetas' : 'Canecas'}
              </button>
            ))}
          </Categories>

          <SortSelect
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="newest">Novidades</option>
            <option value="price-desc">Preço: Maior - menor</option>
            <option value="price-asc">Preço: Menor - maior</option>
            <option value="bestsellers">Mais vendidos</option>
          </SortSelect>
        </FiltersWrapper>

        <ProductsList
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
    </>
  );
};

export default HomePage;
