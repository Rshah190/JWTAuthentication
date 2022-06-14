import mongoose from "mongoose";

// Define Schema
const ProductImageSchema=new mongoose.Schema({
    product_id:{type:String},
    image:{type:String,required:true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    });

 // Define Model
 const ProductImageModel=mongoose.model("product_images",ProductImageSchema);

 export default ProductImageModel;