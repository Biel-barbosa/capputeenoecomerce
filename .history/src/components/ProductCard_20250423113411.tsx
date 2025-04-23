import styled from 'styled-components'
import { Product } from '../data/products'

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  color: #41414d;
`

const Price = styled.p`
  font-weight: 600;
  font-size: 1rem;
  color: #09090a;
`

type Props = {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <Card>
            <ImageWrapper>
                <img src={product.image} alt={product.title} />
            </ImageWrapper>
            <Info>
                <Title>{product.title}</Title>
                <Price>R$ {product.price.toFixed(2)}</Price>
            </Info>
        </Card>
    )
}

export default ProductCard
