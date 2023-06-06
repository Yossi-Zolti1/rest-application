import express from 'express';
import path from 'path';
import * as url from 'url';
import cors from 'cors';
import fileUpload from "express-fileupload";
import sequelize from './config/database/db.js';
import { notFound } from './src/middleware/pageNotFound.js';
import customersRoutes from './src/router/customersRoutes.js';
import ownerRoutes from './src/router/ownerRoutes.js';
import adminRoutes from './src/router/adminRoutes.js';
import authRoutes from './src/router/authRoutes.js';
import dotenv from 'dotenv';
//import UserDB from './config/models/users.js';
import Restaurant from './config/models/restaurants.js';
import Menu from './config/models/menus.js';
import Department from './config/models/departments.js';
import Item from './config/models/items.js';

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

   Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id' });
   Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
   Menu.hasMany(Department, { foreignKey: 'menu_id' });
   Department.belongsTo(Menu, { foreignKey: 'menu_id' });
   Department.hasMany(Menu, { foreignKey: 'department_id' });
   Item.belongsTo(Department, { foreignKey: 'department_id' });

   sequelize.sync().then(async (results) => {
      // try {
      //    for (const userData of usersData) {
      //      await UserDB.create(userData);
      //    }
      //    console.log('Users inserted successfully.');
      //  } catch (error) {
      //    console.error('Error inserting users:', error);
      //  }
      //   await RestDB.create(restaurantsData);
      //  await MenuDB.create(menusData);
      //   await DepartmentDB.create(departmentsData);
      //   await ItemDB.create(itemsData);
   });


   app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
   });

   app.get('/', (req, res) => {
      res.send("home");
   });

   app.use('/auth', authRoutes);
   app.use('/customer', customersRoutes);
   app.use('/owner', ownerRoutes);
   app.use('/admin', adminRoutes);
   app.use('*', notFound);

}



// const usersData = [
//    {
//      name: 'yosefAdmin',
//      email: 'yberman8@gmail.com',
//      phone: '0542608100',
//      password: '$2b$10$WBkj0GbpSdpe7eTzF2Z9mewpUIXHw.zIcDbfGeDSjVnVbXhlMTTsy',
//      role: 'admin'
//    },
//    {
//      name: 'yosefowner',
//      email: 'yberman88@gmail.com',
//      phone: '0542608100',
//      password: '$2b$10$u8wunyQVaqoWm6D4Ho/94uhyceu9xZW.rxz3M3YBEam0FL3Wfqbdm',
//      role: 'owner'
//    },
//    {
//      name: 'yosefuser',
//      email: 'yberman888@gmail.com',
//      phone: '0542608100',
//      password: '$2b$10$oLhE6PUUUZkNy6S/yHyyT.NT.L.po1PqM6wwh88eTSDpubs.uu7J2',
//      role: 'user'
//    },
//  ];

//  const restaurantsData = 
//    {
//       name: '5הסטקייה',
//       street: 'rashba',
//       city: 'modiin illit',
//       phone: '083750720',
//       kashrut: 'העדה החרדית',
//       type: 'בשרי',
//       logo: '/logo/2023-05-14_03-30-51_17962_id6.jpg',
//       owner_id: 2,
//    };

//    const menusData = 
//    {
//       name: 'תפריט ראשי',
//       restaurant_id: 1,
//    };

   // const departmentsData = 
   // {
   //    name: 'קינוחים',
   //    image: "",
   //    menu_id: 1,

   // };

   // const itemsData = 
   // {
   //    name: 'סלט חלומי',
   //    description: "סלט בתוספת חלומי ובטטה",
   //    price: 60,
   //    image: "",
   //    comment: "מומלץ ביותר!",
   //    department_id: 1,

   // };