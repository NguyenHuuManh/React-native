import React, {useEffect, useState} from 'react';
import {Button, TouchableOpacity} from 'react-native';

import {
  PermissionsAndroid,
  StyleSheet,
  View,
  requireNativeComponent,
  NativeModules,
  Text,
} from 'react-native';
// import RNFS from 'react-native-fs'
const RNFS = require('react-native-fs');
const {CameraModule} = NativeModules;
const CameraViewer = requireNativeComponent('RCTCameraView');
export default () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    console.log('====initial===');
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        console.log(granted, '===granted===');
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
      }
    };

    requestPermissions();
  }, []);

  const startRecording = async () => {
    CameraModule.startRecording(
      1080,
      1920,
      error => console.error(error),
      () => setIsRecording(true),
    );
  };

  const stopRecording = () => {
    CameraModule.stopRecording(filePath => {
      setIsRecording(false);
      console.log('Video saved to:', filePath);
    });
  };

  const pauseRecording = () => {
    CameraModule.pauseRecording(
      error => console.error(error),
      () => setIsPaused(true),
    );
  };

  const resumeRecording = () => {
    CameraModule.resumeRecording(
      error => console.error(error),
      () => setIsPaused(false),
    );
  };
  return (
    <View style={styles.container}>
      <CameraViewer style={styles.cameraView} />
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
        <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
      </TouchableOpacity>
      {isRecording && (
        <TouchableOpacity onPress={isPaused ? resumeRecording : pauseRecording}>
          <Text>{isPaused ? 'Resume Recording' : 'Pause Recording'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  cameraView: {
    width: '100%',
    height: '70%',
  },
});
