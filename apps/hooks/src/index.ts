import express, { Request, Response } from 'express'; 
import cors from "cors"; 
import { PrismaClient } from '@repo/db';
import { HOOKS_PORT } from '@repo/utils';

const app = express();
app.use(express.json()); 
app.use(cors());

const client = new PrismaClient(); 


app.get("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
    // @ts-ignore
    // TODO: set up password authentication to check webhook is correctly run 
    const userId = req.params.userId as string; 
    const zapId = req.params.zapId as string; 
    const body = req.body; 
    
    await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId, 
                metadata: body, 
            }
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })

    res.json({
        message: "Webhook received"
    }); 
})


app.listen(HOOKS_PORT, () => {
    console.log(`webhooks listening on port ${HOOKS_PORT}`); 
})