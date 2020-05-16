import { Texture } from 'three';

class AdditiveShader {
    uniforms = {
        tDiffuse: { value: null } as Texture | unknown,
        tDiffuse2: { value: null } as Texture | unknown,
        fCoeff: { value: 0.2 }
    };

    vertexShader = [
        `varying vec2 vUv;

         void main() {
             vUv = uv;
             gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
         }`

    ].join("\n");

    fragmentShader = [
        `uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuse2;
        uniform float fCoeff;

        varying vec2 vUv;

        void main() {

            vec4 texel = texture2D( tDiffuse, vUv );
            vec4 add = texture2D( tDiffuse2, vUv );
            gl_FragColor = texel + add * fCoeff;

        }`
    ].join("\n")
}

export { AdditiveShader };
