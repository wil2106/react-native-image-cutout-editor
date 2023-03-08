import { cloneElement, FC } from 'react';
import React, { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const ICON_HEIGHT = 50;

interface IconButtonProps {
  onPress: () => void;
  darkMode?: boolean;
  noBackground?: boolean;
  fixedSize?: boolean;
}

export const IconButton: FC<IconButtonProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.iconButton,
        {
          width: props.fixedSize ? ICON_HEIGHT : undefined,
          height: props.fixedSize ? ICON_HEIGHT : undefined,
          padding: props.fixedSize ? undefined : 5,
          backgroundColor: props.noBackground
            ? 'transparent'
            : props.darkMode
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
        },
      ]}
    >
      {cloneElement(props.children as any, {
        stroke: props.darkMode ? 'white' : 'black',
      })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
  },
});
