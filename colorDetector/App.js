<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> shlomo
import React, {useEffect, useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid,
} from 'react-native';
import ColorTile from './components/ColorTile';
import {useSharedValue} from 'react-native-reanimated';
<<<<<<< HEAD
>>>>>>> shlomo
=======
>>>>>>> shlomo
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
  onFrameProcessorPerformanceSuggestionAvailable,
} from 'react-native-vision-camera';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {useSharedValue} from 'react-native-reanimated'
=======
>>>>>>> shlomo
=======
const DEFAULT_COLOR = '#000000';
>>>>>>> shlomo
=======
const DEFAULT_COLOR = '#000000';
>>>>>>> shlomo

const App = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [frameProcessorFps, setFrameProcessorFps] = useState(3);
  const firstColor = useSharedValue(DEFAULT_COLOR);
  const secondColor = useSharedValue(DEFAULT_COLOR);
  const thirdColor = useSharedValue(DEFAULT_COLOR);
  const fourthColor = useSharedValue(DEFAULT_COLOR);
  const fifthColor = useSharedValue(DEFAULT_COLOR);
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

    if (cameraPermission === 'authorized') setIsAllowed(true);

    console.log(newCameraPermission, cameraPermission);
  };

  const colorAnimationDuration = useMemo(
    () => (1 / frameProcessorFps) * 1000,
    [frameProcessorFps],
  );

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    primaryColor.value = frame
    console.log(frame);
=======
    console.log(frame);
    const test = __getColorPalette(frame)
    console.log(test);
>>>>>>> shlomo
=======
=======
>>>>>>> shlomo
    var array = __getColorPalette(frame);
    var colors = [];
    while (array.length > 0) {
      colors.push({
        pop: array.substring(
          array.search(/population/i) + 12,
          array.search(/population/i) +
            12 +
            array.slice(array.search(/population/i) + 12).search(']'),
        ),
        rgb:
          '#' +
          array.substring(
            array.search(/rgb/i) + 8,
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
      if ((a.rgb.length = 7)) return a;
    });

    colors = colors
      .sort((a, b) => {
        return b.pop - a.pop;
      })
      .slice(0, 5);

    if (colors.length < 5) return;
    console.log(colors)
    firstColor.value = colors[0].rgb;
<<<<<<< HEAD
    secondColor.value =
      colors[1].rgb === undefined ? DEFAULT_COLOR : colors[1].rgb;
    thirdColor.value =
      colors[2].rgb === undefined ? DEFAULT_COLOR : colors[2].rgb;
    fourthColor.value =
      colors[3].rgb === undefined ? DEFAULT_COLOR : colors[3].rgb;
    fifthColor.value =
      colors[4].rgb === undefined ? DEFAULT_COLOR : colors[4].rgb;
<<<<<<< HEAD
>>>>>>> shlomo
=======
>>>>>>> shlomo
=======
    secondColor.value = colors[1].rgb;
    thirdColor.value = colors[2].rgb;
    fourthColor.value = colors[3].rgb;
    fifthColor.value = colors[4].rgb;
>>>>>>> shlomo
  }, []);

  useEffect(() => {
    getPermissions();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(primaryColor)
=======
    // console.log(firstColor)
>>>>>>> shlomo
=======
>>>>>>> shlomo
=======
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
<<<<<<< HEAD
        <Camera
          style={styles.cameraContainer}
          device={device}
          isActive={true}
<<<<<<< HEAD
          // frameProcessor={frameProcessor}
=======
          frameProcessor={frameProcessor}
<<<<<<< HEAD
<<<<<<< HEAD
          frameProcessorFps={1}
>>>>>>> shlomo
=======
=======
>>>>>>> shlomo
          frameProcessorFps={3}
          onFrameProcessorPerformanceSuggestionAvailable={
            onFrameProcessorPerformanceSuggestionAvailable
          }
<<<<<<< HEAD
>>>>>>> shlomo
=======
>>>>>>> shlomo
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
=======
        {isAllowed && (
          <>
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
          </>
        )}
        {!isAllowed && (
          <>
            <View>
              <Text style={{textAlign: 'center', marginTop: 50}}>
                Please Grant Permissions
              </Text>
              <Text style={{textAlign: 'center', marginTop: 50}}>
                Go to Settings and grant permissions to use camera and restart
                the app.
              </Text>
            </View>
          </>
        )}
>>>>>>> shlomo
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
