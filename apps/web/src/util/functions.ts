import * as THREE from 'three'

export const isTriggerVisible = (
  triggerMesh: THREE.Mesh,
  camera: THREE.Camera,
): boolean => {
  const frustum = new THREE.Frustum()
  const cameraViewProjectionMatrix = new THREE.Matrix4()

  console.log(
    'cameraViewProjectionMatrix: ',
    cameraViewProjectionMatrix,
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  )

  // Update the camera view projection matrix
  cameraViewProjectionMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse,
  )

  // Update the frustum
  frustum.setFromProjectionMatrix(cameraViewProjectionMatrix)

  // Check if the trigger is inside the frustum
  return frustum.intersectsObject(triggerMesh)
}
