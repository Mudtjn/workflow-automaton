import { Router } from 'express';   
import { JWT_PASSWORD, SigninSchema, SignupSchema } from '../config.js';
import jwt from "jsonwebtoken"; 
import { authMiddleware } from '../authMiddleware.js';
import { client } from '../db/index.js';

const userRouter = Router(); 

userRouter.post("/signup", async (req: any, res: any) => {
    // TODO: encrypt password and store in db
    const parsedBody = SignupSchema.safeParse(req.body); 
    if(!parsedBody.success){
        return res.status(411).json({
            message: "Invalid Body sent"
        }); 
    }
    
    const userExists = await client.user.findFirst({
        where: {
            email: parsedBody.data?.email
        }
    }); 
    if(userExists){
        return res.status(409).json({
            message: "User Already Exists"
        }); 
    }
    const user = await client.user.create({
        data: {
            name: parsedBody.data?.name || "", 
            email: parsedBody.data?.email || "", 
            password: parsedBody.data?.password || ""
        }
    }); 

    return res.json({
        message: "User sign up successful"
    });
});

userRouter.post("/signin", async(req: any, res: any)=>{
    const parsedData = SigninSchema.safeParse(req.body); 
    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        }); 
    }

    const user = await client.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    }); 

    if(!user){
        return res.status(403).json({
            message: "Invalid Credentials"
        }); 
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD); 

    res.json({
        token: token
    }); 
});

userRouter.get("/", authMiddleware, async (req: any, res: any) => {
    // @ts-ignore
    const id = req.id;
    const user = await client.user.findFirst({
        where: {
            id: id
        }, 
        select: {
            name: true, 
            email: true
        }
    }); 

    return res.json({
        user: user
    })
})

export {userRouter}; 