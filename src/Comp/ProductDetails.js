import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/product/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <Link to="/Product/pro">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
      <h2 className="text-3xl font-semibold mt-4">{product.title}</h2>
      <h1>{product.brand}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p className="text-gray-600">Product ID: {id}</p>
      <p className="text-lg mt-2">Price: ${product.price}</p>
      <p className="text-lg mt-2">Rating: {product.rating}/5</p>
      <p className="mt-2">Description: {product.description}</p>
      <p className="mt-2">Category: {product.category}</p>
    </div>
  );
};

export default ProductDetails;
