import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link'; // Importando o Link do Next.js
import { toast } from 'react-hot-toast'; // Importando o Toaster

type HeaderProps = {
  onSearch?: (value: string) => void;
};

type Product = {
  title: string;
  price: number;
  // Adicione mais propriedades conforme necessário
};

// Estilos
const HeaderContainer = styled.header`
  width: 100%;
  padding: 1.5rem 14rem;
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
  margin: 0;
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
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  // Atualiza o número de itens do carrinho quando o componente for montado ou quando o carrinho mudar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      setCartItemCount(cart.length);
    }
  }, []);

  // Função para adicionar um item ao carrinho e mostrar o toaster
  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o número de itens no carrinho
    setCartItemCount(cart.length);

    // Exibe o toaster
    toast.success(`${product.title} foi adicionado ao carrinho!`);
  };

  return (
    <HeaderContainer>
      <Link href="/" passHref>
        <Logo>capputeeno</Logo>
      </Link>

      <SearchInput
        type="text"
        placeholder="Procurando por algo específico?"
        onChange={(e) => onSearch?.(e.target.value)}
      />

      <Link href="/cart" passHref>
        <CartButton>
          <FiShoppingBag />
          <CartCount>{cartItemCount}</CartCount>
        </CartButton>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
