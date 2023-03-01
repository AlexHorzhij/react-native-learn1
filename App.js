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
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  // loginContainer: {
  //   // flex: 1,
  //   width: 375,
  //   backgroundColor: '#FFFFFF',
  //   // alignContent: 'flex-end',
  // },
  // formContainer: {
  //   marginHorizontal: 16,
  // },
  // input: {
  //   backgroundColor: '#F6F6F6',
  //   borderColor: '#E8E8E8',
  //   borderWidth: 1,
  //   borderRadius: 8,
  // },
});
