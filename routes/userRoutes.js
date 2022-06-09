import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import checkUserAuth from "../middlewares/auth_middleware.js";


// Route level middleware to protect routes
router.use('/changePassword',checkUserAuth);

//Public Routes

router.post('/register',UserController.userRegistration);
router.post('/login',UserController.userLogin);
router.post('/changePassword',UserController.changeUserPassword);
//shah


//Protected Routes



export default router;