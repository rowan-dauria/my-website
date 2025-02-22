'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from "@react-three/drei";

import { Box, Background, Sphere, TorusKnot, ExtrudedStar } from './shapes';


export default function PersonalPage() {
    const initCameraPos = 0;
    const [posX, setPosX] = useState(initCameraPos);
    const [posZ, setPosZ] = useState(initCameraPos);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

    const handleXPosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosX(Number(event.target.value))
    }

    const handleZPosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPosZ(Number(event.target.value))
    }

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.position.x = posX;
            cameraRef.current.position.z = posZ;
        }
    }, [posX, posZ]);


    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>Personal Page</h1>
            <p className="personal-page__description">This is a personal page.</p>
            <Slider min={-10} max={10} value={posX} onChange={handleXPosChange} />
            <Slider min={-5} max={30} value={posZ} onChange={handleZPosChange} />
            <Canvas
            style={{flex: 1, width: '100%', height: '100%'}}
            camera={{ position: [ 0, 2, 5] }}
            onCreated={({ camera }) => {
                cameraRef.current = camera as THREE.PerspectiveCamera;
            }}
            >
                <ambientLight />
                <spotLight position={[10, 0, 10]} angle={0.5} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} />
                <Box position={[0, 0, 0]} />
                <TorusKnot position={[3, 0, 0]} />
                <ExtrudedStar position={[-3, 0, 0]} />
                <Background position={[0, 0, -10]} />
                <Sphere position={[4, 0, 4]} />
                <OrbitControls />
            </Canvas>
            {/* charmed circle svg */}
            {/* <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">

                <circle cx="50" cy="50" r="49" fill="none" stroke="white" strokeWidth="0.5"/>
                
                <circle cx="50" cy="50" r="33" fill="none" stroke="white" strokeWidth="0.5"/>
                
                <line x1="50" y1="1" x2="50" y2="99" stroke="white" strokeWidth="0.5"/>
                <line x1="1" y1="50" x2="99" y2="50" stroke="white" strokeWidth="0.5"/>
                <line x1="14.64" y1="14.64" x2="85.36" y2="85.36" stroke="white" strokeWidth="0.5"/>
                <line x1="85.36" y1="14.64" x2="14.64" y2="85.36" stroke="white" strokeWidth="0.5"/>
                
            </svg> */}
        </div>

    )
}

interface SliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Slider({ min, max, value, onChange }: SliderProps) {
    return (
        <div>
            <input
            type="range"
            min={min}
            max={max}
            value={value}
            step={0.01}
            onChange={(event) => onChange(event)}
            />
        </div>
    )
}
