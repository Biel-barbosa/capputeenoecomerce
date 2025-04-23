'use client';
import { useState } from 'react';
import Image from 'next/image'; // Importe o Image do Next.js
import { Product } from '@/data/products'; // Certifique-se de que você tem o tipo de dados correto

const ProductsList = ({ products }: { products: Product[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12; // 12 itens por página

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="bg-[#F0F0F5] p-8">
            <div className="grid grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg"
                        style={{ width: '248px', height: '356px' }} 
                    >
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={256} 
                            height={300} 
                            className="object-cover rounded-md" 
                        />
                        <h3 className="mt-2 text-lg font-semibold text-center">{product.title}</h3>
                        <p className="text-sm text-center mt-1">{product.price}</p>
                    </div>
                ))}
            </div>
            <div className="pagination mt-6 flex justify-center gap-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                    Anterior
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`px-4 py-2 rounded-md ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                        {number + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                >
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default ProductsList;
