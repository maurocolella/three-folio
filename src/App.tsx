import React, { Suspense, useRef, useCallback } from 'react';
import { Canvas } from 'react-three-fiber';
const Cylinder =  React.lazy(() => import(
    /* webpackChunkName: "Cylinder" */ './components/Cylinder'));
const BlurEffect = React.lazy(() => import(
    /* webpackChunkName: "BlurEffect" */ './components/BlurEffect'));

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
            <Suspense fallback={null}>
                <Cylinder />
            </Suspense>
            <Suspense fallback={null}>
                <BlurEffect />
            </Suspense>
        </Canvas>
    );
}

export default App;
