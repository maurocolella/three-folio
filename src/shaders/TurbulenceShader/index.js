import classicnoise3D from '../common/classicnoise3D.glsl';
import { Vector3 } from 'three';

const TurbulenceShader = {
    uniforms: {
        color: { value: new Vector3(0, 0, 0) },
        magnitude: { value: 8 },
        time: { value: 0 },
        pointSize: { value: 0.2 },
        uScale: { value: 1.0 },
        uYrot: { value: 1.0 },
    },
    vertexShader: `
        ${classicnoise3D}

        varying vec2 vUv;
        varying float displacement;
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

            float roughness = 2.;
            float frequency = 0.2;
            // add time to the noise parameters so it's animated
            float noise = roughness * -.10 * turbulence( 7.5 * transformedNormal + time );
            float b = magnitude * (.5 - abs(.5 - vUv.y)) * pnoise( frequency * position + vec3( 2.0 * time ), vec3( 100.0 ) );
            displacement = - noise + b;

            vec3 T = cross( transformedNormal, vec3( turbulence( .2 * position /* + time */ ) ) );
            vec3 newPosition = position + transformedNormal * displacement * displacement + T;
            gl_PointSize = pointSize;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        varying float displacement;

        uniform vec3 color;
        const float vAlpha = 1.0;

        void main() {
            float delta = abs(.5 - vUv.y);
            gl_FragColor = vec4( vec3( sqrt( delta ) ), vAlpha ); // displacement * displacement + .5 );
        }
    `,
}

export { TurbulenceShader };
