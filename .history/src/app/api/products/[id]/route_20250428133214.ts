import { NextResponse } from 'next/server';
import { getProductById } from '@/data/products';

// Função GET sem async, já que o getProductById não precisa de await
export function GET(
    request: Request,
    context: { params: { id: string } }
) {
    // Extraindo id diretamente do params
    const { id } = context.params;

    // Tentando buscar o produto
    const product = getProductById(id);

    // Se o produto não for encontrado, retorna erro 404
    if (!product) {
        return NextResponse.json(
            { message: 'Produto não encontrado' },
            { status: 404 }
        );
    }

    // Caso contrário, retorna o produto em formato JSON
    return NextResponse.json(product);
}
