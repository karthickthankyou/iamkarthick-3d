import { ShaderMaterial, Color } from 'three'

export const vertexShader = `
varying vec3 vPosition;

void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragmentShader = `
uniform vec3 color;
varying vec3 vPosition;

void main() {
  // calculate brightness based on the vertex's y position
//   float brightness = vPosition.z * 0.1 + .6;
      float brightness = clamp(vPosition.z * 0.025 + 0.6, 0.01, 1.0);


  // apply the brightness to the base color
  vec3 finalColor = color * brightness;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export const getShaderMaterial = ({ color }: { color: Color }) =>
  new ShaderMaterial({
    uniforms: {
      color: { value: color },
    },
    vertexShader,
    fragmentShader,
  })
