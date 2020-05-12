import { Geometry, Object3D, Material } from 'three';
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
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 2;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);
    // The innards of this hook will run every frame
    useFrame(state => {
        // Makes the light follow the mouse
        // light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
        // Run through the randomized data to calculate some movement
        particles.forEach((particle, i) => {
            let { t, factor, speed, zFactor } = particle
            // There is no sense or reason to any of this, just messing around with trigonometric functions
            t = particle.t -= speed / 20
            const r = 60;
            // const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)
            // particle.mx += (mouse.current[0] - particle.mx) * 0.01
            // particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
            // Update the dummy object
            dummy.position.set(
                (particle.mx / 10) + Math.cos((i / 10) * factor) * r,
                (particle.my / 10) + Math.sin((i / 10) * factor) * r,
                (particle.my / 10) * b + zFactor,
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(0, s * 5, s * 5); // s * 5)
            dummy.updateMatrix()
            // And apply the matrix to the instanced item
            const { current } = mesh;
            current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
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
