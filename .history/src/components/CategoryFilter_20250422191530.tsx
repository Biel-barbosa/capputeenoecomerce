'use client';
import styled from 'styled-components';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;

  @media (max-width: 768px) {
    display: none; // podemos melhorar isso depois com dropdown
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: #737380;
`;

const Button = styled.button<{ active: boolean }>`
  text-align: left;
  padding: 0.5rem 0;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active }) => (active ? '#41414d' : '#737380')};
  border-bottom: 2px solid ${({ active }) => (active ? '#ffa585' : 'transparent')};
  cursor: pointer;

  &:hover {
    color: #41414d;
  }
`;

type Props = {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
};

const CategoryFilter = ({ selectedCategory, onSelectCategory }: Props) => {
    return (
        <Wrapper>
            <Title>Categorias</Title>
            <Button
                active={selectedCategory === 'all'}
                onClick={() => onSelectCategory('all')}
            >
                Todos os produtos
            </Button>
            <Button
                active={selectedCategory === 't-shirts'}
                onClick={() => onSelectCategory('t-shirts')}
            >
                Camisetas
            </Button>
            <Button
                active={selectedCategory === 'mugs'}
                onClick={() => onSelectCategory('mugs')}
            >
                Canecas
            </Button>
        </Wrapper>
    );
};

export default CategoryFilter;
