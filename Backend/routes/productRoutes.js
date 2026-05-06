import express from 'express';
import { addProduct } from '../controller/productController.js';
import upload from '../middleware/multer.js';


const productRoutes = express.Router();

productRoutes.post('/add', 
    upload.fields([
        { name: 'image1', maxCount: 1 }, 
        { name: 'image2', maxCount: 1 }, 
        { name: 'image3', maxCount: 1 }
    ]), 
    addProduct);
    
export default productRoutes;