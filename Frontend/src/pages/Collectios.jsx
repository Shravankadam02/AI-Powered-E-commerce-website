import React, { useContext, useMemo, useState } from "react";
import Navbar from "../components/Nav.jsx";
import { ShopDataContext } from "../context/ShopContext.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const Collections = () => {

  const {
    products,
    search,
    loading,
  } = useContext(ShopDataContext);

  const navigate = useNavigate();

  const [showFilters, setShowFilters] = useState(false);

  // 🔥 FILTER STATES
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedSubCategories, setSelectedSubCategories] =
    useState([]);

  const [selectedSizes, setSelectedSizes] = useState([]);

  const [showBestseller, setShowBestseller] =
    useState(false);

  // 🔥 FILTER OPTIONS
  const categories = ["Men", "Women", "Kids"];

  const subCategories = [
    "Topwear",
    "Bottomwear",
    "Winterwear",
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // 🔥 TOGGLE FILTER
  const toggleFilter = (value, state, setState) => {

    if (state.includes(value)) {

      setState(
        state.filter((item) => item !== value)
      );

    } else {

      setState([...state, value]);

    }
  };

  // 🔥 FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {

    let filtered = [...products];

    // 🔥 SEARCH FILTER
    if (search) {

      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    }

    // 🔥 CATEGORY FILTER
    if (selectedCategories.length > 0) {

      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );

    }

    // 🔥 SUBCATEGORY FILTER
    if (selectedSubCategories.length > 0) {

      filtered = filtered.filter((product) =>
        selectedSubCategories.includes(
          product.subCategory
        )
      );

    }

    // 🔥 SIZE FILTER
    if (selectedSizes.length > 0) {

      filtered = filtered.filter((product) =>
        product.sizes?.some((size) =>
          selectedSizes.includes(size)
        )
      );

    }

    // 🔥 BESTSELLER FILTER
    if (showBestseller) {

      filtered = filtered.filter(
        (product) => product.bestseller === true
      );

    }

    return filtered;

  }, [
    products,
    search,
    selectedCategories,
    selectedSubCategories,
    selectedSizes,
    showBestseller,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN WRAPPER */}
      <div className="pt-28 px-4 sm:px-6 lg:px-10 pb-20">

        {/* HEADER */}
        <div className="mb-10">

          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">
            SnapCart Collections
          </p>

          <h1 className="text-3xl md:text-5xl font-bold">
            Explore Collections
          </h1>

          <p className="text-white/50 mt-4 max-w-2xl leading-relaxed text-sm sm:text-base">
            Discover curated fashion essentials crafted
            for every style, season, and occasion.
          </p>

        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* MOBILE FILTER BUTTON */}
          <div className="lg:hidden mb-5">

            <button
              onClick={() =>
                setShowFilters(!showFilters)
              }
              className="
                w-full
                bg-white/10
                border
                border-white/10
                backdrop-blur-md
                rounded-xl
                py-3
                text-sm
                font-medium
                hover:bg-white/15
                transition
              "
            >
              {showFilters
                ? "Close Filters"
                : "Open Filters"}
            </button>

          </div>

          {/* FILTER SIDEBAR */}
          <div
            className={`
              ${
                showFilters
                  ? "max-h-[1000px] opacity-100 mb-6"
                  : "max-h-0 opacity-0"
              }

              lg:opacity-100
              lg:max-h-full
              lg:mb-0

              overflow-hidden
              transition-all
              duration-300

              lg:w-72
              w-full

              bg-white/5
              border
              border-white/10

              rounded-2xl
              p-6
              backdrop-blur-md

              h-fit
              lg:sticky
              lg:top-24
            `}
          >

            {/* FILTER HEADER */}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-semibold">
                Filters
              </h2>

              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSubCategories([]);
                  setSelectedSizes([]);
                  setShowBestseller(false);
                }}
                className="
                  text-sm
                  text-white/50
                  hover:text-white
                  transition
                "
              >
                Clear
              </button>

            </div>

            {/* CATEGORY */}
            <div className="mb-8">

              <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4">
                Category
              </h3>

              <div className="flex flex-col gap-3">

                {categories.map((category) => (

                  <label
                    key={category}
                    className="
                      flex
                      items-center
                      gap-3
                      cursor-pointer
                      text-sm
                    "
                  >

                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(
                        category
                      )}
                      onChange={() =>
                        toggleFilter(
                          category,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                      className="accent-white"
                    />

                    {category}

                  </label>

                ))}

              </div>

            </div>

            {/* SUBCATEGORY */}
            <div className="mb-8">

              <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4">
                Sub Category
              </h3>

              <div className="flex flex-col gap-3">

                {subCategories.map((sub) => (

                  <label
                    key={sub}
                    className="
                      flex
                      items-center
                      gap-3
                      cursor-pointer
                      text-sm
                    "
                  >

                    <input
                      type="checkbox"
                      checked={selectedSubCategories.includes(
                        sub
                      )}
                      onChange={() =>
                        toggleFilter(
                          sub,
                          selectedSubCategories,
                          setSelectedSubCategories
                        )
                      }
                      className="accent-white"
                    />

                    {sub}

                  </label>

                ))}

              </div>

            </div>

            {/* SIZES */}
            <div className="mb-8">

              <h3 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-4">
                Sizes
              </h3>

              <div className="flex flex-wrap gap-3">

                {sizes.map((size) => (

                  <button
                    key={size}
                    onClick={() =>
                      toggleFilter(
                        size,
                        selectedSizes,
                        setSelectedSizes
                      )
                    }
                    className={`
                      px-3
                      py-1
                      rounded-lg
                      border
                      text-sm
                      transition

                      ${
                        selectedSizes.includes(size)
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

            {/* BESTSELLER */}
            <div>

              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                  text-sm
                "
              >

                <input
                  type="checkbox"
                  checked={showBestseller}
                  onChange={() =>
                    setShowBestseller(!showBestseller)
                  }
                  className="accent-white"
                />

                Bestseller Only

              </label>

            </div>

          </div>

          {/* PRODUCTS */}
          <div className="flex-1">

            {/* LOADING */}
            {loading ? (

              <div className="flex items-center justify-center h-[60vh]">

                <div
                  className="
                    w-12
                    h-12
                    border-4
                    border-white/20
                    border-t-white
                    rounded-full
                    animate-spin
                  "
                ></div>

              </div>

            ) : filteredProducts.length === 0 ? (

              /* EMPTY */
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">

                <h2 className="text-2xl font-semibold mb-3">
                  No Products Found
                </h2>

                <p className="text-white/40">
                  Try changing your filters.
                </p>

              </div>

            ) : (

              <>
                {/* RESULT COUNT */}
                <div className="mb-6 flex items-center justify-between">

                  <p className="text-white/50 text-sm">
                    Showing {filteredProducts.length} products
                  </p>

                </div>

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                  {filteredProducts.map((product) => (

                    <div
                      key={product._id}
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="
                        group
                        bg-white/5
                        border
                        cursor-pointer
                        border-white/10
                        rounded-2xl
                        overflow-hidden
                        backdrop-blur-md

                        hover:border-white/20
                        hover:-translate-y-1

                        transition-all
                        duration-300
                      "
                    >

                      {/* IMAGE */}
                      <div className="relative overflow-hidden">

                        <img
                          src={product.image1}
                          alt={product.name}
                          className="
                            w-full
                            h-72
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                          "
                        />

                        {/* BADGE */}
                        {product.bestseller && (

                          <span
                            className="
                              absolute
                              top-3
                              left-3

                              bg-white
                              text-black

                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-wider

                              px-3
                              py-1
                              rounded-full
                            "
                          >
                            Bestseller
                          </span>

                        )}

                      </div>

                      {/* CONTENT */}
                      <div className="p-5">

                        {/* CATEGORY */}
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                          {product.category} •{" "}
                          {product.subCategory}
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

                          {product.sizes?.map(
                            (size, index) => (
                              <span
                                key={index}
                                className="
                                  px-2
                                  py-1
                                  text-xs
                                  border
                                  border-white/10
                                  rounded-md
                                  text-white/70
                                "
                              >
                                {size}
                              </span>
                            )
                          )}

                        </div>

                        {/* FOOTER */}
                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-xs text-white/40 mb-1">
                              Price
                            </p>

                            <h3 className="text-2xl font-bold">
                              ₹{product.price}
                            </h3>

                          </div>

                          <button
                            className="
                              bg-white
                              text-black
                              px-4
                              py-2
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
              </>
            )}

          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Collections;