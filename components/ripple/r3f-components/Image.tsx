import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import { FC, useRef } from 'react';

import useR3FProperties from '../hooks/useR3FProperties';

interface ImageProps {
  selector: string;
  imageUrl: string;
  fullscreen?: boolean;
}

const Image: FC<ImageProps> = ({
  selector,
  imageUrl,
  fullscreen = false,
}) => {
  const imageRef = useRef<THREE.Mesh>(null);
  const imageTexture = useLoader(THREE.TextureLoader, imageUrl);

  const { width, height } = useR3FProperties({
    selector,
    ref: imageRef,
    geometry: 'PlaneGeometry',
  });

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
