import React, { useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
import Swarm from './components/Swarm';
import Effect from './components/Effect';

function App() {
    const mouse = useRef([300, -200]);
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    return (
        <Canvas camera={{ fov: 45, position: [0, 0, 144] }} onMouseMove={onMouseMove}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Swarm mouse={mouse} count={14400} />
            <Effect />
        </Canvas>
    );
}

export default App;
