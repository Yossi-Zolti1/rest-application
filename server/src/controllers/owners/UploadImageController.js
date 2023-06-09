import path from 'path'
import fs from 'fs'

class UploadImageController {
    constructor() {
    }

    static async uploadImage(req, res, category) {

        // check that file exist
        if (!req.files?.my) {
            return res.status(406).json({ msg: 'File is not exist' });
        }

        let myFile = req.files.my;
        let owner_id = req.userId;
        let extensionsArry = [".png", ".jpg", ".jpeg", ".svg"];
        let extensionFile = path.extname(myFile.name);

        // Check file extension
        if (!extensionsArry.includes(extensionFile)) {
            return res.status(400).json({ msg: 'File must be image, png or jpg' });
        }

        // Check file size
        if (myFile.size >= 1024 * 1024 * 5) {
            return res.status(400).json({ msg: `File too big, max 5MB` });
        }
        
        let dir;
        if (category === 'logo') {
            dir = `public/logo/`
        }else{
            dir = `public/images/${category}/`
        }

        // Create directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // handle file name
        //get random number for the name file
        const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99,999
        const paddedNumber = randomNumber.toString().padStart(5, '0'); // Pad the number with zeros to ensure it is 5 digits long
        const now = new Date();
        //convert to local time
        const timezoneOffset = now.getTimezoneOffset(); // get the time zone offset in minutes
        const localTime = new Date(now.getTime() - (timezoneOffset * 60000));
        // replace all chars do not support in file name
        const formattedDate = localTime.toISOString().slice(0, 19).replace('T', '_').replace(' ', '_').replace(/:/g, '-');
        const fileName = `${formattedDate}_${paddedNumber}_id${owner_id}${extensionFile}`;

        // Move file to directory
        try {
            await myFile.mv(path.join(dir + fileName));
            const imageLink = dir.replace(/^public\//, '/') + fileName;
            return { msg: 'Upload successful', link1: imageLink };
        } catch (error) {
            return { msg: `Error: ${error.message}` };
        }



    };



}


export default UploadImageController;

