'use client';
import styled from 'styled-components';

// Usando o shouldForwardProp para garantir que a prop 'isActive' não seja passada para o DOM
const Button = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isActive', // Não passa 'isActive' para o DOM
}) <{ isActive: boolean }>`
  text-align: left;
  padding: 0.5rem 0;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive }) => (isActive ? '#41414d' : '#737380')};
  border-bottom: 2px solid ${({ isActive }) => (isActive ? '#ffa585' : 'transparent')};
  cursor: pointer;

  &:hover {
    color: #41414d;
  }
`;

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

type Props = {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
};

const CategoryFilter = ({ selectedCategory, onSelectCategory }: Props) => {
    return (
        <Wrapper>
            <Title>Categorias</Title>
            <Button
                isActive={selectedCategory === 'all'}
                onClick={() => onSelectCategory('all')}
            >
                Todos os produtos
            </Button>
            <Button
                isActive={selectedCategory === 't-shirts'}
                onClick={() => onSelectCategory('t-shirts')}
            >
                Camisetas
            </Button>
            <Button
                isActive={selectedCategory === 'mugs'}
                onClick={() => onSelectCategory('mugs')}
            >
                Canecas
            </Button>
        </Wrapper>
    );
};

export default CategoryFilter;
