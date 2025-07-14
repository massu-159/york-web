import * as THREE from "three";

interface R3FProperties {
  width: number;
  height: number;
  position: THREE.Vector3;
  widthInPixels: number;
  heightInPixels: number;
}

const vector = new THREE.Vector3();

const create3DData = (element: HTMLElement | null, camera: THREE.Camera): R3FProperties => {
  if (!element) {
    return {
      width: 0,
      height: 0,
      position: new THREE.Vector3(),
      widthInPixels: 0,
      heightInPixels: 0,
    };
  }

  // スクロール位置を考慮した座標計算
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  // ページ座標系での位置を取得
  const rect = element.getBoundingClientRect();
  const left = rect.left + scrollX;
  const right = rect.right + scrollX;
  const top = rect.top + scrollY;
  const bottom = rect.bottom + scrollY;
  const width = rect.width;
  const height = rect.height;

  const xCenter = (left + right) / 2;
  const yCenter = (top + bottom) / 2;

  // ビューポート座標系に変換（スクロール位置を考慮）
  const viewportX = (xCenter) / window.innerWidth;
  const viewportY = (yCenter) / window.innerHeight;

  vector.x = viewportX * 2 - 1;
  vector.y = -viewportY * 2 + 1;
  vector.z = 0.0;

  vector.unproject(camera);

  const dir = vector.sub(camera.position).normalize();
  const distance = -camera.position.z / dir.z;
  const position = camera.position.clone().add(dir.multiplyScalar(distance));

  const distancePlane = camera.position.z;
  const perspectiveCamera = camera as THREE.PerspectiveCamera;
  const widthPlane =
    (width / window.innerWidth) * distancePlane * 2 * Math.tan((perspectiveCamera.fov * Math.PI) / 360);

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
