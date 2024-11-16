import { Router } from 'express';   
import { PrismaClient } from "@repo/db"; 
import { ZapCreateSchema } from '../config.js';
import { authMiddleware } from '../authMiddleware.js';
import { client } from '../db/index.js';

const zapRouter = Router(); 

zapRouter.post("/", authMiddleware, async(req: any, res: any) => {
    const id = req.id; 
    const parsedData = ZapCreateSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect request body"
        }); 
    }

    const zapId = await client.$transaction(async  (tx) => {
        const zap = await tx.zap.create({
            data: {
                user: {
                    connect: {
                        id: id
                    }
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                triggerId: parsedData.data.availableTriggerId, 
                zapId: zap.id
            }
        }); 

        const actions = await tx.action.createManyAndReturn({
            data: parsedData.data.actions.map((x, index) => ({
                actionId: x.availableActionId,
                sortingOrder: index,
                metadata: x.actionMetadata, 
                zapId: zap.id
            }))
        });

        return zap.id;
    })
    const result = await client.zap.findFirst({
        where: {
            id: zapId
        }, 
        include: {
            trigger: {
                include: {
                    type: true
                }
            }, 
            actions: {
                include: {
                    action: true, 
                }
            }
        }
    })
    return res.json({
        result
    }); 
})

zapRouter.get("/", authMiddleware, async(req: any, res: any) => {
    const id = req.id; 
    const zaps = await client.zap.findMany({
        where:{
            userId: id
        }, 
        include: {
            trigger: {
                include: {
                    type: true
                }
            }, 
            actions: {
                include: {
                    action: true
                }
            }
        }
    }); 

    if(!zaps){
        return res.status(411).json({
            message: "Zap Not found"
        }); 
    }
    return res.json({
        zap: zaps
    });
})

// GET: zap along with actions
zapRouter.get("/:zapId", authMiddleware, async(req: any, res: any) => {
    const zapId = req.params.zapId; 
    const id = req.id; 
    const zap = await client.zap.findFirst({
        where:{
            id: zapId, 
            userId: id
        }, 
        include: {
            trigger: {
                include: {
                    type: true
                }
            }, 
            actions: {
                include: {
                    action: true
                }
            }
        }
    }); 

    if(!zap){
        return res.status(411).json({
            message: "Zap Not found"
        }); 
    }
    return res.json({
        zap: zap
    }); 
})

export {zapRouter}