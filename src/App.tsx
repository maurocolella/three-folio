import React, { useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import Cylinder from './components/Cylinder';
import BlurEffect from './components/BlurEffect';

function App() {
    const mouse = useRef([300, -200]);
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    return (
        <Canvas
            camera={{ zoom: 10 }}
            onMouseMove={onMouseMove}
            orthographic
        >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Cylinder />
            <BlurEffect />
        </Canvas>
    );
}

export default App;
