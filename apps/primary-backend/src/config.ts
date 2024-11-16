import z from 'zod'; 

export const SignupSchema = z.object({
    name: z.string().min(5), 
    email: z.string().min(6, "This field is required").email("Not a valid email"), 
    password: z.string().min(8)
}); 

export const SigninSchema = z.object({
    email: z.string().email("Not a valid email"), 
    password: z.string()
})

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional(),
    }))
});

export const JWT_PASSWORD = process.env.JWT_PASSWORD || "abc123"; 