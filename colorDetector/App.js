import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

const App = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const getPermissions = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const cameraPermission = await Camera.getCameraPermissionStatus();

    console.log(newCameraPermission, cameraPermission);
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.log(frame);
    const test = __getColorPalette(frame)
    console.log(test);
  }, []);

  useEffect(() => {
    getPermissions();
    // console.log(firstColor)
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
          frameProcessor={frameProcessor}
          frameProcessorFps={1}
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
