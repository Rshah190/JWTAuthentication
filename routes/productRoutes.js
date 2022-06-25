import express from "express";
const router = express.Router();
import checkUserAuth from "../middlewares/auth_middleware.js";
import ProductController from "../controllers/ProductController.js";
import multer from 'multer';
import path from "path";
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public/images/products'))
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix+path.extname(file.originalname))
      }
});

// for multiple files from different fields
// const upload = multer({ storage: storage }).fields([{
//   name: 'product_image', maxCount: 4
// }, {
//   name: 'product', maxCount: 4
// }]);


//for multiple files from field
const upload = multer({ storage: storage }).array('image',4);
// Route level middleware to protect routes
router.use('/addProduct',checkUserAuth);
router.use('/allProducts',checkUserAuth);


//Public Routes
router.post('/addProduct',upload,ProductController.addProduct);
router.get('/allProducts',ProductController.allProducts);
router.get('/allProductsPdf',ProductController.allProductsPdf);

export default router;