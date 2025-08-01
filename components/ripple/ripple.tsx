import { Canvas } from '@react-three/fiber';

import { CAMERA_Z_POSITION, PLACEHOLDER_IMAGE_URL } from './constants/index';
import EffectComposer from './effects/EffectComposer';
import R3FCard from './r3f-components/Card';

const HtmlCard = () => {
  return (
    <>
      <div id='target-image' className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
          <div className='relative'>
            <div className='w-12 h-12 border-4 border-gray-300 border-t-pink-600 rounded-full animate-spin'></div>
            <div className='absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150'></div>
          </div>
        </div>
      </div>
    </>
  );
};

const THREECanvas = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10,
      }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 8,
        position: [0, 0, CAMERA_Z_POSITION],
      }}
    >
      <R3FCard />
      {/* <gridHelper args={[10, 10]} /> */}
      <EffectComposer />
      {/* <OrbitControls makeDefault /> */}
      <ambientLight />
      <color attach='background' args={['']} />
    </Canvas>
  );
};

export default function Ripple() {
  return (
    <div>
      <HtmlCard />
      {/* COMMENT BELOW OUT TO SEE HTML LAYER :) */}
      <THREECanvas />
    </div>
  );
}
