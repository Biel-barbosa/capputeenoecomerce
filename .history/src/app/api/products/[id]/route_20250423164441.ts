import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products'; // ajuste o caminho se necessário

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const product = getProductById(params.id);

    if (!product) {
        return NextResponse.json({ message: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(product);
}
