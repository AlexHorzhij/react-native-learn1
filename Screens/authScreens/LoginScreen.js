import { useState, useEffect } from 'react';

import {
  StyleSheet,
  TextInput,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

const initialState = {
  login: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsOpenKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsOpenKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardVisibleHandler = flag => {
    setIsOpenKeyboard(flag);
    if (!flag) {
      Keyboard.dismiss();
    }
  };

  const submitForm = () => {
    keyboardVisibleHandler(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => keyboardVisibleHandler(false)}>
        <ImageBackground
          style={styles.background}
          resizeMode={'cover'}
          source={require('../../assets/images/backgroundFoto.jpg')}
        >
          <View
            style={{
              ...styles.loginContainer,
              height: isOpenKeyboard ? 248 : 485,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Text style={styles.title}>Login</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={{ ...styles.input, marginBottom: 16 }}
                  placeholder={'Login'}
                  value={state.login}
                  onChangeText={value =>
                    setState(prev => ({ ...prev, login: value }))
                  }
                  onFocus={() => keyboardVisibleHandler(true)}
                />
                <TextInput
                  style={{ ...styles.input, marginBottom: 43 }}
                  placeholder={'Password'}
                  value={state.password}
                  onChangeText={value =>
                    setState(prev => ({ ...prev, password: value }))
                  }
                  onFocus={() => keyboardVisibleHandler(true)}
                />
                <TouchableOpacity style={styles.button} onPress={submitForm}>
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('RegistrationScreen')}
                >
                  You don't have account? Sing up!
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Roboto',
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 32,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loginContainer: {
    width: '100%',
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: '400',
    fontSize: 16,
    padding: 16,
  },
  button: {
    backgroundColor: '#FF6C00',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    alignSelf: 'center',
    color: '#1B4371',
    fontSize: 16,
  },
});
