import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Modal } from 'react-native';
import XIcon from '../svgIcons/xIcon';
import UTurnIcon from '../svgIcons/uTurnLeftIcon';
import CheckIcon from '../svgIcons/checkIcon';
import SunIcon from '../svgIcons/sunIcon';
import { IconButton } from './iconButton';
import { Alert } from 'react-native';
import {
  Canvas,
  Image,
  Skia,
  SkImage,
  useComputedValue,
} from '@shopify/react-native-skia';
import { SegmentedControl } from './segmentedControl';
import { PencilSizeSlider } from './pencilSizeSlider';

interface ImageCutoutEditorProps {
  onEdit: () => void;
  onCancel?: () => void;
  darkMode?: boolean;
}

export const ImageCutoutEditor = forwardRef(
  (props: ImageCutoutEditorProps, ref) => {
    const [visible, setVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(props.darkMode);
    const [image, setImage] = useState<SkImage | null>();
    const [canvasContainerDimensions, setCanvasContainerDimensions] = useState({
      width: 0,
      height: 0,
    });
    const [modeIndex, setModeIndex] = useState(0);

    useImperativeHandle(ref, () => ({
      async open(uri: string) {
        setVisible(true);
        const imageData = await Skia.Data.fromURI(uri);
        const img = Skia.Image.MakeImageFromEncoded(imageData);
        setImage(img);
      },
      close() {
        setVisible(false);
      },
    }));

    const onCancel = () => {
      Alert.alert(
        'Discard changes?',
        "Are you sure you want to discard your changes? This can't be undone",
        [
          {
            text: 'Keep',
            style: 'cancel',
          },
          {
            text: 'Discard',
            onPress: () => {
              setVisible(false);
              if (props.onCancel) {
                props.onCancel();
              }
            },
          },
        ]
      );
    };

    const canvasDimensions = useComputedValue(() => {
      if (!image) {
        return { width: 0, height: 0 };
      }
      let width = 0;
      let height = 0;
      if (
        (image.height() * canvasContainerDimensions.width) / image.width() >
        canvasContainerDimensions.height
      ) {
        height = canvasContainerDimensions.height;
        width =
          (image.width() * canvasContainerDimensions.height) / image.height();
      } else {
        width = canvasContainerDimensions.width;
        height =
          (image.height() * canvasContainerDimensions.width) / image.width();
      }
      return { width, height };
    }, [image, canvasContainerDimensions]);

    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <SafeAreaView
          style={[
            styles.modalContent,
            { backgroundColor: darkMode ? 'black' : 'white' },
          ]}
        >
          <View style={styles.headerBar}>
            <View>
              <IconButton onPress={onCancel} darkMode={darkMode}>
                <XIcon />
              </IconButton>
            </View>
            <View>
              <IconButton onPress={() => {}} darkMode={darkMode} noBackground>
                <UTurnIcon />
              </IconButton>
            </View>
            <View>
              <IconButton onPress={() => {}} darkMode={darkMode}>
                <CheckIcon />
              </IconButton>
            </View>
          </View>
          <View
            style={styles.canvasContainer}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setCanvasContainerDimensions({ width, height });
            }}
          >
            <Canvas
              style={{
                width: canvasDimensions.current.width,
                height: canvasDimensions.current.height,
              }}
            >
              {image && (
                <Image
                  image={image}
                  fit="fill"
                  x={0}
                  y={0}
                  width={canvasDimensions.current.width}
                  height={canvasDimensions.current.height}
                />
              )}
            </Canvas>
          </View>
          <View style={styles.controlsSection}>
            <View style={styles.controlsRow}>
              <View style={styles.brightnessControl}>
                <IconButton
                  onPress={() => setDarkMode((prevState) => !prevState)}
                  darkMode={darkMode}
                  fixedSize
                >
                  <SunIcon />
                </IconButton>
              </View>
              <SegmentedControl
                segments={['Erase', 'Restore']}
                index={modeIndex}
                onChangeIndex={setModeIndex}
                darkMode={darkMode}
              />
            </View>
            <View style={styles.controlsRow}>
              <PencilSizeSlider darkMode={darkMode} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  brightnessControl: {
    left: 0,
    position: 'absolute',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalContent: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
  },
  canvasContainer: {
    flex: 1,
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  controlsSection: {
    marginHorizontal: 20,
  },
});

export interface ImageCutoutEditorRef {
  open: (uri: string) => void;
  close: () => void;
}
