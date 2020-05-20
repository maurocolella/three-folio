import { Geometry, Object3D, Material, Color } from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from 'react-three-fiber';

let geometry: unknown;
let material: unknown;

function Swarm({ count, mouse }: { count: number, mouse: any }) {
    const mesh = useRef<any>();

    const dummy = useMemo(() => new Object3D(), []);
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = 50; // Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const colorDelta = Number((1 - Math.abs(i % 40 - 20) / 20).toFixed(1));
            const pColor = new Color(colorDelta, colorDelta, colorDelta);
            temp.push({ t, factor, speed, xFactor, yFactor, pColor /* zFactor, mx: 0, my: 0 */ });
        }
        return temp;
    }, [count]);
    // The innards of this hook will run every frame
    useFrame(state => {
        // Makes the light follow the mouse
        // light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
        // Run through the randomized data to calculate some movement
        const { current } = mesh;
        particles.forEach((particle, i) => {
            let { t, speed, xFactor, yFactor, pColor } = particle;
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t += 0.01; // speed / 10;
            const segment = i % 40;
            // Update the dummy object
            dummy.position.set(
              /* xFactor * 0.02 +*/ Math.cos((i + t) * 0.1) * (50 + Math.sin(segment + (t * 10) * 0.05) * 10) ,
              /* yFactor * 0.02 +*/ Math.sin((i + t) * 0.1) * (50 + Math.cos(segment + (t * 10) * 0.05) * 10),
              segment - 20,
            );
            dummy.updateMatrix();
            // And apply the matrix to the instanced item
            current!.setMatrixAt(i, dummy.matrix);
            current!.material.color.set(pColor);
        });
        current!.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            <instancedMesh ref={mesh} args={[
                geometry as Geometry,
                material as Material,
                count,
            ]}>
                <dodecahedronBufferGeometry attach="geometry" args={[0.2, 0]} />
                <meshStandardMaterial attach="material" color="#020000" />
            </instancedMesh>
        </>
    )
}

export default Swarm;
