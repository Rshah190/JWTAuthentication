import mongoose from "mongoose";

// Define Schema
const ProductSchema=new mongoose.Schema({
    user_id:{type:String},
    name:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    color_code:{type:String,required:true,trim:true},
    product_code:{type:String,required:true,trim:true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  });

 // Define Model
 const ProductModel=mongoose.model("products",ProductSchema);

 export default ProductModel;