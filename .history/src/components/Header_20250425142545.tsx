'use client';

import styled from 'styled-components';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContexts';

type HeaderProps = {
  onSearch?: (value: string) => void;
};

// Estilos
const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 6vw; // espaçamento maior nas laterais da tela
  background-color: #f5f5fa;
  box-sizing: border-box;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem; // espaçamento apertado entre os elementos

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #5d5d6d;
  white-space: nowrap;
`;

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 380px;
  display: flex;
  align-items: center;
  background: #e9e9f0;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  svg {
    font-size: 1.2rem;
    color: #737380;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  font-size: 1rem;
  color: #737380;

  &::placeholder {
    color: #a8a8b3;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    &::placeholder {
      color: transparent; // oculta o placeholder no mobile
    }
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

  @media (max-width: 768px) {
    align-self: flex-end;
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
  const { cartItemCount } = useCart();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/" passHref>
          <Logo>capputeeno</Logo>
        </Link>

        <SearchWrapper>
          <FiSearch />
          <SearchInput
            type="text"
            placeholder="Procurando por algo específico?"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </SearchWrapper>

        <Link href="/cart" passHref>
          <CartButton>
            <FiShoppingBag />
            {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
          </CartButton>
        </Link>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
