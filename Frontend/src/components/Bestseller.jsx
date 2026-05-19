import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Bestseller = () => {
  const { serverUrl } = useContext(authDataContext);

  const navigate = useNavigate();

  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Bestseller Products
  const fetchBestProducts = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/product/list`);

      // Filter Bestseller Products
      const filtered = response.data.products.filter(
        (item) => item.bestseller === true,
      );

      setBestProducts(filtered);
    } catch (error) {
      console.error("Error fetching bestseller products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestProducts();
  }, []);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-10">
      {/* SECTION HEADER */}
      <div className="mb-12">
        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white/40 mb-3">
          Customer Favorites
        </p>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white">
          Best Sellers
        </h2>

        <p className="text-white/50 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
          Explore the most loved pieces handpicked by our customers — premium
          fashion designed to stand out effortlessly.
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : bestProducts.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center h-[40vh] text-center">
          <h3 className="text-2xl font-semibold text-white mb-3">
            No Bestseller Products
          </h3>

          <p className="text-white/40">
            Bestseller products will appear here once added.
          </p>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              className="group bg-white/5 border cursor-pointer border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* BADGE */}
                <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  Bestseller
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* CATEGORY */}
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                  {product.category} • {product.subCategory}
                </p>

                {/* PRODUCT NAME */}
                <h3 className="text-lg font-semibold text-white line-clamp-1 mb-2">
                  {product.name}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-white/50 line-clamp-2 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* PRICE + BUTTON */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Price</p>

                    <h4 className="text-2xl font-bold text-white">
                      ₹{product.price}
                    </h4>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product._id}`);
                    }}
                    className="
    bg-white
    text-black
    px-4 py-2
    rounded-lg
    text-sm
    font-medium
    hover:bg-gray-200
    transition
    active:scale-95
  "
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Bestseller;
