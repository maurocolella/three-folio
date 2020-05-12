/**
 * @author spite
 * @author maurocolella / http://mauro-colella.com/
 *
 * Radial Blur Shader by Jaume Sanchez
 * Part of the Wagner Effect Composer:
 * https://github.com/spite/Wagner
 *
 * Integration/TypeScript port by Mauro Colella
 *
 * License: MIT
 */

 import { Vector2, Texture } from 'three';


class RadialBlurShader {

    uniforms = {
        "tDiffuse": { value: <Texture | null>null },
        "center": { value: new Vector2(0.5, 0.5) },
        "strength": { value: 0.02 },
        "resolution": { value: new Vector2(1.0, 1.0) },
    };

    vertexShader = [
        `varying vec2 vUv;

         void main() {
             vUv = uv;
             gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
         }`

    ].join("\n");

    fragmentShader = [
        `#include <common>

        // blur samples
        const float SAMPLES = 40.0;

        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        uniform vec2 center;
        uniform float strength;
        uniform vec2 resolution;

        float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}

        void main() {

            vec4 color=vec4(0.0);
            float total=0.0;
            vec2 toCenter=center-vUv*resolution;
            float offset=random(vec3(12.9898,78.233,151.7182),0.0);
            for(float t=0.0;t<=SAMPLES;t++){
                float percent=(t+offset)/SAMPLES;
                float weight=4.0*(percent-percent*percent);
                vec4 sample=texture2D(tDiffuse,vUv+toCenter*percent*strength/resolution);
                sample.rgb*=sample.a;
                color+=sample*weight;
                total+=weight;
            }
            gl_FragColor=color/total; // + texture2D(tDiffuse,vUv);
            gl_FragColor.rgb/=gl_FragColor.a+0.00001;

        }`,

    ].join("\n");

};

export { RadialBlurShader };
