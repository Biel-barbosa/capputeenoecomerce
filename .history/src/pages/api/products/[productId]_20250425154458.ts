import { NextApiRequest, NextApiResponse } from 'next';
import { products } from '@/data/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  const productWithDate = { 
    ...product,
    createdAt: product.createdAt instanceof Date ? product.createdAt.toISOString() : product.createdAt,
  };

  res.status(200).json(productWithDate);
}
