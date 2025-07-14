import { useRef, FC } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import useR3FProperties from "../hooks/useR3FProperties";

interface ImageProps {
  selector: string;
  imageUrl: string;
  border?: boolean;
  fullscreen?: boolean;
}

const Image: FC<ImageProps> = ({ selector, imageUrl, border, fullscreen = false }) => {
  const imageRef = useRef<THREE.Mesh>(null);
  const imageTexture = useLoader(THREE.TextureLoader, imageUrl);

  const { position, width, height } = useR3FProperties({
    selector,
    ref: imageRef,
    geometry: "PlaneGeometry",
  });

  // 画面いっぱいに表示する場合のサイズと位置を計算
  const fullscreenSize = fullscreen ? 2.0 : 1.0; // 画面いっぱいのサイズ
  const fullscreenPosition: [number, number, number] = fullscreen
    ? [0, 0, 0]
    : [position.x, position.y, position.z + 0.1];
  const fullscreenWidth = fullscreen ? 2.0 : width;
  const fullscreenHeight = fullscreen ? 2.0 : height;

  return (
    <mesh ref={imageRef} position={[0, 0, 0]}>
      <planeGeometry args={[fullscreenWidth, fullscreenHeight]} />
      <meshBasicMaterial map={imageTexture} />
    </mesh>
  );
};

export default Image;
