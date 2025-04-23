'use client';
import styled from 'styled-components';
import { FiShoppingBag } from 'react-icons/fi';

type HeaderProps = {
  onSearch?: (value: string) => void;
};

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1.5rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5fa;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #5d5d6d;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: #e9e9f0;
  font-size: 1rem;
  color: #737380;

  &:focus {
    outline: 2px solid #115d8c;
  }

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    order: 3;
  }
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.75rem;
    color: #5d5d6d;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #de3838;
  color: white;
  border-radius: 50%;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  line-height: 1;
`;

const Header = ({ onSearch }: HeaderProps) => {
  const cartItemCount = 3; // Trocar por dados reais depois

  return (
    <HeaderContainer>
      <Logo>capputeeno</Logo>

      <SearchInput
        type="text"
        placeholder="Procurando por algo específico?"
        onChange={(e) => onSearch?.(e.target.value)}
      />

      <CartButton>
        <FiShoppingBag />
        <CartCount>{cartItemCount}</CartCount>
      </CartButton>
    </HeaderContainer>
  );
};

export default Header;
