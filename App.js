import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import IntroSliders from './IntroSlides';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular
} from '@expo-google-fonts/roboto';
export default function App() {

  const [showApp, setShowApp] = useState(false)

  let [fontsLoaded] = useFonts({
    Roboto_900Black,
    Roboto_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (showApp) {
    return (
      <>
        {/* <StatusBar translucent /> */}
        <View style={styles.container}>
          <Text>Welcome sir</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <IntroSliders onDone={() => setShowApp(true)} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
