import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

export async function GET(
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id

    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { message: 'Produto não encontrado' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}
