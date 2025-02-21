'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'


export default function PersonalPage() {
    return (
        <div className="personal-page">
            <h1>Personal Page</h1>
            <p className="personal-page__description">This is a personal page.</p>
            <Canvas>
                <ambientLight />
                <spotLight position={[10, 10, 10]} angle={0.4} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[-3.6, 0, 0]} />
                <Box position={[3.6, 0, 0]} />
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

function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!) // null! avoids typescript non-null checks
    useFrame((state, delta) => (ref.current.rotation.y += delta))

    return (
        <mesh
        {...props}
        ref={ref}
        // scale={clicked ? 1.5 : 1}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
        >
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    )
}

