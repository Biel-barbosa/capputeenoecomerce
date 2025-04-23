import { NextResponse } from 'next/server';

const products = [
  {
    id: '1',
    title: 'Caneca bonita',
    description: 'Uma caneca muito bonita.',
    price: 50,
    image: '/images/caneca-bonita.png'
  },
  {
    id: '2',
    title: 'Camiseta preta',
    description: 'Uma camiseta básica preta.',
    price: 80,
    image: '/images/camiseta-preta.png'
  },
  // ...outros produtos mockados
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
  }

  return NextResponse.json(product);
}
