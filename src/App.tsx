import React, { Suspense, useRef, useCallback } from 'react';
import { Controls, useControl } from 'react-three-gui';
import { Canvas } from 'react-three-fiber';
// const Swarm =  React.lazy(() => import(
    /* webpackChunkName: "Swarm" */ // './components/Swarm'));
const Cylinder =  React.lazy(() => import(
    /* webpackChunkName: "Cylinder" */ './components/Cylinder'));
const PostProcessor = React.lazy(() => import(
    /* webpackChunkName: "PostProcessor" */ './components/PostProcessor'));

function App() {
    const mouse = useRef([300, -200]);
    const onMouseMove = useCallback(({ clientX: x, clientY: y }) =>
        (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), []);

    const rotationZ = useControl('Rotation Z', { type: 'number' });
    const amplitude = useControl('Amplitude', { type: 'number', value: 8, min: 0, max: 32 });
    const frequency = useControl('Frequency', { type: 'number', value: 0.2, min: 0, max: 0.5 });

    return (
        <>
            <Canvas
                camera={{ fov: 45, position: [0, 0, 1000], zoom: 10 }}
                onMouseMove={onMouseMove}
                orthographic={false}
                colorManagement
            >
                <ambientLight />
                <Suspense fallback={null}>
                    <Cylinder
                        rotationZ={rotationZ}
                        amplitude={amplitude}
                        frequency={frequency}
                    />
                </Suspense>
                <Suspense fallback={null}>
                    <PostProcessor />
                </Suspense>
            </Canvas>
            <Controls />
        </>
    );
}

export default App;
