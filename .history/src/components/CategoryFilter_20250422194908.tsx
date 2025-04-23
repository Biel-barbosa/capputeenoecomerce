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

const Button = styled.button<{ isActive: boolean }>` // prop 'isActive' usada apenas para estilo
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

type Props = {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
};

const CategoryFilter = ({ selectedCategory, onSelectCategory }: Props) => {
    return (
        <Wrapper>
            <Title>Categorias</Title>
            <Button
                isActive={selectedCategory === 'all'} // Corrigido aqui
                onClick={() => onSelectCategory('all')}
            >
                Todos os produtos
            </Button>
            <Button
                isActive={selectedCategory === 't-shirts'} // Corrigido aqui
                onClick={() => onSelectCategory('t-shirts')}
            >
                Camisetas
            </Button>
            <Button
                isActive={selectedCategory === 'mugs'} // Corrigido aqui
                onClick={() => onSelectCategory('mugs')}
            >
                Canecas
            </Button>
        </Wrapper>
    );
};

export default CategoryFilter;
