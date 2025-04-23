export type Product = {
    id: string;
    title: string;
    image: string;
    price: number;
    category: 't-shirts' | 'mugs';
    description: string;
    createdAt: Date;
    sales: number;
  };
  
  export const products: Product[] = [ /* ...seus 14 produtos aqui... */ ];
  
  export function getProductById(id: string) {
    return products.find((product) => product.id === id);
  }
  