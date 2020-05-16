import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Points, ShaderMaterial } from 'three';
import { TurbulenceShader } from '../../shaders/TurbulenceShader';

function Cylinder(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Points>();
  const mat = useRef<ShaderMaterial>();


  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
      // mesh.current!.rotation.y += 0.001;
      if (mat.current) {
        mat.current.uniforms.time.value = clock.getElapsedTime() * 0.2;
      }
  });

  return (
    <points
      {...props}
      ref={mesh}
      rotation={[Math.PI * 0.5, 0, 0]}
      size={0.01}
      >
      <cylinderBufferGeometry attach="geometry" args={[24, 24, 40, 360, 40, true]} />
      <shaderMaterial
        attach="material"
        ref={mat}
        args={[TurbulenceShader]}
      />
    </points>
  );
};

export default Cylinder;
