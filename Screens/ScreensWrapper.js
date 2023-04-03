import { StatusBar } from 'expo-status-bar';
import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';
import useRouter from '../router';
import * as SplashScreen from 'expo-splash-screen';
import { refreshUserHandler } from '../services/refreshUser';

SplashScreen.preventAutoHideAsync();

export default function ScreensWrapper() {
  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth);
  const [fontsLoaded, setFontsLoaded] = useState(null);
  // const [fontsLoaded] = useFonts({
  //   RobotoRegular: require('../assets/fonts/RobotoRegular.ttf'),
  //   RobotoMedium: require('../assets/fonts/RobotoMedium.ttf'),
  //   RobotoBold: require('../assets/fonts/RobotoBold.ttf'),
  // });

  const routing = useRouter(uid);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          RobotoRegular: require('../assets/fonts/RobotoRegular.ttf'),
          RobotoMedium: require('../assets/fonts/RobotoMedium.ttf'),
          RobotoBold: require('../assets/fonts/RobotoBold.ttf'),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
    refreshUserHandler(dispatch);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {routing}
      <StatusBar style="auto" />
    </View>
  );
}
