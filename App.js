import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { LoginScreen } from './Screens/LoginScreen';
export default function App() {
  return (
    <ImageBackground
      style={styles.background}
      resizeMode={'cover'}
      source={require('./assets/images/backgroundFoto.jpg')}
    >
      <View style={styles.container}>
        <LoginScreen />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
