import jwt from 'jsonwebtoken'; 
import { JWT_PASSWORD } from './config';

export const authMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization as unknown as string; 
    try{
        const payload = jwt.verify(token, JWT_PASSWORD); 
        // @ts-ignore
        req.id = payload.id;
        next(); 
    } catch(e) {
        return res.status(403).json({
            message: "Your credentials are incorrect"
        }); 
    }
}