import classicnoise3D from '../common/classicnoise3D.glsl';
import { Vector3 } from 'three';

const TurbulenceShader = {
    uniforms: {
      color: { value: new Vector3(0, 0, 0) },
      magnitude: { value: 2.0 },
      time: { value: 0 },
    },
    vertexShader: `
        ${classicnoise3D}

        varying vec2 vUv;
        varying float noise;
        uniform float time;
        uniform float magnitude;

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

            // add time to the noise parameters so it's animated
            noise = 10.0 *  -.10 * turbulence( .5 * normal + time );
            float b = magnitude * pnoise( 0.05 * position + vec3( 2.0 * time ), vec3( 100.0 ) );
            float displacement = - noise + b;

            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

        }
    `,
    fragmentShader: `
        uniform vec3 color;
        const float vAlpha = 1.0;

        void main() {
            gl_FragColor = vec4( color, vAlpha );
        }
    `
  }

  export { TurbulenceShader }
