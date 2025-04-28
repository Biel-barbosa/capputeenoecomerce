import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

// Tipando de maneira que corresponda ao contexto de rota do Next.js
export async function GET(
    request: Request,
    { params }: { params: { id: string } } // Tipando diretamente o parâmetro 'params' como um objeto
) {
    const { id } = params;

    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { message: 'Produto não encontrado' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}
