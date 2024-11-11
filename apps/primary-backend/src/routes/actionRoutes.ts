import {Router} from 'express';
import { client } from '../db/index.js';
const actionRouter = Router();

actionRouter.get("/available", async (req: any, res: any) => {
    const availableActions = await client.availableActions.findMany({}); 
    return res.json({
        availableActions
    }); 
}); 

export {actionRouter}; 