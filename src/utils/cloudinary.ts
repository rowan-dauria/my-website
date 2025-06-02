// lib/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import { cache } from 'react';
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

async function fetchThumbnailPublicIDs(): Promise<{ [key: string]: string }> {
    const resources = await cloudinary.api.resources_by_tag("thumbnail")
    const thumbnailPublicIDs: { [key: string]: string } = {}
    resources.resources.forEach((resource) => {
        // assumes asset folder is the same as cloudinary_tag
        if (!resource.asset_folder) {
            console.error(`Resource ${resource.public_id} does not have an asset folder`)
            return
        }
        thumbnailPublicIDs[resource.asset_folder] = resource.public_id
    })
    return thumbnailPublicIDs
}

const fetchEntryImagePublicIDs = cache(async (folder: string): Promise<string[]> => {
    const resources = await cloudinary.api.resources_by_asset_folder(folder)
    const publicIDs: string[] = []
    resources.resources.forEach((resource) => {
        if (resource.public_id) {
            publicIDs.push(resource.public_id)
        } else {
            console.error(`Resource in folder ${folder} does not have a public ID`)
        }
    })
    return publicIDs
})

export {
    fetchThumbnailPublicIDs,
    fetchEntryImagePublicIDs,
}


