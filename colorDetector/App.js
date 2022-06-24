import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {useSharedValue} from 'react-native-reanimated'

const App = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const DEFAULT_COLOR = '#000000';
  const primaryColor = useSharedValue(DEFAULT_COLOR);
  const secondaryColor = useSharedValue(DEFAULT_COLOR);
  const backgroundColor = useSharedValue(DEFAULT_COLOR);
  const detailColor = useSharedValue(DEFAULT_COLOR);

  const getPermissions = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const cameraPermission = await Camera.getCameraPermissionStatus();

    console.log(newCameraPermission, cameraPermission);
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    primaryColor.value = frame
    console.log(frame);
  }, []);

  useEffect(() => {
    getPermissions();
    console.log(primaryColor)
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
          // frameProcessor={frameProcessor}
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
