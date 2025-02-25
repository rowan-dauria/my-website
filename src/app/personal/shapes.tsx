import { useFrame, ThreeElements } from '@react-three/fiber'
import { useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import bubbleFont from '../fonts/Modak_Regular.json';
import { Environment } from '@react-three/drei';

function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!) // null! avoids typescript non-null checks
    useFrame((state, delta) => (ref.current.rotation.y += delta))

    return (
        <mesh
        {...props}
        ref={ref}
        scale={1.5}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
        >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'blue'}/>
      </mesh>
    )
}

function Background(props: ThreeElements['mesh']) {
    return (
        <mesh {...props} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color={'lightgrey'} />
        </mesh>
    )
}

function Sphere(props: ThreeElements['mesh']) {
    return (
        <mesh {...props}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    )
}

function TorusKnot(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!) // null! avoids typescript non-null checks
    useFrame((state, delta) => (ref.current.rotation.y += delta))
    return (
        <>
            <Environment background={false} files="metro_noord_1k.hdr" />
            <mesh {...props} ref={ref}>
                <torusKnotGeometry args={[1, 0.4, 300, 16]} />
                <meshStandardMaterial color={'white'} metalness={1} roughness={0}/>
            </mesh>
        </>
    )
}

const createStarShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.5);
    shape.lineTo(0.2, 0.2);
    shape.lineTo(0.5, 0.2);
    shape.lineTo(0.25, 0);
    shape.lineTo(0.4, -0.3);
    shape.lineTo(0, -0.1);
    shape.lineTo(-0.4, -0.3);
    shape.lineTo(-0.25, 0);
    shape.lineTo(-0.5, 0.2);
    shape.lineTo(-0.2, 0.2);
    shape.closePath(); // Connects the last point to the first
    return shape;
  };

const createHelixPath = (turns: number, height: number, radius: number, points: number) => {
    const path = [];
    const angleStep = (Math.PI * 2 * turns) / points;
    const heightStep = height / points;

    for (let i = 0; i <= points; i++) {
        const angle = i * angleStep;
        const x = radius * Math.cos(angle);
        const y = i * heightStep - height / 2;
        const z = radius * Math.sin(angle);
        path.push(new THREE.Vector3(x, y, z));
    }

    return path;
};

const helixPath = new THREE.CatmullRomCurve3(createHelixPath(3, 5, 1.5, 100), false);
console.log(helixPath);

function ExtrudedStar(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!) // null! avoids typescript non-null checks
    useFrame((state, delta) => (ref.current.rotation.y += delta))
    return (
        <>
            <Environment background={false} files="metro_noord_1k.hdr" />
            <mesh {...props} ref={ref}>
                <extrudeGeometry
                    args={[
                        createStarShape(),
                        {bevelEnabled: false, extrudePath: helixPath, steps: 1000},
                    ]}
                    rotateY={Math.PI / 2}
                />
                <meshStandardMaterial color="white" roughness={.1} metalness={1} />
            </mesh>
        </>
    );
};

// https://fonts.google.com/specimen/Coiny?lang=en_Latn&script=Latn&categoryFilters=Feeling:%2FExpressive%2FPlayful




const loader = new FontLoader();

const correctedBubbleFont = {
  ...bubbleFont,
  original_font_information: {
    ...bubbleFont.original_font_information,
    format: bubbleFont.original_font_information.format.toString(),
  },
};
const font = loader.parse(correctedBubbleFont);

function BubbleText(props: ThreeElements['mesh']) {
    const textGeometry = new TextGeometry("Bubble!", {
        font,
        size: 1,
        bevelEnabled: false,
        bevelSize: 0.1,
        bevelThickness: 0.1,
        bevelSegments: 10,
        depth: 0.5,
    });
      
    const textMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        roughness: 0.05,
        metalness: 1,
    });
    return (
        <>
        <Environment background={false} files="autumn_field_puresky_1k.hdr" />
        <mesh {...props} geometry={textGeometry} material={textMaterial} />
        </>
    );
  };

export { Box, Background, Sphere, TorusKnot, ExtrudedStar, BubbleText };