import { Vector2 } from 'three';
import React, { useEffect, useRef, useMemo } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass });

function Effect({ down }) {
    const composer = useRef();
    const { scene, gl, size, camera } = useThree()
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
    useEffect(() => void composer.current.setSize(size.width, size.height), [size])
    useFrame(() => composer.current.render(), 1)
    return (
        <effectComposer ref={composer} args={[gl]}>
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[aspect, 0, 5, 1]} />
        </effectComposer>
    )
}

export default Effect;
