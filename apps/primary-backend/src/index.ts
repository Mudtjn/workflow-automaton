import express from 'express'; 
import cors from 'cors' ;
import {BACKEND_PORT} from "@repo/utils"; 
import { userRouter } from './routes/userRoutes.js';
import { zapRouter } from './routes/zapRoutes.js';

const app = express();
app.use(express.json()); 
app.use(cors()); 

app.use("/api/v1/user", userRouter); 
app.use("/api/v1/zap", zapRouter); 

app.listen(BACKEND_PORT, () => {
    console.log(`Primary Backend listening on port ${BACKEND_PORT}`); 
})