import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

var checkUserAuth=async (req,resp,next)=>{
    let token;
    // Get token from header
    const {authorization}=req.headers;
    // console.log(authorization);
    if(authorization && authorization.startsWith('Bearer'))
    {
        try {
            token = authorization.split(' ')[1];
            console.log(token);
            //verify token
            const {user_id}=jwt.verify(token,process.env.JWT_SECRET_KEY);

            // Get user from token
            req.user=await UserModel.findById(user_id).select('-password');
            next();
        } catch (error) {
            resp.status(400).send({"message":error,"response_code":"400","status":"0"})
        }
    }


    if(!token)
    {
     resp.status(401).send({"message":"Unauthorized user,No token","status":"0","response_code":"401"});
    }
}


export default checkUserAuth;