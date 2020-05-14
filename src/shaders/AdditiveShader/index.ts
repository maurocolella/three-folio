import { Texture } from 'three';

class AdditiveShader {
    uniforms = {
        tDiffuse: { value: <Texture | null>null },
        tDiffuse2: { value: <Texture | null>null },
        fCoeff: { value: 1.0 }
    };

    vertexShader = [
        "varying vec2 vUv;",

        "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"
    ].join("\n");

    fragmentShader = [
        "uniform sampler2D tDiffuse;",
        "uniform sampler2D tDiffuse2;",
        "uniform float fCoeff;",

        "varying vec2 vUv;",

        "void main() {",

            "vec4 texel = texture2D( tDiffuse, vUv );",
            "vec4 add = texture2D( tDiffuse2, vUv );",
            "gl_FragColor = texel + add;",

        "}"
    ].join("\n")
}

export { AdditiveShader };
