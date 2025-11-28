import express from 'express';
import morgan from "morgan";
import linkRoutes from './routes/shortnerRoute.js';
import authRoutes from './routes/authRoute.js';
import { env } from './utils/env.js';
import requestIp from 'request-ip';
import cookieParser from 'cookie-parser';
import { errorHandler } from "./middleware/errorHandler.js";
import { verifyAuthentication } from "./middleware/verifyAuthentication.js";
const app = express();

app.use(express.json());
app.use(morgan("dev")); 
app.use(cookieParser());
app.use(errorHandler);
app.use(requestIp.mw())
app.use('/api/auth', authRoutes);
app.use(verifyAuthentication);
app.use('/api/shortner', linkRoutes);
app.listen(env.PORT, ()=>{
   console.log(`server is running at ${env.PORT}`);
})