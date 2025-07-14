import { useRef, useState, useEffect, useCallback, FC } from "react";
import useR3FProperties from "../hooks/useR3FProperties";
import * as THREE from "three";

interface GradientPlaneProps {
  targetSelector: string;
}

const R3FGradientPlane: FC<GradientPlaneProps> = ({ targetSelector }) => {
  const gradientPlaneRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { position, width, height } = useR3FProperties({
    selector: targetSelector,
    ref: gradientPlaneRef,
    geometry: "PlaneGeometry",
    decreaseZFighting: true
  });

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const OBC = useCallback((shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      ` 
        #include <dithering_fragment>

        gl_FragColor.rgb = mix(
          vec3(0.282, 0.784, 0.627), 
          vec3(0.125, 0.157, 0.188), 
          1.0 - vUv.y
        );

        if (vUv.x < 0.02 || vUv.x > 0.98 || vUv.y < 0.02 || vUv.y > 0.985) {
          gl_FragColor.rgb = vec3(0.125, 0.157, 0.188);
        }
        `
    );
    return shader;
  }, []);

  return (
    <mesh
      ref={gradientPlaneRef}
      position={[position.x, position.y, position.z + 0.1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial defines={{ USE_UV: "" }} onBeforeCompile={OBC} />
    </mesh>
  );
};

export default R3FGradientPlane;