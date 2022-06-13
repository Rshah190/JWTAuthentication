import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import checkUserAuth from "../middlewares/auth_middleware.js";


// Route level middleware to protect routes
router.use('/changePassword',checkUserAuth);
router.use('/loggedUser',checkUserAuth);
router.use('/send-password-reset-email',checkUserAuth);


//Public Routes

router.post('/register',UserController.userRegistration);
router.post('/login',UserController.userLogin);
router.get('/loggedUser',UserController.loggedUser);

router.post('/changePassword',UserController.changeUserPassword);
router.get('/loggedUser',UserController.loggedUser);
router.post('/send-password-reset-email',UserController.sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token',UserController.userPasswordReset);



//shah


//Protected Routes



export default router;