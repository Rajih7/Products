import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDropdownChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setProductsPerPage(selectedValue);
    setCurrentPage(1);
  };
  const getProductLink = (productId) => `/Product/${productId}`;

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4 mt-3 p-5">
        {currentProducts.map((product) => (
          <Link to={getProductLink(product.id)} key={product.id}>
            <div className="border p-2 bg-slate-400">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <p className="text-lg font-semibold mb-2">{product.title}</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-2 px-4 py-2 rounded-full ${
              currentPage === i + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="m-4 flex justify-center">
        {currentPage !== 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-4 mr-2 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Next Page
          </button>
        )}
      </div>
      <div className="m-4 flex justify-center space-x-2">
        <label htmlFor="dropdown" className="text-lg font-medium text-gray-700">
          Products Per Page:
        </label>
        <select
          id="dropdown"
          value={productsPerPage}
          onChange={handleDropdownChange}
          className="p-2 h-9 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
        >
          <option value="8">8</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
}

export default ProductsList;
