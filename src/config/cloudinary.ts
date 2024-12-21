import { v2 as cloudinary } from 'cloudinary';
import { globalEnvironment } from './dotenv';

globalEnvironment();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export { cloudinary };