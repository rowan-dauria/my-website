"use client"

import { CldImage } from 'next-cloudinary'
import { useRouter } from "next/navigation"


export default function CloudinaryImage(
    { src, width, height, alt, journalEntryID, ...props }: {
        src: string,
        width: number,
        height: number,
        alt: string,
        journalEntryID?: number, // optional for now, can be used later for more details
    }) {
    const router = useRouter()
    const onClick = () => {
        if (!journalEntryID) {
            return
        }
        router.push(`/personal/photo-journal/entries/${journalEntryID}`) // Navigate to the journal entry page
    }
    return (
        <button
            className={`w-full h-full flex items-center justify-center
                ${journalEntryID ? "hover:opacity-80" : "cursor-default"}`}
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