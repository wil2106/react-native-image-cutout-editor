import * as React from 'react';

import { Button, SafeAreaView, StyleSheet } from 'react-native';
import {
  ImageCutoutEditor,
  ImageCutoutEditorRef,
} from 'react-native-image-cutout-editor';

export default function App() {
  const ref = React.useRef<ImageCutoutEditorRef>();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Open"
        onPress={() =>
          ref.current?.open(
            'https://media.vogue.fr/photos/63282dbd6b2fecf7f6402532/3:4/w_1536,h_2048,c_limit/Fc9-RcUXgAEgljY.jpeg'
            //'https://www.okvoyage.com/wp-content/uploads/2019/11/ski-810x540.jpg'
          )
        }
      />
      <ImageCutoutEditor ref={ref} onEdit={() => {}} onCancel={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
