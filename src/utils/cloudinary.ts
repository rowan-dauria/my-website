// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
// Load environment variables from .env file
dotenv.config()

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
        'Missing required Cloudinary environment variables: ' +
        [
            !cloudName && 'CLOUDINARY_CLOUD_NAME',
            !apiKey && 'CLOUDINARY_API_KEY',
            !apiSecret && 'CLOUDINARY_API_SECRET'
        ].filter(Boolean).join(', ')
    );
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

export default cloudinary;