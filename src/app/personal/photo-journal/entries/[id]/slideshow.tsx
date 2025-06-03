'use client';


import React, { useEffect, useState } from 'react';
import CloudinaryImage from '@/components/CloudinaryImage';


interface SlideshowProps {
    publicIds: string[];
}

export default function Slideshow({ publicIds }: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? publicIds.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === publicIds.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const urlStem = 'https://res.cloudinary.com/do1jm1nuc/image/upload/v1742830727/'
        publicIds.forEach((publicId) => {
            const img = new Image();
            img.src = `${urlStem}${publicId}.jpg`; // Assuming the images are in JPG format
        })

    }, [publicIds])


    if (!publicIds || publicIds.length === 0) {
        return <div>No images to display</div>;
    }


    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <CloudinaryImage
                    src={publicIds[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    width={800}
                    height={450}
                    journalEntryID={0} // Placeholder, can be replaced with actual ID if needed
                />

                {publicIds.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                            ←
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {publicIds.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {publicIds.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}