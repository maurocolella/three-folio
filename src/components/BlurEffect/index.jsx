import { useEffect, useMemo } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
// import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';

import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import { RadialBlurShader } from '../../shaders/RadialBlurShader';
import { GaussianBlurShader } from '../../shaders/GaussianBlurShader';
import { AdditiveShader } from '../../shaders/AdditiveShader';

extend({ EffectComposer, ShaderPass, RenderPass });

function BlurEffect() {
    const { gl, scene, camera, size } = useThree();

    const [base, blur, final] = useMemo(() => {
        const renderScene = new RenderPass(scene, camera);

        const comp = new EffectComposer(gl);
        const blurComposer = new EffectComposer(gl);
        const finalComposer = new EffectComposer(gl);
        comp.renderToScreen = false;
        blurComposer.renderToScreen = false;

        // const bloomPass = new BloomPass(1.0, 9, 0.1, 1);
        // renderScene.needsSwap = true;
        comp.addPass(renderScene);

        const fxaa = new ShaderPass(FXAAShader)
        fxaa.material.uniforms['resolution'].value.x = 1 / size.width
        fxaa.material.uniforms['resolution'].value.y = 1 / size.height
        comp.addPass(fxaa);

        const radialBlurShader = new RadialBlurShader();
        radialBlurShader.uniforms.strength.value = 0.08;
        const gaussianBlurShader = new GaussianBlurShader();

        const rttPassFront = new TexturePass(comp.renderTarget2.texture);
        const radialPass = new ShaderPass(radialBlurShader);
        const gaussianPass = new ShaderPass(gaussianBlurShader);

        blurComposer.addPass(rttPassFront);
        blurComposer.addPass(radialPass);
        // blurComposer.addPass(bloomPass);
        blurComposer.addPass(gaussianPass);

        const additiveShader = new AdditiveShader();
        const additivePass = new ShaderPass(additiveShader);

        additivePass.material.uniforms.tDiffuse2.value = blurComposer.renderTarget1.texture;
        finalComposer.addPass(rttPassFront);
        finalComposer.addPass(additivePass);

        return [comp, blurComposer, finalComposer];
    }, [camera, gl, scene, size]);

    useEffect(() => {
        base.setSize(size.width, size.height);
        blur.setSize(size.width, size.height);
        final.setSize(size.width, size.height);
    }, [base, blur, final, size])

    return useFrame(() => {
        base.render();
        blur.render();
        final.render();
    }, 1);
};

export default BlurEffect;
