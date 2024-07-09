/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  requireNativeComponent,
  useColorScheme,
  NativeModules,
  findNodeHandle,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SubfaceView = requireNativeComponent('VeLivePlayerModule');
const {initSDK, initPlayer, setPlayUrl, play} =
  NativeModules.VeLivePlayerModule;
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const customViewRef = useRef(null);

  const handleAddSubview = () => {
    const reactTag = findNodeHandle(customViewRef.current);
    initSDK().then(res => {
      console.log(res, '===response init sdk===');
      initPlayer(reactTag).then(res => {
        console.log(res, '===response init player===');
      });
    });
  };

  useEffect(() => {
    setTimeout(() => {
      handleAddSubview();
    }, 300);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <SubfaceView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'red',
          opacity: 0.5,
        }}
        ref={customViewRef}
      />
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            setPlayUrl(
              'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
            );
          }}>
          <Text>Set</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            play();
          }}>
          <Text>play</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
