import React, { useRef, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import { Points, ShaderMaterial, DoubleSide } from 'three';
import { TurbulenceShader } from '../../shaders/TurbulenceShader';

function Cylinder(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Points>();
    const mat = useRef<ShaderMaterial>();

    useEffect(() => {
        if (mesh.current) {
            mesh.current.position.z = 100;
        }
        if (mat.current) {
            mat.current.uniforms.amplitude.value = props.amplitude;
            mat.current.uniforms.frequency.value = props.frequency;
        }
    });

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(({ clock }) => {
        // mesh.current!.rotation.z += 0.001;
        if (mat.current) {
            mat.current.uniforms.time.value = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <>
            <points
                {...props}
                ref={mesh}
                rotation={[Math.PI * 0.5, 0, 0]}
                rotation-z={props.rotationZ}
            >
                <cylinderBufferGeometry attach="geometry" args={[32, 32, 16, 720, 80, true]} />
                <shaderMaterial
                    attach="material"
                    ref={mat}
                    args={[TurbulenceShader]}
                    side={DoubleSide}
                />
            </points>
        </>
    );
};

export default Cylinder;
