"use client"

import { CldImage } from 'next-cloudinary'

export default function CloudinaryImage(
    { src, width, height, alt, ...props }: {
        src: string,
        width: number,
        height: number,
        alt: string,
    }) {
    return (
        <CldImage
            width={width}
            height={height}
            src={src}
            alt={alt}
            {...props}
        />
    )
}