import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    const { id } = context.params; // sem await aqui

    const product = await getProductById(id); // use await se getProductById for async

    if (!product) {
        return NextResponse.json(
            { message: 'Produto não encontrado' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}
