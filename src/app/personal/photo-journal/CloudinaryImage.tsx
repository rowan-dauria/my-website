"use client"

import { CldImage } from 'next-cloudinary'

export default function CloudinaryImage(
    { src, width, height, alt, ...props }: {
        src: string,
        width: number,
        height: number,
        alt: string,
    }) {
    const onClick = () => {
        console.log("Image clicked:", src)
    }
    return (
        <button
            className="w-full h-full flex items-center justify-center"
            onClick={onClick}
        >
            <CldImage
                width={width}
                height={height}
                src={src}
                alt={alt}
                {...props}
            />
        </button>
    )
}