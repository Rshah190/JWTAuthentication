import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

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


    //logged user detais
    static loggedUser=async (req,resp)=>{
        resp.status(200).send({"user":req.user,"response_code":"200","status":"1"})
    }
    // send user reset mail
    static sendUserPasswordResetEmail = async(req,resp)=>{
        const {email}=req.body
        if(email)
        {
            const user= await UserModel.findOne({email:email});
            const secret=user._id+process.env.JWT_SECRET_KEY;
            if(user)
            {
                const token=jwt.sign({
                    user_id:user._id
                },secret,{expiresIn:'15m'});
                const link=`http:127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
                console.log(link);

                let info = await transporter.sendMail({
                    from:process.env.EMAIL_FROM,
                    to:user.email,
                    subject:'Rakesh shop|  Password Reset Link',
                    html:`<a href=${link}>Click here</a>`
                })
                resp.status(200).send({"nessage":"email send Successfully","response_code":"204","status":"1"})

            }
            else
            {
                resp.status(200).send({"nessage":"email does not exists","response_code":"204","status":"1"})

            }

        }
        else
        {
            resp.status(400).send({"message":"Email is required","response_code":400,"status":1});
        }
    }
    static userPasswordReset=async(req,resp)=>{
     const{password,password_confirmation}=req.body;
     const{id,token}=req.params;
     const user=await UserModel.findById(id);

     const new_secret=user._id+process.env.JWT_SECRET_KEY;
     try {
        jwt.verify(token,new_secret);
        if(password && password_confirmation)
        {
            if(password === password_confirmation)
            {
                const salt=await bcrypt.genSalt(10);
                const newHashPassword=await bcrypt.hash(password,salt);
                // console.log('user',req.user);
                await UserModel.findByIdAndUpdate(user._id,{$set:{'password':newHashPassword}});
                resp.status(200).send({"status": "1", "response_code": "200", "message": "Password reset Successfully" });


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

     } catch (error) {
        console.log(error);
        resp.status(400).send({"message":"Invalid token","status":"0","response_code":"400"});
     }
    }
}

export default UserController;
