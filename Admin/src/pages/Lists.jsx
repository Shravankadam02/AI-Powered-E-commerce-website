import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import AdminNavbar from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { authDataContext } from "../context/Authcontext.jsx";

const Lists = () => {
  const { serverUrl } = useContext(authDataContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

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

  // 🔥 Delete Product
  const removeProduct = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (!confirmDelete) return;

      await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );

      // ✅ Remove instantly from UI
      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("Product Removed ✅");

    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to remove product ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] to-[#0c2025]">
      
      <AdminNavbar />
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-20 md:ml-64 pt-20 px-8 pb-10 text-white">

        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Product List
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Manage all uploaded SnapCart products
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-gray-400 text-lg">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (

          /* EMPTY STATE */
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">
                No Products Found
              </h2>

              <p className="text-gray-400">
                Add your first product from the Add Items page.
              </p>
            </div>
          </div>

        ) : (

          /* PRODUCT LIST */
          <div className="flex flex-col gap-5">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-5 hover:border-white/20 transition-all duration-300"
              >

                <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between">

                  {/* LEFT SIDE */}
                  <div className="flex gap-5">

                    {/* IMAGE */}
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-28 h-28 object-cover rounded-xl border border-white/10"
                    />

                    {/* DETAILS */}
                    <div className="flex flex-col justify-center">

                      {/* NAME + BADGE */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl font-semibold">
                          {product.name}
                        </h2>

                        {product.bestseller && (
                          <span className="bg-yellow-500/20 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-500/20">
                            Bestseller
                          </span>
                        )}
                      </div>

                      {/* CATEGORY */}
                      <p className="text-gray-400 text-sm mt-2">
                        {product.category} • {product.subCategory}
                      </p>

                      {/* PRICE */}
                      <p className="text-lg font-medium mt-3">
                        ₹ {product.price}
                      </p>

                      {/* SIZES */}
                      <div className="flex gap-2 flex-wrap mt-3">

                        {product.sizes.map((size, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-gray-300"
                          >
                            {size}
                          </span>
                        ))}

                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex md:flex-col gap-3 md:items-end">

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => removeProduct(product._id)}
                      className="bg-red-500/15 border border-red-500/20 text-red-400 px-5 py-2 rounded-lg hover:bg-red-500/25 hover:text-red-300 transition-all duration-200"
                    >
                      Delete
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

export default Lists;