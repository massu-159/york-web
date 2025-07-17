import { OrthographicCamera, Stats, useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer as EffectComposerType } from '@react-three/postprocessing';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import OffScreenScene from './OffScreenScene';
import { RippleEffect } from './Ripple';

const cameraZ = 1;
const vec3 = new THREE.Vector3();
const zoomCalcBox3 = new THREE.Box3();
const mouseCenter = new THREE.Vector3(0.5, 0.5, 1.1);
const res = new THREE.Vector2();

interface Props {
  [key: string]: any;
}

function calculateOrthographicZoom(
  camera: THREE.OrthographicCamera,
  object: THREE.Object3D,
): number {
  const boundingBox = zoomCalcBox3.setFromObject(object);
  const objectSize = boundingBox.getSize(vec3);

  const screenWidth = camera.right - camera.left;
  const screenHeight = camera.top - camera.bottom;

  const zoomX = screenWidth / objectSize.x;
  const zoomY = screenHeight / objectSize.y;

  return Math.max(zoomX, zoomY);
}

function calculateDistanceToCamera(
  camera: THREE.Camera,
  object: THREE.Object3D,
): number {
  const cameraPosition = vec3;
  const objectPosition = vec3;

  camera.getWorldPosition(cameraPosition);
  object.getWorldPosition(objectPosition);

  return cameraPosition.distanceTo(objectPosition);
}

export default forwardRef<THREE.Mesh, Props>(function Plane(
  props: Props,
  crocVectors: any,
) {
  const { size, gl, set, scene } = useThree();
  const offScreen = useRef<THREE.Mesh>(null);
  const composerRef = useRef<any>(null);
  const rippleShaderPassRef = useRef<Effect | null>(null);

  const [orthoZoom, setOrthoZoom] = useState<number>(1);

  const offScreenFBOTexture = useFBO(size.width, size.height);
  const onScreenFBOTexture = useFBO(size.width, size.height);

  const [offScreenScene] = useState<THREE.Scene>(() => new THREE.Scene());
  const offScreenCameraRef = useRef<THREE.OrthographicCamera>(null);

  let textureA = offScreenFBOTexture;
  let textureB = onScreenFBOTexture;
  res.x = size.width;
  res.y = size.height;

  useFrame(state => {
    const { gl, clock } = state;
    gl.setRenderTarget(textureB);
    if (offScreenCameraRef.current) {
      gl.render(offScreenScene, offScreenCameraRef.current);
    }

    //Swap textureA and B
    const t = textureA;
    textureA = textureB;
    textureB = t;

    if (rippleShaderPassRef.current && offScreen.current) {
      const rippleUniforms = rippleShaderPassRef.current.uniforms;
      const offScreenMaterial = offScreen.current
        .material as THREE.ShaderMaterial;
      if (rippleUniforms && rippleUniforms.get('bufferTexture')) {
        rippleUniforms.get('bufferTexture')!.value = textureB.texture;
      }
      if (
        offScreenMaterial &&
        offScreenMaterial.uniforms &&
        offScreenMaterial.uniforms.bufferTexture
      ) {
        offScreenMaterial.uniforms.bufferTexture.value = textureA.texture;
      }

      if (Math.round(clock.elapsedTime / 0.1) % 24.0 === 0) {
        if (offScreenMaterial.uniforms && offScreenMaterial.uniforms.mouse) {
          offScreenMaterial.uniforms.mouse.value.x = 0.6;
          offScreenMaterial.uniforms.mouse.value.y = 0.6;
          offScreenMaterial.uniforms.mouse.value.z = 1.01;
        }
        if (rippleUniforms && rippleUniforms.get('mouse')) {
          rippleUniforms.get('mouse')!.value.x = 0.5;
          rippleUniforms.get('mouse')!.value.y = 0.5;
          rippleUniforms.get('mouse')!.value.z = 1.01;
        }
      } else {
        if (offScreenMaterial.uniforms && offScreenMaterial.uniforms.mouse) {
          offScreenMaterial.uniforms.mouse.value.x = 0.5;
          offScreenMaterial.uniforms.mouse.value.y = 0.5;
          offScreenMaterial.uniforms.mouse.value.z = 0.0;
        }
        if (rippleUniforms && rippleUniforms.get('mouse')) {
          rippleUniforms.get('mouse')!.value.x = 0.5;
          rippleUniforms.get('mouse')!.value.y = 0.5;
          rippleUniforms.get('mouse')!.value.z = 1.01;
        }
      }
      if (offScreenMaterial.uniforms && offScreenMaterial.uniforms.time) {
        offScreenMaterial.uniforms.time.value = clock.elapsedTime;
      }
      if (offScreenMaterial.uniforms && offScreenMaterial.uniforms.res) {
        offScreenMaterial.uniforms.res.value = res;
      }
    }

    gl.setRenderTarget(null);
    if (composerRef.current) {
      composerRef.current.render();
    }
  });

  useEffect(() => {
    if (offScreenCameraRef.current && offScreen.current) {
      const zoom = calculateOrthographicZoom(
        offScreenCameraRef.current,
        offScreen.current,
      );

      setOrthoZoom(zoom);

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, cameraZ);
      set({ camera });
    }
  }, [set]);

  return (
    <>
      <EffectComposerType
        ref={composerRef}
        multisampling={8}
        depthBuffer={true}
      >
        <RippleEffect
          ref={rippleShaderPassRef}
          bufferTexture={onScreenFBOTexture.texture}
          res={new THREE.Vector2(size.width, size.height)}
          mouse={mouseCenter}
        />
      </EffectComposerType>
      {createPortal(
        <>
          <OffScreenScene
            ref={offScreen}
            bufferTexture={offScreenFBOTexture.texture}
          />
          <OrthographicCamera
            makeDefault
            position={[0, 0, 2]}
            args={[-1, 1, 1, -1, 1, 10]}
            // aspect={size.width / size.height}
            ref={offScreenCameraRef}
            zoom={orthoZoom}
          />
        </>,
        offScreenScene,
      )}
    </>
  );
});
