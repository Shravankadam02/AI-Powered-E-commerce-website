import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

import { ShopDataContext } from "../context/ShopContext.jsx";

import { FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";

const ProductDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { products, currency } = useContext(ShopDataContext);

  // 🔥 FIND PRODUCT
  const product = useMemo(() => {
    return products.find((item) => item._id === id);
  }, [id, products]);

  // 🔥 STATES
  const [selectedImage, setSelectedImage] = useState("");

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image1);
    }
  }, [product]);

  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  // 🔥 LOADING
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-[#0c2025] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🔥 PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white">
        <Navbar />

        <div className="pt-40 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>

          <p className="text-white/50 mb-8">
            The product you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/collections")}
            className="
              bg-white
              text-black
              px-6 py-3
              rounded-xl
              font-medium
              hover:bg-gray-200
              transition
            "
          >
            Back To Collections
          </button>
        </div>
      </div>
    );
  }

  // 🔥 RELATED PRODUCTS
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item._id !== product._id,
  );

  // 🔥 IMAGES ARRAY
  const images = [product.image1, product.image2, product.image3].filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white overflow-hidden">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN SECTION */}
      <section className="pt-32 px-4 sm:px-6 lg:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* PRODUCT LAYOUT */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE - IMAGES */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* THUMBNAILS */}
              <div className="flex lg:flex-col gap-4 order-2 lg:order-1">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`
                      w-20 h-20
                      rounded-2xl
                      overflow-hidden
                      border
                      cursor-pointer
                      transition

                      ${
                        selectedImage === img
                          ? "border-white"
                          : "border-white/10 hover:border-white/30"
                      }
                    `}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* MAIN IMAGE */}
              <div
                className="
                  flex-1
                  bg-white/5
                  border border-white/10
                  rounded-3xl
                  overflow-hidden
                  backdrop-blur-md
                  order-1 lg:order-2
                "
              >
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="
                    w-full
                    h-[400px] sm:h-[550px]
                    object-cover
                    hover:scale-105
                    transition-transform
                    duration-700
                  "
                />
              </div>
            </div>

            {/* RIGHT SIDE - INFO */}
            <div>
              {/* CATEGORY */}
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                {product.category} • {product.subCategory}
              </p>

              {/* NAME */}
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
                {product.name}
              </h1>

              {/* RATING */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <span className="text-white/50 text-sm">(4.9 Reviews)</span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-white/50 leading-relaxed text-sm sm:text-base mb-8">
                {product.description}
              </p>

              {/* PRICE */}
              <div className="mb-8">
                <p className="text-white/40 text-sm mb-2">Price</p>

                <h2 className="text-4xl font-bold">
                  {currency}
                  {product.price}
                </h2>
              </div>

              {/* SIZE SELECTOR */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4">
                  Select Size
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.sizes?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        px-5 py-2 rounded-xl border text-sm transition

                        ${
                          selectedSize === size
                            ? "bg-white text-black border-white"
                            : "border-white/20 text-white hover:bg-white/10"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}
              <div className="mb-10">
                <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4">
                  Quantity
                </h3>

                <div
                  className="
                    inline-flex
                    items-center
                    bg-white/5
                    border border-white/10
                    rounded-xl
                    overflow-hidden
                  "
                >
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="
                      px-5 py-3
                      hover:bg-white/10
                      transition
                    "
                  >
                    -
                  </button>

                  <span className="px-6">{quantity}</span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="
                      px-5 py-3
                      hover:bg-white/10
                      transition
                    "
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {/* ADD TO CART */}
                <button
                  className="
                    flex-1
                    bg-white
                    text-black
                    py-4
                    rounded-2xl
                    font-semibold

                    hover:bg-gray-200
                    transition
                    active:scale-95
                  "
                >
                  Add To Cart
                </button>

                {/* BUY NOW */}
                <button
                  className="
                    flex-1
                    border border-white/20
                    py-4
                    rounded-2xl
                    font-semibold

                    hover:bg-white/10
                    transition
                    active:scale-95
                  "
                >
                  Buy Now
                </button>
              </div>

              {/* DELIVERY INFO */}
              <div
                className="
                  bg-white/5
                  border border-white/10
                  rounded-3xl
                  p-6
                  backdrop-blur-md
                "
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-white/10
                        flex items-center justify-center
                      "
                    >
                      <FaTruck />
                    </div>

                    <div>
                      <h4 className="font-medium">Free Delivery</h4>

                      <p className="text-white/50 text-sm">
                        On orders above ₹999
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-white/10
                        flex items-center justify-center
                      "
                    >
                      <FaUndo />
                    </div>

                    <div>
                      <h4 className="font-medium">Easy Returns</h4>

                      <p className="text-white/50 text-sm">
                        7 day return policy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-12 h-12
                        rounded-2xl
                        bg-white/10
                        flex items-center justify-center
                      "
                    >
                      <FaShieldAlt />
                    </div>

                    <div>
                      <h4 className="font-medium">Secure Payments</h4>

                      <p className="text-white/50 text-sm">
                        100% protected checkout
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="mt-28">
              {/* HEADER */}
              <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                  Related Products
                </p>

                <h2 className="text-3xl md:text-5xl font-bold">
                  You May Also Like
                </h2>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/products/${item._id}`)}
                    className="
                      group
                      bg-white/5
                      border border-white/10
                      rounded-2xl
                      overflow-hidden
                      backdrop-blur-md

                      hover:border-white/20
                      hover:-translate-y-1

                      transition-all duration-300
                      cursor-pointer
                    "
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden">
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="
                          w-full
                          h-72
                          object-cover

                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                        {item.category}
                      </p>

                      <h3 className="text-lg font-semibold line-clamp-1 mb-3">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <h4 className="text-2xl font-bold">
                          {currency}
                          {item.price}
                        </h4>

                        <button
                          className="
                            bg-white
                            text-black
                            px-4 py-2
                            rounded-lg
                            text-sm
                            font-medium
                          "
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
