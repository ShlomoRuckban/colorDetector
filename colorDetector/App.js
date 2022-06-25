import React, {useEffect} from 'react';
<<<<<<< HEAD
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
=======
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
>>>>>>> shlomo
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
<<<<<<< HEAD
import {useSharedValue} from 'react-native-reanimated'
=======
>>>>>>> shlomo

const App = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
<<<<<<< HEAD
  const DEFAULT_COLOR = '#000000';
  const primaryColor = useSharedValue(DEFAULT_COLOR);
  const secondaryColor = useSharedValue(DEFAULT_COLOR);
  const backgroundColor = useSharedValue(DEFAULT_COLOR);
  const detailColor = useSharedValue(DEFAULT_COLOR);
=======
>>>>>>> shlomo

  const getPermissions = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const cameraPermission = await Camera.getCameraPermissionStatus();

    console.log(newCameraPermission, cameraPermission);
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
<<<<<<< HEAD
    primaryColor.value = frame
    console.log(frame);
=======
    console.log(frame);
    const test = __getColorPalette(frame)
    console.log(test);
>>>>>>> shlomo
  }, []);

  useEffect(() => {
    getPermissions();
<<<<<<< HEAD
    console.log(primaryColor)
=======
    // console.log(firstColor)
>>>>>>> shlomo
  }, []);

  if (device == null)
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  else
    return (
      <SafeAreaView style={styles.appContainer}>
        <Camera
          style={styles.cameraContainer}
          device={device}
          isActive={true}
<<<<<<< HEAD
          // frameProcessor={frameProcessor}
=======
          frameProcessor={frameProcessor}
          frameProcessorFps={1}
>>>>>>> shlomo
        />
        <View style={styles.infoContainer}></View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    width: '100%',
  },
  cameraContainer: {
    width: '100%',
    height: '80%',
  },
  infoContainer: {
    width: '100%',
    height: '20%',
  },
});

export default App;
