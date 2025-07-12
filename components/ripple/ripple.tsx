import "./styles.css";
import { Canvas } from "@react-three/fiber";
import R3FCard from "./r3f-components/Card.tsx";
import { CAMERA_Z_POSITION, PLACEHOLDER_IMAGE_URL } from "./constants/index";
import EffectComposer from "./effects/EffectComposer";

const HtmlCard = () => {
  return (
    <div id="target-card" className="card hide">
      <img id="target-image" className="image" src={PLACEHOLDER_IMAGE_URL} />
      <p id="target-title" className="title">
        R3F world from HTML
      </p>
      <p id="target-description" className="description">
        This a description showcasing a shadow R3F world based on a HTML world.
        Using a couple of hooks and event listeners.
      </p>
    </div>
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
      {/* <color attach="background" args={["black"]} /> */}
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
