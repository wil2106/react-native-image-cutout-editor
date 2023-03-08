import React, { FC, useRef } from 'react';
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Path, Svg } from 'react-native-svg';

const SLIDER_WIDTH = 293;
const SLIDER_HEIGHT = 30;
const CIRCLE_RADIUS = SLIDER_HEIGHT / 2;

interface PencilSizeSliderProps {
  darkMode?: boolean;
}

export const PencilSizeSlider: FC<PencilSizeSliderProps> = (props) => {
  const color = props.darkMode
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.2)';

  const touchX = useRef(new Animated.Value(0)).current;
  const clampedTouchX = useRef(
    Animated.diffClamp(touchX, CIRCLE_RADIUS, SLIDER_WIDTH - CIRCLE_RADIUS)
  ).current;
  const translateX = useRef(
    Animated.add(clampedTouchX, new Animated.Value(-CIRCLE_RADIUS))
  ).current;

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          x: touchX,
        },
      },
    ],
    { useNativeDriver: true }
  );

  return (
    <View>
      <Svg
        width={SLIDER_WIDTH}
        height={SLIDER_HEIGHT}
        viewBox="0 0 293 30"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M293 15C293 23.2843 286.284 30 278 30C277.589 30 277.181 29.9834 276.778 29.9509L4 19C1.79086 19 0 17.2091 0 15C0 12.7909 1.79086 11 4 11L276.778 0.0490583C277.181 0.0165629 277.589 0 278 0C286.284 0 293 6.71573 293 15Z"
          fill={color}
        />
      </Svg>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <Animated.View style={styles.horizontalPan}>
          <Animated.View
            style={[
              styles.circle,
              { backgroundColor: props.darkMode ? 'white' : 'black' },
              {
                transform: [
                  {
                    translateX: translateX,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalPan: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    position: 'absolute',
  },
  circle: {
    borderRadius: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
  },
});
