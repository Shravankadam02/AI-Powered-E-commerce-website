import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";



const addProduct = async (req, res) => {
    try {
        const { name, description, price, category,
             subCategory, sizes, bestseller } = req.body;

        const image1 = await uploadOnCloudinary(req.files.image1[0].path);
        const image2 = req.files.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
        const image3 = req.files.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;

        const productData = {
            name,
            description,
            price:Number(price),
            image1,
            image2,
            image3,
            category,
            subCategory,
            date: Date.now(),
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false
        };

        const product = await Product.create(productData);

        res.status(201).json({ message: "Product added successfully", product });

    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: error.message });
    }
}

export { addProduct }