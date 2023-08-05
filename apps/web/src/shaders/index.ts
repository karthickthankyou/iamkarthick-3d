// export const vertexShader = `
// varying vec3 vNormal;
// varying vec3 vPosition;

// void main() {
//   vNormal = normalize(normalMatrix * normal);
//   vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `

// export const fragmentShader = `
// uniform vec3 color;
// varying vec3 vNormal;
// varying vec3 vPosition;

// void main() {
//   vec3 normal = normalize(vNormal);

//   // Define the light direction (from the camera)
//   vec3 lightDirection = normalize(-vPosition);

//   // Calculate the dot product between the light direction and the normal
//   float dotProduct = max(dot(normal, lightDirection), 0.0);

//   // Calculate gradient based on the y-axis position
//   float gradient = (vPosition.y + 0.5) * 0.5;

//   // Interpolate between the darker shade and the base color based on the gradient
//   vec3 baseColor = mix(color * 0.5, color, gradient);

//   // Apply the dot product to the base color
//   vec3 finalColor = baseColor * dotProduct;

//   gl_FragColor = vec4(finalColor, 1.0);
// }`

export const vertexShader = `
varying vec3 vNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragmentShader = `
uniform vec3 color;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);

  // Calculate the brightness based on the y-axis of the normal
  float brightness = normal.y * 0.3 + 0.5;

  // Apply the brightness to the base color
  vec3 finalColor = color * brightness;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export const fragmentShaderZ = `
uniform vec3 color;
varying vec3 vNormal;

void main() {
  vec3 normal = normalize(vNormal);

  // Calculate the brightness based on the z-axis of the normal
  float brightness = normal.z * 0.3 + 0.5;

  // Apply the brightness to the base color
  vec3 finalColor = color * brightness;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export const fragmentShaderFaceRatio = `
uniform vec3 color;
uniform vec3 cameraPosition;
varying vec3 vWorldPosition;

void main() {
  // Compute the direction in which the current fragment faces
  vec3 faceDirection = normalize(vWorldPosition - cameraPosition);

  // Compute the dot product of the face direction and up direction
  float dotProduct = dot(faceDirection, vec3(0.0, 1.0, 0.0));

  // The facing ratio is the absolute value of the dot product
  float facingRatio = abs(dotProduct);

  // Interpolate between the base color and white based on the facing ratio
  vec3 finalColor = mix(color, vec3(1.0, 1.0, 1.0), facingRatio);

  gl_FragColor = vec4(finalColor, 1.0);
}
`
