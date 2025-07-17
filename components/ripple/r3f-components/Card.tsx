import { FC } from 'react';

import { PLACEHOLDER_IMAGE_URL } from '../constants';
import GradientPlane from './GradientPlane';
import Image from './Image';

const R3FCard: FC = () => {
  return (
    <group>
      <GradientPlane targetSelector='target-card' />
      <Image
        selector='target-image'
        imageUrl={PLACEHOLDER_IMAGE_URL}
        fullscreen={true}
      />
    </group>
  );
};

export default R3FCard;
