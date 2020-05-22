import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

import {
    BlendFunction,
    BlurPass,
    EffectComposer,
    EffectPass,
    KernelSize,
    RenderPass,
    SavePass,
    TextureEffect,
} from 'postprocessing';

function PostProcessor() {
    const { gl, scene, camera, size } = useThree();

    const [final] = useMemo(() => {
        const composer = new EffectComposer(gl);
        const renderPass = new RenderPass(scene, camera);

        const savePass = new SavePass();
        const blurPass = new BlurPass({
            height: 240,
        });
        const textureEffect = new TextureEffect({
            texture: savePass.renderTarget.texture,
            blendFunction: BlendFunction.ALPHA,
        });
        const texturePass = new EffectPass(camera, textureEffect);
        textureEffect.blendMode.opacity.value = 0.5;

        composer.addPass(renderPass);
        composer.addPass(savePass);
        composer.addPass(blurPass);
        composer.addPass(texturePass);

        return [composer];
    }, [camera, gl, scene]);

    useEffect(() => {
        final.setSize(size.width, size.height);
    }, [final, size]);

    return useFrame(() => {
        final.render();
    }, 1);
};

export default PostProcessor;
