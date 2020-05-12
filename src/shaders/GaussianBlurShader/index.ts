/**
 * @author mattdesl / Jam3
 * @author maurocolella / http://mauro-colella.com/
 *
 * Gaussian Blur Shader using:
 * https://github.com/Jam3/glsl-fast-gaussian-blur
 *
 * Integration/TypeScript port by Mauro Colella
 *
 * License: MIT
 */

import { Vector2, Texture } from 'three';

class GaussianBlurShader {

    uniforms = {
        "tDiffuse": { value: <Texture | null>null },
        "direction": { value: new Vector2(1.0, 1.0) },
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

        vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
            vec4 color = vec4(0.0);
            vec2 off1 = vec2(1.3846153846) * direction;
            vec2 off2 = vec2(3.2307692308) * direction;
            color += texture2D(image, uv) * 0.2270270270;
            color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
            color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
            color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
            color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
            return color;
        }

        vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
            vec4 color = vec4(0.0);
            vec2 off1 = vec2(1.411764705882353) * direction;
            vec2 off2 = vec2(3.2941176470588234) * direction;
            vec2 off3 = vec2(5.176470588235294) * direction;
            color += texture2D(image, uv) * 0.1964825501511404;
            color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
            color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
            color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
            color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
            color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
            color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
            return color;
        }

        uniform sampler2D tDiffuse;

        varying vec2 vUv;

        uniform vec2 direction;
        uniform vec2 resolution;

        void main() {
            gl_FragColor = blur13(tDiffuse, vUv, resolution, direction);
        }`,

    ].join("\n");

};

export { GaussianBlurShader };
