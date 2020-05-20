import classicnoise3D from '../common/classicnoise3D.glsl';
import { Vector3 } from 'three';

const TurbulenceShader = {
    uniforms: {
        color: { value: new Vector3(0, 0, 0) },
        magnitude: { value: 2.0 },
        time: { value: 0 },
        pointSize: { value: 0.01 },
        uScale: { value: 1.0 },
        uYrot: { value: 1.0 },
    },
    vertexShader: `
        ${classicnoise3D}

        varying vec2 vUv;
        varying float noise;
        uniform float time;
        uniform float magnitude;
        uniform float pointSize;

        float turbulence( vec3 p ) {

            float w = 100.0;
            float t = -.5;

            for (float f = 1.0 ; f <= 10.0 ; f++ ){
                float power = pow( 2.0, f );
                t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
            }

            return t;

        }

        void main() {
            vUv = uv;
            vec3 transformedNormal = normal;

            // add time to the noise parameters so it's animated
            noise = 10.0 *  -.10 * turbulence( 7.5 * transformedNormal + time );
            float b = magnitude * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
            float displacement = - noise + b;

            vec3 newPosition = position + transformedNormal * displacement * displacement;
            gl_PointSize = pointSize;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        varying float noise;

        uniform vec3 color;
        const float vAlpha = 1.0;

        void main() {
            // circle
            /* float border = 0.3;
            float radius = 0.5;
            float dist = radius - distance(vUv, vec2(0.5));
            float vAlpha = smoothstep(0.0, border, dist); */

            gl_FragColor = vec4( color, vAlpha ); //  noise );
        }
    `,
    /* alternateFragmentShader: `
        varying vec2 vUv;

        uniform vec3 color;
        uniform float uScale; // For imperfect, isotropic anti-aliasing in
        uniform float uYrot;  // absence of dFdx() and dFdy() functions

        float frequency = 10.0; // Needed globally for lame version of aastep()

        float aastep(float threshold, float value) {
            float afwidth = frequency * (1.0/200.0) / uScale / cos(uYrot);
            return smoothstep(threshold-afwidth, threshold+afwidth, value);
        }

        void main() {
            vec2 uv = vec2(vUv.x, vUv.y);
            vec2 st2 = mat2(0.707, -0.707, 0.707, 0.707) * uv;
            vec2 nearest = 2.0 * fract(frequency * st2) - 1.0;
            float dist = length(nearest);
            float radius = 0.8;
            vec4 white = vec4(1.0, 1.0, 1.0, 0.0);
            vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
            vec4 fragcolor = mix(black, white, aastep(radius, dist));
            gl_FragColor = fragcolor;
        }
    ` */
}

export { TurbulenceShader };
