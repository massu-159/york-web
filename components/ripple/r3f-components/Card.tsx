import { FC } from "react";
import { R3F_FONT_SIZES, PLACEHOLDER_IMAGE_URL } from "../constants";
import GradientPlane from "./GradientPlane";
import Image from "./Image";
import Text from "./Text";

const R3FCard: FC = () => {
  return (
    <group>
      <GradientPlane targetSelector="target-card" />
      <Image selector="target-image" imageUrl={PLACEHOLDER_IMAGE_URL} />
      <Text selector="target-title" {...R3F_FONT_SIZES.boldText}>
        R3F world from HTML
      </Text>
      <Text selector="target-description" {...R3F_FONT_SIZES.smallText}>
        This a description showcasing a shadow R3F world based on a HTML world.
        Using a couple of hooks and event listeners.
      </Text>
    </group>
  );
};

export default R3FCard;