import express from 'express';
import path from 'path';
import * as url from 'url';
import cors from 'cors';
import { notFound } from './middleware/pageNotFound.js';
import user from './src/router/user.js';
import admin from './src/router/admin.js';
import dotenv from 'dotenv';
dotenv.config();
// import logger from'./middleware/logger.js';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function server() {

   const app = express();
   app.use(express.json());
   //  app.use(logger);
   

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

   app.use('/user', user);
   app.use('/admin', admin);
   app.use('*', notFound);

}

