import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Points } from 'three';

function Cylinder(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Points>();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
      mesh.current!.rotation.y += 0.001;
  });

  return (
    <points
      {...props}
      ref={mesh}
      rotation={[Math.PI * 0.5, 0, 0]}
      size={0.01}
      >
      <cylinderBufferGeometry attach="geometry" args={[24, 24, 40, 360, 40, true]} />
      <pointsMaterial attach="material" color={'black'} />
    </points>
  );
};

export default Cylinder;
