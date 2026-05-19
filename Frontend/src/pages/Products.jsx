import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Nav.jsx";
import { authDataContext } from "../context/AuthContext.jsx";
import Bestseller from "../components/BestSeller.jsx";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { serverUrl } = useContext(authDataContext);

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/product/list`
      );

      setProducts(response.data.products);

    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] to-[#0c2025] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE WRAPPER */}
      <div className="pt-28 px-4 sm:px-6 lg:px-10 pb-16">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/40 mb-3">
            SnapCart Collection
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Explore Products
          </h1>

          <p className="text-white/50 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            Browse trending fashion, premium essentials, and everyday wear
            curated for modern style lovers.
          </p>
        </div>

        {/* LOADING */}
        {loading ? (

          <div className="flex items-center justify-center h-[50vh]">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>

        ) : products.length === 0 ? (

          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">

            <h2 className="text-2xl font-semibold mb-3">
              No Products Available
            </h2>

            <p className="text-white/40 max-w-md">
              Products added by admin will appear here.
            </p>
          </div>

        ) : (

          /* PRODUCT GRID */
          <div  className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {products.map((product) => (

              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="group bg-white/5 border cursor-pointer border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >

                {/* IMAGE SECTION */}
                <div className="relative overflow-hidden">

                  <img
                    src={product.image1}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* BESTSELLER BADGE */}
                  {product.bestseller && (
                    <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                      Bestseller
                    </span>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-5">

                  {/* CATEGORY */}
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                    {product.category} • {product.subCategory}
                  </p>

                  {/* NAME */}
                  <h2 className="text-lg font-semibold line-clamp-1 mb-2">
                    {product.name}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-white/50 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* SIZES */}
                  <div className="flex flex-wrap gap-2 mb-5">

                    {product.sizes?.map((size, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs border border-white/10 rounded-md text-white/70"
                      >
                        {size}
                      </span>
                    ))}

                  </div>

                  {/* PRICE + BUTTON */}
                  <div className="flex items-center justify-between">

                    {/* PRICE */}
                    <div>

                      <p className="text-xs text-white/40 mb-1">
                        Price
                      </p>

                      <h3 className="text-2xl font-bold">
                        ₹{product.price}
                      </h3>

                    </div>

                    {/* BUTTON */}
                    <button
                      className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition active:scale-95"
                    >
                      Add to Cart
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
};

export default Products;