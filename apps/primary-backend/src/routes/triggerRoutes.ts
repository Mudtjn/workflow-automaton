import {Router} from 'express';  
import { client } from '../db/index.js';

const triggerRouter = Router()

triggerRouter.get("/available", async(req: any, res: any) => {
    const availableTriggers = await client.availableTriggers.findMany(); 
    return res.json({
        availableTriggers
    }); 
}); 

export {triggerRouter}; 