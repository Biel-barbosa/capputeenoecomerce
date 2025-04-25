export type Product = {
    id: string;
    title: string;
    image: string;
    price: number;
    category: 't-shirts' | 'mugs';
    description: string;
    createdAt: Date | string;  // Permitir que a data seja string também
    sales: number;
};

export const products: Product[] = [
    {
        id: '1',
        title: 'Camiseta not today.',
        image: '/images/Camiseta-not-today.jpg',
        price: 78.0,
        category: 't-shirts',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-01'),
        sales: 30,
    },
    {
        id: '2',
        title: 'Caneca rústica',
        image: '/images/Caneca-ceramica-rustica.jpg',
        price: 40.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-04-10'),
        sales: 80,
    },
    {
        id: '3',
        title: 'Camiseta Broken Saints',
        image: '/images/Camiseta-broken-saints.jpg',
        price: 58.0,
        category: 't-shirts',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-01-15'),
        sales: 45,
    },
    {
        id: '4',
        title: 'Caneca Black Ring',
        image: '/images/Caneca-Black-Ring.jpg',
        price: 32.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-02-20'),
        sales: 60,
    },
    {
        id: '5',
        title: 'Camiseta Outcast',
        image: '/images/Camiseta-outcast.jpg',
        price: 89.9,
        category: 't-shirts',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-04-05'),
        sales: 50,
    },
    {
        id: '6',
        title: 'Caneca The Grounds',
        image: '/images/Caneca-The-Grounds.jpg',
        price: 85.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-10'),
        sales: 75,
    },
    {
        id: '7',
        title: 'Camiseta evening',
        image: '/images/Camiseta-evening.jpg',
        price: 69.9,
        category: 't-shirts',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-11'),
        sales: 62,
    },
    {
        id: '8',
        title: 'Caneca preto fosco',
        image: '/images/Caneca-preto-fosco.jpg',
        price: 28.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-12'),
        sales: 58,
    },
    {
        id: '9',
        title: 'Caneca Never settle',
        image: '/images/Caneca-Never-settle.jpg',
        price: 43.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-13'),
        sales: 54,
    },
    {
        id: '10',
        title: 'Caneca Rocketseat',
        image: '/images/Caneca-Decaf!-P&Co.jpg',
        price: 59.9,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-14'),
        sales: 48,
    },
    {
        id: '11',
        title: 'Camiseta DREAMER',
        image: '/images/Camiseta-DREAMER.jpg',
        price: 55.0,
        category: 't-shirts',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-15'),
        sales: 52,
    },
    {
        id: '12',
        title: 'Caneca Decaf! P&Co',
        image: '/images/Caneca-Decaf!-P&Co.jpg',
        price: 32.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-16'),
        sales: 70,
    },
    {
        id: '13',
        title: 'Camiseta javaScript',
        image: '/images/Camiseta-not-today.jpg',
        price: 13.0,
        category: 't-shirts',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-16'),
        sales: 70,
    },
    {
        id: '14',
        title: 'Caneca phyton',
        image: '/images/Caneca-Black-Ring.jpg',
        price: 22.0,
        category: 'mugs',
        description: 'Aqui vem um texto descritivo do produto, esta caixa de texto servirá apenas de exemplo para que simule algum texto que venha a ser inserido nesse campo, descrevendo tal produto.',
        createdAt: new Date('2024-03-16'),
        sales: 70,
    },
];

export function getProductById(id: string) {
    return products.find((product) => product.id === id);
}
