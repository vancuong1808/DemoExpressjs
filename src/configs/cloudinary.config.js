import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
        return {
            folder: "uploads",
            allowed_formats: ["jpg", "jpeg", "png"],
            public_id: file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9),
        }
  },
});

const uploadCloud = multer({ storage });
export default uploadCloud;

