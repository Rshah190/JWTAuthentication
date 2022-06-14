import express from "express";
const router = express.Router();
import checkUserAuth from "../middlewares/auth_middleware.js";
import ProductController from "../controllers/ProductController.js";


// Route level middleware to protect routes
router.use('/addProduct',checkUserAuth);

//Public Routes

router.post('/addProduct',ProductController.addProduct);

//shah


//Protected Routes



export default router;