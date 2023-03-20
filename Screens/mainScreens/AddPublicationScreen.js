import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import {
  InputUnderlineIcon,
  SubmitButton,
  DeleteBottomButton,
} from '../../components';

export default function AddPublicationScreen() {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <View style={styles.camera}></View>
          <Text style={styles.cameraText}>Load foto</Text>
        </View>

        <View
          style={{ ...styles.form, marginBottom: isOpenKeyboard ? 20 : null }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%' }}
          >
            <InputUnderlineIcon
              placeholder="Title..."
              style={{ marginBottom: 16 }}
              onFocus={() => keyboardVisibleHandler(true)}
            />
            <InputUnderlineIcon
              icon={
                <SimpleLineIcons
                  name="location-pin"
                  size={24}
                  color="#E8E8E8"
                />
              }
              placeholder="Location..."
              style={{ marginBottom: 32 }}
              onFocus={() => keyboardVisibleHandler(true)}
            />
          </KeyboardAvoidingView>
          <SubmitButton text={'Publish'} />
        </View>
        <DeleteBottomButton
          style={{
            marginBottom: 34,
            display: isOpenKeyboard ? 'none' : 'flex',
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cameraContainer: {
    marginBottom: 32,
    width: '100%',
  },
  camera: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginBottom: 8,
  },
  cameraText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4,
    color: '#BDBDBD',
  },
  form: {
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
});
