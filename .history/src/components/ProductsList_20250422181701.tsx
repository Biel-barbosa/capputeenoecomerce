import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products'; // Certifique-se de que o path está correto

const ProductsList = ({ products }: { products: Product[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div>
            <div className="grid grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                    <div key={product.id} className="card">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={300}
                            height={300}
                            style={{ objectFit: 'cover' }}
                        />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>

            <div className="pagination mt-4 flex gap-2">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default ProductsList;