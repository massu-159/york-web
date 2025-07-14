import { Canvas } from "@react-three/fiber";
import R3FCard from "./r3f-components/Card";
import { CAMERA_Z_POSITION, PLACEHOLDER_IMAGE_URL } from "./constants/index";
import EffectComposer from "./effects/EffectComposer";

const HtmlCard = () => {
  return (
    <>
      <img
        id='target-image'
        className='object-cover opacity-30'
        src={PLACEHOLDER_IMAGE_URL}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
    </>
  );
};

const THREECanvas = () => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
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
      <color attach='background' args={["white"]} />
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
