import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

// O parâmetro 'params' já é um objeto com { id: string }
// Não é necessário tratar como Promise
export async function GET(
    request: Request,
    context: { params: { id: string } } // Tipando 'params' diretamente como um objeto
) {
    const { id } = context.params;

    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { message: 'Produto não encontrado' },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
}
