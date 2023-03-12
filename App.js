import { StatusBar } from 'expo-status-bar';
import { LoginScreen } from './Screens/LoginScreen';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';

import { StyleSheet, View } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      <LoginScreen />
      {/* <RegistrationScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
