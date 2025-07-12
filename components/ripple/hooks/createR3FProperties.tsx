import * as THREE from "three";

interface R3FProperties {
  width: number;
  height: number;
  position: THREE.Vector3;
  widthInPixels: number;
  heightInPixels: number;
}

const vector = new THREE.Vector3();

const create3DData = (
  element: HTMLElement | null,
  camera: THREE.Camera
): R3FProperties => {
  if (!element) {
    return {
      width: 0,
      height: 0,
      position: new THREE.Vector3(),
      widthInPixels: 0,
      heightInPixels: 0,
    };
  }
  const { left, right, bottom, top, width, height } =
    element.getBoundingClientRect();

  const xCenter = (left + right) / 2;
  const yCenter = (top + bottom) / 2;

  vector.x = (xCenter / window.innerWidth) * 2 - 1;
  vector.y = -(yCenter / window.innerHeight) * 2 + 1;
  vector.z = 0.0;

  vector.unproject(camera);

  const dir = vector.sub(camera.position).normalize();
  const distance = -camera.position.z / dir.z;
  const position = camera.position.clone().add(dir.multiplyScalar(distance));

  const distancePlane = camera.position.z;
  const widthPlane =
    (width / window.innerWidth) *
    distancePlane *
    2 *
    Math.tan((camera.fov * Math.PI) / 360);

  const heightPlane = widthPlane * (height / width) || 0;

  return {
    width: widthPlane,
    height: heightPlane,
    position,
    widthInPixels: width,
    heightInPixels: height,
  };
};

export default create3DData;