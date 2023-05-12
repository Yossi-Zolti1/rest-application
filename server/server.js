import express from 'express';
import path from 'path';
import * as url from 'url';
import cors from 'cors';
import fileUpload from "express-fileupload";
import { notFound } from './src/middleware/pageNotFound.js';
import customersRoutes from './src/router/customersRoutes.js';
import ownerRoutes from './src/router/ownerRoutes.js';
import adminRoutes from './src/router/adminRoutes.js';
import AuthController from './src/controllers/AuthController.js';
import authToken from './src/middleware/authToken.js';
import dotenv from 'dotenv';
dotenv.config();
// import logger from'./middleware/logger.js';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function server() {

   const app = express();
   app.use(express.json());
   //  app.use(logger);

   app.use(fileUpload({
      limits: { fileSize: 1024 * 1024 * 5 }
   }))

   app.use(express.urlencoded({ extended: false }));
   app.use(express.static(path.join(__dirname, 'public')));

   // הגדרת אדרים מומלצים של אקספרס
   app.use(
      cors({
         origin: "*",
      })
   );

   app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
   });

   app.get('/', (req, res) => {
      res.send("home");
   });
   app.post('/login', AuthController.Login);
   app.post('/forgotPassword', AuthController.forgotPassword);
   app.put('/resetPassword', authToken, AuthController.resetPassword);

   app.use('/customer', customersRoutes);
   app.use('/owner', ownerRoutes);
   app.use('/admin', adminRoutes);
   app.use('*', notFound);

}

