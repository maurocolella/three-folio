import React, { Suspense, useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
const Swarm =  React.lazy(() => import(
    /* webpackChunkName: "Swarm" */ './components/Swarm'));
const BlurEffect = React.lazy(() => import(
    /* webpackChunkName: "BlurEffect" */ './components/BlurEffect'));

function App() {
    const mouse = useRef([300, -200]);
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) =>
        (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    return (
        <Canvas
            camera={{ fov: 75, position: [0, 0, 700], zoom: 10 }}
            onMouseMove={onMouseMove}
            orthographic={false}
        >
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Swarm count={16000} mouse={mouse} />
            </Suspense>
            <Suspense fallback={null}>
                <BlurEffect />
            </Suspense>
        </Canvas>
    );
}

export default App;
