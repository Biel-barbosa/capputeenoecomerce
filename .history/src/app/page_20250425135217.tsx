'use client'

import { useState, useMemo } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { products as allProducts } from '../data/products'
import Image from 'next/image'  // Importando o Image do Next.js

type Product = {
  id: string;
  title: string;
  price: number;
  sales: number;
  category: string;
  createdAt: string;
  imageUrl: string; // Tipagem correta com a propriedade imageUrl
}

const Container = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 2rem;
  background-color: #f0f0f5;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`

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
      color: #41414D;
      border-color: #FFA585;
    }
  }
`

const SortSelect = styled.select`
  background: #f0f0f5;
  color: #737380;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
`

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  div {
    padding: 1rem;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    color: #41414D;
  }

  p {
    margin: 0.5rem 0 0;
    color: #737380;
    font-weight: 600;
  }
`

const HomePage = () => {
  const [category, setCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 12

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })

    if (sortOption === 'price-asc') {
      products = products.sort((a, b) => a.price - b.price)
    } else if (sortOption === 'price-desc') {
      products = products.sort((a, b) => b.price - a.price)
    } else if (sortOption === 'bestsellers') {
      products = products.sort((a, b) => b.sales - a.sales)
    } else {
      products = products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return products
  }, [category, searchTerm, sortOption])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
                  setCategory(cat)
                  setCurrentPage(1)
                }}
              >
                {cat === 'all' ? 'Todos os produtos' : cat === 't-shirts' ? 'Camisetas' : 'Canecas'}
              </button>
            ))}
          </Categories>

          <SortSelect
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="newest">Novidades</option>
            <option value="price-desc">Preço: Maior - menor</option>
            <option value="price-asc">Preço: Menor - maior</option>
            <option value="bestsellers">Mais vendidos</option>
          </SortSelect>
        </FiltersWrapper>

        <ProductsGrid>
          {paginatedProducts.map((product) => (
            <Card key={product.id}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={240}
                height={240}
                objectFit="cover"
              />
              <div>
                <h3>{product.title}</h3>
                <p>R$ {product.price.toFixed(2)}</p>
              </div>
            </Card>
          ))}
        </ProductsGrid>
      </Container>
    </>
  )
}

export default HomePage
