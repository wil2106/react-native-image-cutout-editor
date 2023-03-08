import * as React from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const XIcon = ({ stroke }: { stroke?: ColorValue }) => (
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
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
);

export default XIcon;
