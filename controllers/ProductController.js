import ProductModel from "../models/Product.js";
import ProductImageModel from "../models/ProductImage.js";
import jwt from "jsonwebtoken";

class ProductController {

   static addProduct=(req,resp)=>{
    const { name, description, color_code,product_code} = req.body;
    console.log(req.body);
      resp.status(200).send({ "status": "1", "response_code": "200", "message": "Product added Successfully" });

    // const email_check = await UserModel.findOne({ email: email });
    // if (email_check) {
    //     resp.send({ "status": "0", "response_code": "400", "message": "Email already exists" });
    // }
    // else {
       

    // }
   }
}

export default ProductController;