import { useCallback, useLayoutEffect, useMemo, MutableRefObject } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import createR3FProperties from "./createR3FProperties";
import { PIXEL_TO_MAXWIDTH_FACTOR } from "../constants";

interface UseR3FPropertiesProps {
  selector: string;
  ref: MutableRefObject<any>;
  geometry?: string;
  centered?: boolean;
  right?: boolean;
  updateViaListener?: boolean;
  decreaseZFighting?: boolean;
  mobileAndDesktopLayoutDiffer?: boolean;
}

interface R3FProperties {
  width: number;
  height: number;
  position: THREE.Vector3;
  widthInPixels: number;
}

const useR3FProperties = ({
  selector,
  ref,
  geometry = "PlaneGeometry",
  centered = false,
  right = false,
  updateViaListener = true,
  decreaseZFighting = false,
  mobileAndDesktopLayoutDiffer = false,
}: UseR3FPropertiesProps): R3FProperties => {
  const { camera } = useThree();

  const element = useMemo(() => document.getElementById(selector), [selector]);

  const { width, height, position, widthInPixels } = useMemo(
    () => createR3FProperties(element, camera),
    [element, camera],
  );

  const createR3FPropertiesCallback = useCallback(() => {
    const elementCB = document.getElementById(
      window.innerWidth < 1024 &&
        geometry === "Text" &&
        mobileAndDesktopLayoutDiffer
        ? `${selector}-mobile`
        : selector,
    );
    const {
      width: planeWidthCB,
      height: planeHeightCB,
      position: planePos,
      widthInPixels: widthInPixelsCB,
      heightInPixels,
    } = createR3FProperties(elementCB, camera);

    if (ref.current && updateViaListener) {
      if (geometry !== "Text") {
        ref.current.position.x = planePos.x;
        ref.current.position.y = planePos.y;
        ref.current.position.z = decreaseZFighting
          ? planePos.z - 0.001
          : planePos.z;

        const geom = new THREE.PlaneGeometry(
          (planeWidthCB * window.innerWidth) / window.innerHeight,
          (planeHeightCB * window.innerWidth) / window.innerHeight,
          20,
          20,
        );
        ref.current.geometry = geom;
      } else {
        if (centered) {
          ref.current.position.x = planePos.x;
          ref.current.position.y = planePos.y;
          ref.current.position.z = decreaseZFighting
            ? planePos.z - 0.001
            : planePos.z;
        } else if (right) {
          const w = (planeWidthCB * window.innerWidth) / window.innerHeight;
          const h = (planeHeightCB * window.innerWidth) / window.innerHeight;

          const x = planePos.x + w / 2.0;
          const y = planePos.y + h / 2.0;

          ref.current.position.x = x;
          ref.current.position.y = y;
        } else {
          const w = (planeWidthCB * window.innerWidth) / window.innerHeight;
          const h = (planeHeightCB * window.innerWidth) / window.innerHeight;

          const x = planePos.x - w / 2.0;
          const y = planePos.y + h / 2.0;

          ref.current.position.x = x;
          ref.current.position.y = y;
        }
      }
      ref.current.maxWidth = widthInPixelsCB * PIXEL_TO_MAXWIDTH_FACTOR;
    }
  }, [selector, camera, updateViaListener, ref, geometry, centered, right, decreaseZFighting, mobileAndDesktopLayoutDiffer]);

  const setUpEventListeners = useCallback(() => {
    window.addEventListener("onscroll", createR3FPropertiesCallback);
    window.addEventListener("resize", createR3FPropertiesCallback);
  }, [createR3FPropertiesCallback]);

  const removeEventListeners = useCallback(() => {
    window.removeEventListener("onscroll", createR3FPropertiesCallback);
    window.removeEventListener("resize", createR3FPropertiesCallback);
  }, [createR3FPropertiesCallback]);

  useLayoutEffect(() => {
    setUpEventListeners();
    createR3FPropertiesCallback();
    return () => {
      removeEventListeners();
    };
  }, [setUpEventListeners, removeEventListeners, createR3FPropertiesCallback]);

  createR3FPropertiesCallback();

  return { width, height, position, widthInPixels };
};

export default useR3FProperties;