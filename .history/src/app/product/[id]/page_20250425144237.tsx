'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContexts';
import styled from 'styled-components';
import Header from '@/components/Header'; 
import { Product } from '@/data/products';  // Importando o tipo Product

const ProductPageContainer = styled.div`
  display: flex;
  padding: 2rem;
  background-color: #f9f9f9;
  justify-content: center;
`;

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Duas colunas */
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 550px; /* Diminuindo o tamanho da imagem */
  height: 550px;
  object-fit: cover; /* Garantindo que a imagem seja ajustada corretamente */
`;

const ProductInfo = styled.div`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #41414D;
`;

const ProductPrice = styled.div`
  font-weight: bold;
  color: #09090
