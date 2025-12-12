import React, { useEffect, useState } from 'react';
import Nav from '../chunks/Nav';
import { useCart } from '../context/CartContext';


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);


        // console.log(data)
        

        console.table(data.products)



      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);


if (loading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {/* Generate 6 skeleton cards */}
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse border border-gray-200 rounded-lg p-4">
          <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

  return (
    <div >
      <Nav search={search} onSearch={setSearch} />
      <div className='p-6'>
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">
        Products
      </h2>
      {
        /* compute filtered products client-side (title, brand, description) */
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
          .filter((product) => {
            if (!search) return true;
            const q = search.toLowerCase();
            return (
              (product.title && product.title.toLowerCase().includes(q)) ||
              (product.brand && product.brand.toLowerCase().includes(q)) ||
              (product.description && product.description.toLowerCase().includes(q))
            );
          })
          .map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition"
          >
            <div className="relative w-full h-48 mb-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <span className="absolute bottom-2 left-2 bg-gray-50 text-black text-xs font-semibold px-2 py-1 rounded-full shadow">
                {product.brand}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {product.title}
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              {product.description.slice(0, 60)}...
            </p>

            <p className="text-lg font-bold text-gray-800 mb-3">
              ₹ {product.price}
            </p>

            <button
              onClick={() => addItem(product)}
              className="w-full py-2 bg-gray-200 text-gray-900 rounded-md font-medium hover:bg-gray-300 transition"
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
      {products.filter(p => {
        if (!search) return false; // when no search, don't show the 'no results' block
        const q = search.toLowerCase();
        return !(
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
        );
      }).length === products.length && search ? (
        <div className="mt-6 text-center text-gray-500">No products match "{search}"</div>
      ) : null}
      </div>
    </div>
  );
}

export default Products;
