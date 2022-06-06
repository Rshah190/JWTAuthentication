 import mongoose from "mongoose";

 // Define Schema
 const UserSchema=new mongoose.Schema({
     name:{type:String,required:true,trim:true},
     email:{type:String,required:true,trim:true},
     password:{type:String,required:true,trim:true},
     tc:{type:Boolean,required:true}
 });

  // Define Model
  const UserModel=mongoose.model("users",UserSchema);

  export default UserModel;