import express from "express";
const router = express.Router();
import UserController from "../controllers/UserController.js";
import checkUserAuth from "../middlewares/auth_middleware.js";
import multer from "multer";
import path from "path";

// Route level middleware to protect routes
router.use('/changePassword',checkUserAuth);
router.use('/loggedUser',checkUserAuth);
router.use('/send-password-reset-email',checkUserAuth);

// console.log(path.join('public'));
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public/users'))
      },
      filename: function (req, file, cb) {
        const uniqueSuffix =Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix+path.extname(file.originalname))
      }
});
const upload = multer({ storage: storage }).single('image');


//Public Routes
router.post('/register',upload,UserController.userRegistration);
router.post('/login',UserController.userLogin);
router.get('/loggedUser',UserController.loggedUser);

router.post('/changePassword',UserController.changeUserPassword);
router.get('/loggedUser',UserController.loggedUser);
router.post('/send-password-reset-email',UserController.sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token',UserController.userPasswordReset);



//shah


//Protected Routes



export default router;