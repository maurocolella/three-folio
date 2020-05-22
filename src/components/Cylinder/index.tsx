import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Points, ShaderMaterial, DoubleSide } from 'three';
import { TurbulenceShader } from '../../shaders/TurbulenceShader';

function Cylinder(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<Points>();
    const mat = useRef<ShaderMaterial>();
    if (mat.current) {
        mat.current.uniforms.magnitude.value = props.magnitude;
        mat.current.uniforms.frequency.value = props.frequency;
    }

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(({ clock }) => {
        // mesh.current!.rotation.z += 0.001;
        mesh.current!.position.z = 100;
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
                <cylinderBufferGeometry attach="geometry" args={[32, 32, 32, 720, 160, true]} />
                <shaderMaterial
                    attach="material"
                    ref={mat}
                    args={[TurbulenceShader]}
                />
            </points>
        </>
    );
};

export default Cylinder;
