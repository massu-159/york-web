import { useRef, useCallback, useState, useEffect, FC, ReactNode } from "react";
import { Text } from "@react-three/drei";
import useR3FProperties from "../hooks/useR3FProperties";
import { PIXEL_TO_MAXWIDTH_FACTOR } from "../constants";
import { Color } from "three";

interface TextProps {
  children: ReactNode;
  selector: string;
  textColor?: Color;
  anchorX?: string;
  anchorY?: string;
  textAlign?: string;
  desktopFontProps?: any;
  mobileFontProps?: any;
  centered?: boolean;
  right?: boolean;
}

const TextR3F: FC<TextProps> = ({
  children,
  selector,
  textColor,
  anchorX = "left",
  anchorY = "top",
  textAlign = "left",
  desktopFontProps = {},
  mobileFontProps = {},
  centered = false,
  right = false
}) => {
  const ref = useRef<any>(null);

  const { position, widthInPixels } = useR3FProperties({
    selector,
    ref,
    geometry: "Text",
    centered,
    right
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const callback = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);

  return (
    <Text
      ref={ref}
      maxWidth={widthInPixels * PIXEL_TO_MAXWIDTH_FACTOR}
      color={textColor}
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      whiteSpace="normal"
      position={[position.x, position.y, position.z]}
      toneMapped={false}
      {...(isMobile ? mobileFontProps : desktopFontProps)}
    >
      {children}
      <meshBasicMaterial attach="material" />
    </Text>
  );
};

export default TextR3F;