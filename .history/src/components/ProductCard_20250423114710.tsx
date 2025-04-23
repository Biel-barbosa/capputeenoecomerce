import styled from 'styled-components'
import { Product } from '../data/products'
import Image from 'next/image'

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
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
  color: #41414D;
`

type Props = {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <Card>
            <ImageWrapper>
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
            </ImageWrapper>
            <Info>
                <Title>{product.title}</Title>
                <Price>R$ {product.price.toFixed(2)}</Price>
            </Info>
        </Card>
    )
}

export default ProductCard
