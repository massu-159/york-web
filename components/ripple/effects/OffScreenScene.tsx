import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { forwardRef, useMemo } from 'react';

import { offScreenFragmentShader } from './shaders/offScreenFragmentShader';
import { offScreenVertexShader } from './shaders/offScreenVertexShader';

interface Props {
  bufferTexture: THREE.Texture;
  colorTexture?: THREE.Texture;
}

export default forwardRef<THREE.Mesh, Props>(
  function OffScreenScene(props, ref) {
    const { size } = useThree();

    const OffScreenMaterial = useMemo(
      () =>
        new THREE.ShaderMaterial({
          uniforms: {
            bufferTexture: { value: props.bufferTexture },
            colorTexture: { value: props.colorTexture },
            res: {
              value: new THREE.Vector2(size.width, size.height),
            },
            mouse: { value: new THREE.Vector3(0, 0, 0) },
            time: { value: 0 },
          },
          vertexShader: offScreenVertexShader,
          fragmentShader: offScreenFragmentShader,
        }),
      [props.bufferTexture, props.colorTexture, size.height, size.width],
    );

    return (
      <group>
        <mesh ref={ref} position={[0, 0, 0]}>
          <planeGeometry args={[1.0 * (size.width / size.height), 1.0]} />
          <primitive attach='material' object={OffScreenMaterial} />
        </mesh>
      </group>
    );
  },
);
