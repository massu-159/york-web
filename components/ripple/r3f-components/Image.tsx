import { useRef, FC } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import useR3FProperties from "../hooks/useR3FProperties";

interface ImageProps {
  selector: string;
  imageUrl: string;
  border?: boolean;
}

const Image: FC<ImageProps> = ({ selector, imageUrl, border }) => {
  const imageRef = useRef<THREE.Mesh>(null);
  const imageTexture = useLoader(THREE.TextureLoader, imageUrl);

  const { position, width, height } = useR3FProperties({
    selector,
    ref: imageRef,
    geometry: "PlaneGeometry",
  });

  return (
    <mesh ref={imageRef} position={[position.x, position.y, position.z + 0.1]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={imageTexture} />
    </mesh>
  );
};

export default Image;