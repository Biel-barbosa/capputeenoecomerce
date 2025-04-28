import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    const { id } = context.params;  // Garantindo que o tipo de `params` seja `{ id: string }`

    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { message: 'Produto não encontrado' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}
