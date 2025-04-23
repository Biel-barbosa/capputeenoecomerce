'use client';
import { useState } from 'react';
import { Product } from '@/data/products'; // Certifique-se de que você tem o tipo de dados correto

const ProductsList = ({ products }: { products: Product[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // 12 itens por página
    const itemsPerRow = 4; // 4 itens por linha

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div>
            <div className="grid grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <div key={product.id} className="card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
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
