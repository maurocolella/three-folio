import React, { useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import Cylinder from './components/Cylinder';
import Effect from './components/Effect';

function App() {
    const mouse = useRef([300, -200]);
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    return (
        <Canvas camera={{ fov: 4, position: [0, 0, 1000] }} onMouseMove={onMouseMove}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Cylinder />
            <Effect />
        </Canvas>
    );
}

export default App;
