'use client';
import React, { useEffect, useState, useRef } from 'react';
import CloudinaryImage from '@/components/CloudinaryImage';

interface SlideshowProps {
    publicIds: string[];
}

export default function Slideshow({ publicIds }: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        setTranslateX(diff);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;

        const threshold = 50;

        if (Math.abs(translateX) > threshold) {
            if (translateX > 0) {
                goToPrevious();
            } else if (translateX < 0) {
                goToNext();
            }
        }

        setIsDragging(false);
        setTranslateX(0);
        setStartX(0);
    };

    const checkTouchDevice = () => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    useEffect(() => {
        checkTouchDevice();

        const updateImageWidth = () => {
            setImageWidth(window.innerWidth <= 896 ? window.innerWidth : 896);
        }

        updateImageWidth(); // Set initial width
        window.addEventListener('resize', updateImageWidth);

        const urlStem = 'https://res.cloudinary.com/do1jm1nuc/image/upload/v1742830727/'
        publicIds.forEach((publicId) => {
            const img = new Image();
            img.src = `${urlStem}${publicId}.jpg`;
        })

        return () => window.removeEventListener('resize', updateImageWidth);
    }, [publicIds])

    if (!publicIds || publicIds.length === 0) {
        return <div>No images to display</div>;
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div
                ref={containerRef}
                className="relative aspect-video bg-gray-100 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="flex h-full"
                    style={{
                        transform: `translateX(${-currentIndex * 100 + (isDragging ? (translateX / (containerRef.current?.offsetWidth || 1)) * 100 : 0)}%)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                    }}
                >
                    {publicIds.map((publicId, index) => (
                        <div key={index} className="min-w-full h-full flex-shrink-0">
                            <CloudinaryImage
                                src={publicId}
                                alt={`Slide ${index + 1}`}
                                width={imageWidth}
                                height={Math.round(imageWidth * 0.6)}
                                journalEntryID={0}
                            />
                        </div>
                    ))}
                </div>

                {/* Show navigation buttons only on non-touch devices */}
                {!isTouchDevice && publicIds.length > 1 && (
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
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}