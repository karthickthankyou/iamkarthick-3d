import { ColorRepresentation, Mesh, ShaderMaterial } from 'three'

export const simpleVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const simpleFragmentShader = `
  uniform vec3 baseColor;

  void main() {
    gl_FragColor = vec4(baseColor, 1.0);
  }
`

export const simpleShaderMaterial = (color: ColorRepresentation) =>
  new ShaderMaterial({
    uniforms: {
      baseColor: { value: color },
    },
    vertexShader: simpleVertexShader,
    fragmentShader: simpleFragmentShader,
  })
