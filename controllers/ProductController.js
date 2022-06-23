import ProductModel from "../models/Product.js";
import ProductImageModel from "../models/ProductImage.js";
import UserModel from "../models/User.js";
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
                    const product_response = await document.save();
                    for (let i = 0; i < req.files.length; i++) {
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
   static allProducts=async (req,resp)=>{
    const products=await ProductModel.find({user_id:req.user._id});
    console.log(products.length);
    let response=[];
    let ObjectArray=[];
    for(var i=0;i<products.length;i++)
    {
      ObjectArray['id']=products[i]._id;
      ObjectArray['name']=products[i].name;
      ObjectArray['description']=products[i].description;
      ObjectArray['product_code']=products[i].product_code;
      ObjectArray['color_code']=products[i].color_code;


      let productImageArray=[];
      let productObjectArray=[];
      const product_images=await ProductImageModel.find({product_id:products[i]._id});
      console.log(product_images);

      for(var j=0;j<product_images.length;j++)
      {
        productObjectArray['image_id']=product_images[j]._id;
        productObjectArray['image_url']=product_images[j].image;
        productImageArray.push(productObjectArray);
      }
      ObjectArray['product_images']=productImageArray;
      response.push(ObjectArray);
    }
    
    resp.status(200).send({"result":response,"message":"User fetch Successfully","response_code":200,"status":"1"})

   }
}

export default ProductController;