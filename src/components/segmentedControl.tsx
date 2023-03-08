import React, { FC, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';

const SEGMENT_WIDTH = 100;
const SEGMENT_HEIGHT = 50;

interface SegmentedControlProps {
  segments: string[];
  index: number;
  onChangeIndex: (index: number) => void;
  darkMode?: boolean;
}

export const SegmentedControl: FC<SegmentedControlProps> = (props) => {
  const activeSegmentX = useRef(new Animated.Value(0)).current;

  const moveActiveSegment = (index: number) => {
    Animated.timing(activeSegmentX, {
      toValue: index * SEGMENT_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    moveActiveSegment(props.index);
  }, [props.index]);

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        backgroundColor: props.darkMode
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',
        borderRadius: 1000,
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: SEGMENT_WIDTH,
          height: SEGMENT_HEIGHT,
          transform: [{ translateX: activeSegmentX }],
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#0079FD',
            borderRadius: 1000,
            margin: 5,
          }}
        />
      </Animated.View>
      {props.segments.map((segment, index) => (
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: SEGMENT_WIDTH,
            height: SEGMENT_HEIGHT,
          }}
          key={`segement-${index}`}
          onPress={() => props.onChangeIndex(index)}
        >
          <Text
            style={{
              color:
                props.index === index
                  ? 'white'
                  : props.darkMode
                  ? 'white'
                  : 'black',
              fontWeight: 'bold',
            }}
          >
            {segment}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
