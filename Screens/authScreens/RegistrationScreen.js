import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/authOperations';
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
import { SubmitButton } from '../../components';

const initialState = {
  name: '',
  email: '',
  password: '',
};

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(signUp(state));
    keyboardVisibleHandler(false);
    setState(initialState);
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
              height: isOpenKeyboard ? 374 : 549,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <Text style={styles.title}>Registration</Text>
              <View style={styles.formContainer}>
                <TextInput
                  style={{ ...styles.input, marginBottom: 16 }}
                  placeholder={'Name'}
                  value={state.name}
                  onChangeText={value =>
                    setState(prev => ({ ...prev, name: value }))
                  }
                  onFocus={() => keyboardVisibleHandler(true)}
                />
                <TextInput
                  style={{ ...styles.input, marginBottom: 16 }}
                  placeholder={'Login'}
                  value={state.email}
                  onChangeText={value =>
                    setState(prev => ({ ...prev, email: value }))
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
                <SubmitButton
                  onPress={submitForm}
                  text={'Sign up'}
                  bgColor={'#FF6C00'}
                  textColor={'#fff'}
                  style={{ marginBottom: 16 }}
                />
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('LoginScreen')}
                >
                  Do you have account? Sing in!
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
