import ProductModel from "../models/Product.js";
import ProductImageModel from "../models/ProductImage.js";
import jwt from "jsonwebtoken";
import path from "path";
class ProductController {

   static addProduct=async (req,resp)=>{
    const {name, description, color_code,product_code} = req.body;
    const product_check = await ProductModel.findOne({ product_code:product_code });
        if (product_check) {
            resp.status(400).send({ "status": "0", "response_code": "400", "message": "Product already exists" });
        }
        else {
            if (name && description && color_code && product_code) 
            {
                try {
                    
                    const document = new ProductModel({
                        user_id:req.user._id,
                        name: name,
                        description: description,
                        color_code: color_code,
                        product_code: product_code,
                    });


                    for (let i = 0; i < req.files.length; i++) {
                      const product_response = await document.save();
                      const image_document = new ProductImageModel({
                      product_id:product_response._id,
                      image: req.files[i].filename,
                    });
                      await image_document.save();  
                    }
                   
                                
                  resp.status(200).send({ "status": "1", "response_code": "200", "message": product_response });

                }
                catch (error) {
                    resp.status(400).send({ "status": "0", "response_code": "400", "message": error });

                }

            }
            else 
            {
              // console.log('shah');
                resp.status(400).send({ "status": "0", "response_code": "400", "message": "All fields are required" });

            }

        }
   }
}

export default ProductController;