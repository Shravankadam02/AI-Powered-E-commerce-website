import React, { useState, useContext } from "react";
import { authDataContext } from "../context/Authcontext.jsx";
import axios from "axios";
import AdminNavbar from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Add = () => {
  const { serverUrl } = useContext(authDataContext);

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    sizes: [],
    bestseller: false,
  });

  const sizesList = ["S", "M", "L", "XL", "XXL"];

  const subCategoryMap = {
    Men: ["Topwear", "Bottomwear", "Winterwear"],
    Women: ["Topwear", "Bottomwear", "Dresses"],
    Kids: ["Topwear", "Bottomwear"],
  };

  // 🔥 Handle input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category") {
      setForm({
        ...form,
        category: value,
        subCategory: "",
      });
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // 🔥 Handle sizes
  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // 🔥 Handle image upload + preview
  const handleImage = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("subCategory", form.subCategory);
      data.append("sizes", JSON.stringify(form.sizes));
      data.append("bestseller", form.bestseller);

      data.append("image1", images[0]);
      if (images[1]) data.append("image2", images[1]);
      if (images[2]) data.append("image3", images[2]);

      const res = await axios.post(
        `${serverUrl}/api/product/add`,
        data,
        { withCredentials: true }
      );

      alert("Product Added ✅");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error adding product ❌");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141414] to-[#0c2025]">
      <AdminNavbar />
      <Sidebar />

      <div className="ml-20 md:ml-64 mt-16 px-8 text-white">
        <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg flex flex-col gap-5"
        >
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className="input"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="input h-24 resize-none"
            required
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="input"
            required
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input appearance-none"
            required
          >
            <option value="" className="bg-[#0c2025]">
              Select Category
            </option>
            <option value="Men" className="bg-[#0c2025]">Men</option>
            <option value="Women" className="bg-[#0c2025]">Women</option>
            <option value="Kids" className="bg-[#0c2025]">Kids</option>
          </select>

          {/* SUB CATEGORY */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            disabled={!form.category}
            className="input appearance-none disabled:opacity-50"
            required
          >
            <option value="" className="bg-[#0c2025]">
              Select SubCategory
            </option>

            {form.category &&
              subCategoryMap[form.category].map((sub, i) => (
                <option key={i} value={sub} className="bg-[#0c2025]">
                  {sub}
                </option>
              ))}
          </select>

          {/* SIZES */}
          <div>
            <p className="mb-2 text-sm text-gray-300">Select Sizes</p>
            <div className="flex gap-3 flex-wrap">
              {sizesList.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 border rounded ${
                    form.sizes.includes(size)
                      ? "bg-white text-black"
                      : "border-white/20 text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <p className="mb-2 text-sm text-gray-300">Upload Images</p>

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 transition">
              <span className="text-gray-400 text-sm">
                Click or Drag Images (Max 3)
              </span>
              <input
                type="file"
                multiple
                onChange={handleImage}
                className="hidden"
                accept="image/*"
              />
            </label>

            {/* PREVIEW */}
            <div className="flex gap-4 mt-4">
              {preview.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border border-white/10"
                />
              ))}
            </div>
          </div>

          {/* BESTSELLER */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="bestseller"
              onChange={handleChange}
            />
            Bestseller Product
          </label>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;