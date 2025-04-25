'use client';

import styled from 'styled-components';
import { FiShoppingBag, FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContexts';

type HeaderProps = {
  onSearch?: (value: string) => void;
};

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 6vw;
  background-color: #f5f5fa;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #5d5d6d;
  white-space: nowrap;
    font-family: var(--font-saira-stencil);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 420px;
  display: flex;
  align-items: center;
  background: #e9e9f0;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;

  svg {
    font-size: 1rem;
    color: #737380;
    margin-right: 0.4rem;
  }

  @media (max-width: 768px) {
    max-width: 180px;
    flex-shrink: 1;
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
    font-size: 0.9rem;

    &::placeholder {
      color: transparent;
    }
  }
`;

const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    font-size: 1.6rem;
    color: #5d5d6d;
  }

  @media (max-width: 768px) {
    svg {
      font-size: 1.4rem;
    }
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
