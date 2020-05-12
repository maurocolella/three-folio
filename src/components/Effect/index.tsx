
import { WebGLRenderTarget } from 'three';
import { useEffect, useMemo } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import { RadialBlurShader } from '../../shaders/RadialBlurShader';
import { GaussianBlurShader } from '../../shaders/GaussianBlurShader';

extend({ EffectComposer, ShaderPass, RenderPass });

function Effect() {
    const { gl, scene, camera, size } = useThree()

    const [base, final] = useMemo(() => {
      const renderScene = new RenderPass(scene, camera);
      const offscreenTarget = new WebGLRenderTarget(size.width, size.height);

      const comp = new EffectComposer(gl, offscreenTarget);
      comp.renderToScreen = false;
      comp.addPass(renderScene);

      const finalComposer = new EffectComposer(gl);
      const radialBlurShader = new RadialBlurShader();
      radialBlurShader.uniforms.strength.value = 0.08;
      const radialPass = new ShaderPass(radialBlurShader);
      const finalPass = new ShaderPass(new GaussianBlurShader());
      finalPass.needsSwap = true;
      finalComposer.addPass(renderScene);
      finalComposer.addPass(radialPass);
      finalComposer.addPass(finalPass);
      /* const fxaa = new ShaderPass(FXAAShader)
      fxaa.material.uniforms['resolution'].value.x = 1 / size.width
      fxaa.material.uniforms['resolution'].value.y = 1 / size.height
      finalComposer.addPass(fxaa) */
      return [comp, finalComposer];
    }, []);

    useEffect(() => {
      base.setSize(size.width, size.height);
      final.setSize(size.width, size.height);
    }, [base, final, size])

    useFrame(() => {
      base.render();
      final.render();
    }, 1);

    return null;
};

export default Effect;
