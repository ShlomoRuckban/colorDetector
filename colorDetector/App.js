import React, {useEffect, useState, useMemo} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ColorTile from './components/ColorTile';
import {useSharedValue} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
  onFrameProcessorPerformanceSuggestionAvailable,
} from 'react-native-vision-camera';
const DEFAULT_COLOR = '#000000';

const App = () => {
  const [frameProcessorFps, setFrameProcessorFps] = useState(3);
  const firstColor = useSharedValue(DEFAULT_COLOR);
  const secondColor = useSharedValue(DEFAULT_COLOR);
  const thirdColor = useSharedValue(DEFAULT_COLOR);
  const fourthColor = useSharedValue(DEFAULT_COLOR);
  const fifthColor = useSharedValue(DEFAULT_COLOR);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const getPermissions = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const cameraPermission = await Camera.getCameraPermissionStatus();

    console.log(newCameraPermission, cameraPermission);
  };

  const colorAnimationDuration = useMemo(
    () => (1 / frameProcessorFps) * 1000,
    [frameProcessorFps],
  );

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    var array = __getColorPalette(frame);
    var colors = [];
    while (array.length > 0) {
      colors.push({
        pop: array.substring(
          array.search(/population/i) + 12,
          array.search(/population/i) +
            12 +
            array.slice(array.search(/population/i) + 12).search(']'),
        ) ,
        rgb: array.substring(
          array.search(/rgb/i) + 5,
          array.search(/rgb/i) +
            5 +
            array.slice(array.search(/rgb/i) + 5).search(']'),
        ),
      });
      array = array.slice(
        array.search(/population/i) +
          12 +
          array.slice(array.search(/population/i) + 12).search(']'),
      );
    }

    colors = colors.filter(a => {
      if ((a.rgb.length = 9)) return a;
    });

    colors = colors
      .sort((a, b) => {
        return b.pop - a.pop;
      })
      .slice(0, 5);
      
    if (colors.length < 5) return;
    firstColor.value = colors[0].rgb;
    secondColor.value =
      colors[1].rgb === undefined ? DEFAULT_COLOR : colors[1].rgb;
    thirdColor.value =
      colors[2].rgb === undefined ? DEFAULT_COLOR : colors[2].rgb;
    fourthColor.value =
      colors[3].rgb === undefined ? DEFAULT_COLOR : colors[3].rgb;
    fifthColor.value =
      colors[4].rgb === undefined ? DEFAULT_COLOR : colors[4].rgb;
  }, []);

  useEffect(() => {
    getPermissions();
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
          frameProcessorFps={3}
          onFrameProcessorPerformanceSuggestionAvailable={
            onFrameProcessorPerformanceSuggestionAvailable
          }
        />
        <View style={styles.infoContainer}>
          <ColorTile
            name="1st"
            color={firstColor}
            animationDuration={colorAnimationDuration}
          />
          <ColorTile
            name="2nd"
            color={secondColor}
            animationDuration={colorAnimationDuration}
          />
          <ColorTile
            name="3rd"
            color={thirdColor}
            animationDuration={colorAnimationDuration}
          />
          <ColorTile
            name="4th"
            color={fourthColor}
            animationDuration={colorAnimationDuration}
          />
          <ColorTile
            name="5th"
            color={fifthColor}
            animationDuration={colorAnimationDuration}
          />
        </View>
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
    flexDirection: 'row',
  },
  colorContainer: {
    width: '20%',
    height: '100%',
  },
});

export default App;
