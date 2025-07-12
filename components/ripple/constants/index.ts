import { Color } from "three";

export const PIXEL_TO_MAXWIDTH_FACTOR = 0.0391;

export const PLACEHOLDER_IMAGE_URL = "https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138_1280.jpg";

export const CAMERA_Z_POSITION = 1.0;

export interface FontProps {
  scale: number;
  fontSize: number;
  lineHeight: number;
  outlineWidth: number;
  outlineColor: Color;
}

export interface TextStyleProps {
  textColor: Color;
  anchorX: string;
  anchorY: string;
  textAlign: string;
  centered?: boolean;
  desktopFontProps: FontProps;
  mobileFontProps: FontProps;
}

export const R3F_FONT_SIZES: Record<string, TextStyleProps> = {
  smallText: {
    textColor: new Color(1.0, 1.0, 1.0),
    anchorX: "left",
    anchorY: "top",
    textAlign: "left",
    desktopFontProps: {
      scale: 0.0303,
      fontSize: 0.612,
      lineHeight: 1.1,
      outlineWidth: 0.02,
      outlineColor: new Color(1.0, 1.0, 1.0),
    },
    mobileFontProps: {
      scale: 0.0303,
      fontSize: 0.612,
      lineHeight: 1.1,
      outlineWidth: 0.02,
      outlineColor: new Color(1.0, 1.0, 1.0),
    },
  },
  boldText: {
    textColor: new Color(1.0, 1.0, 1.0),
    anchorX: "center",
    anchorY: "middle",
    textAlign: "center",
    centered: true,
    desktopFontProps: {
      scale: 0.08,
      fontSize: 0.51,
      lineHeight: 1.5,
      outlineWidth: 0.03,
      outlineColor: new Color(1.0, 1.0, 1.0),
    },
    mobileFontProps: {
      scale: 0.08,
      fontSize: 0.4832,
      lineHeight: 1.5,
      outlineWidth: 0.03,
      outlineColor: new Color(1.0, 1.0, 1.0),
    },
  },
};