import classicnoise3D from '../common/classicnoise3D.glsl';
import { Vector3 } from 'three';

const TurbulenceShader = {
    uniforms: {
        color: { value: new Vector3(0, 0, 0) },
        amplitude: { value: 8 },
        time: { value: 0 },
        pointSize: { value: 0.02 },
        frequency: { value: 0.2 },
    },
    vertexShader: `
        ${classicnoise3D}

        varying vec2 vUv;
        varying float displacement;
        uniform float time;
        uniform float amplitude;
        uniform float pointSize;
        uniform float frequency;

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
            // add time to the noise parameters so it's animated
            float noise = roughness * -.10 * turbulence( 7.5 * transformedNormal + time );
            float b = amplitude * .5 * pnoise( frequency * position + vec3( 2.0 * time ), vec3( 100.0 ) );
            displacement = -noise + b;

            vec3 T = cross( transformedNormal, vec3( turbulence( .06 * position ) ) );
            vec3 newPosition = position + transformedNormal * pow( displacement, 2. ) + T;
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
            float delta = abs(.5 - vUv.y) * 0.8;

            vec2 circCoord = 2.0 * gl_PointCoord - 1.0;
            if (dot(circCoord, circCoord) > 1.0) {
                discard;
            }


            gl_FragColor = vec4( vec3( delta ), 1. - delta );
        }
    `,
}

export { TurbulenceShader };
