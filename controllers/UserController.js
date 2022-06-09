import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

class UserController {

    // register
    static userRegistration = async (req, resp) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const email_check = await UserModel.findOne({ email: email });
        if (email_check) {
            resp.send({ "status": "0", "response_code": "400", "message": "Email already exists" });
        }
        else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(12);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const document = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                            tc: tc
                        });
                        const user_response = await document.save();
                        const token= jwt.sign({user_id:user_response._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});

                        resp.status(200).send({ "status": "1", "response_code": "200", "message": user_response,'token':token });



                    }
                    catch (error) {
                        resp.status(400).send({ "status": "0", "response_code": "400", "message": error });

                    }



                }
                else {
                    resp.status(400).send({ "status": "0", "response_code": "400", "message": "password and confirm password must be same" });

                }

            }
            else {
                resp.send({ "status": "0", "response_code": "400", "message": "All fields are required" });

            }

        }
    }
    
    // login
    static userLogin = async (req, resp) => {
        const { email, password } = req.body;
        if (email && password) {
            const user = await UserModel.findOne({ email: email });
            if (user !=null) {
                const isMatch = await bcrypt.compare(password, user.password);
                // console.log(user.email,isMatch);
                if ((user.email === email) && (isMatch===true)) {
                    try {
                        //Genrate Token
                        const token= jwt.sign({user_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        resp.status(200).send({ "result": user, "status": "1", "response_code": "200", "message": "Login Successfully","token":token });

                    } catch (error) {
                        resp.status(400).send({ "status": "0", "response_code": "400", "message": "Something wents wrong" });

                    }
                }
                else {
                    // console.log('shah');
                    resp.status(400).send({ "status": "0", "response_code": "400", "messsage": "invalid crediantials" });

                }
            }
            else {
                resp.status(400).send({ "status": "0", "response_code": "400", "messsage": "Email does not exists" });
            }
        }
        else {
            resp.status(400).send({ "status": "0", "response_code": "400", "messsage": "All fields are required" });

        }



    }

    // password change
    static changeUserPassword=async (req,resp)=>{
        const {password,password_confirmation}=req.body
        if(password && password_confirmation)
        {
            if(password === password_confirmation)
            {
                const salt=await bcrypt.genSalt(10);
                const newHashPassword=await bcrypt.hash(password,salt);
                // console.log('user',req.user);
                await UserModel.findByIdAndUpdate(req.user._id,{$set:{'password':newHashPassword}});
                resp.status(200).send({"status": "1", "response_code": "200", "message": "Password changed Successfully" });


            }
            else
            {
                resp.status(200).send({"status": "0", "response_code": "400", "message": "Password and confirm password are not same" });

            }

        }
        else
        {
            resp.status(200).send({ "status": "0", "response_code": "400", "message": "All fields are required" });

        }
    }
}

export default UserController;
