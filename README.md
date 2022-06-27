# colorDetector

An app made to scan the area around the user and give the 5 most used colors in each scan.

App is for android only.

The app is made using ReactNative.

the app is using react-native-vision-camera for the active scanning and useProcessor option.

useProcessor can only be used with Worklet from react-native-reanimated.

each frame is sent to a plugin writen in Java and made to receive context from the process worklet and convert it from YUV(android picture) to a bitmap and RGB colors and send back the converted info.

the processor then decyphers the information and puts it into array to be used in the color tiles.
