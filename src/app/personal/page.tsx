'use client';

import { Canvas } from '@react-three/fiber'

import { ExtrudedStar } from './shapes';
import { useRouter } from 'next/navigation';


export default function PersonalPage() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/personal/photo-journal');
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>{"Rowan's Personal Website"}</h1>
            <p className="personal-page__description">This is a personal page.</p>
            <Canvas
            style={{flex: 1, width: '100%', height: '100%'}}
            camera={{ position: [ 0, -1, 7] }}
            >
                {/* <TorusKnot position={[0, 0, 0]} /> */}
                {/* <ambientLight /> */}
                {/* <spotLight position={[10, 0, 10]} angle={0.5} penumbra={1} decay={0} intensity={Math.PI/2} /> */}
                {/* <pointLight position={[10, 10, 10]} decay={0} intensity={Math.PI} /> */}
                <ExtrudedStar
                    position={[0, 0, 0]}
                    onClick={() => handleClick()}
                    // Make the cursor change to a pointer when hovering over the star
                    onPointerEnter={() => document.body.style.cursor = 'pointer'}
                    onPointerLeave={() => document.body.style.cursor = 'default'}
                />
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

// interface SliderProps {
//     min: number;
//     max: number;
//     value: number;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// function Slider({ min, max, value, onChange }: SliderProps) {
//     return (
//         <div>
//             <input
//             type="range"
//             min={min}
//             max={max}
//             value={value}
//             step={0.01}
//             onChange={(event) => onChange(event)}
//             />
//         </div>
//     )
// }
