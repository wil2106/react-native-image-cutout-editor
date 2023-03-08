import * as React from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = ({ stroke }: { stroke?: ColorValue }) => (
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
      d="m4.5 12.75 6 6 9-13.5"
    />
  </Svg>
);

export default CheckIcon;
