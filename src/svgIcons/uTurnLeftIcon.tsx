import * as React from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const UTurnLeftIcon = ({ stroke }: { stroke?: ColorValue }) => (
  <Svg
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={stroke}
    width={24}
    height={24}
    fill="none"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </Svg>
);

export default UTurnLeftIcon;
