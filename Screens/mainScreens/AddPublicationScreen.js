import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import {
  InputUnderlineIcon,
  SubmitButton,
  DeleteBottomButton,
} from '../../components';

import * as Location from 'expo-location';

const postData = {
  title: '',
  comments: [],
  likes: 0,
  location: { latitude: 0, longitude: 0 },
  image: '',
  owner: '',
};

export default function AddPublicationScreen({ navigation, route }) {
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [post, setPost] = useState(postData);
  const [coord, setCoord] = useState(postData.location);
  const foto = route.params?.foto ? route.params.foto : null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();

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

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const location = { latitude: coords.latitude, longitude: coords.longitude };
    console.log('location: ', location);
    setCoord(location);
    navigation.navigate('MapScreen', { location });
  };

  const getAddressFromCoords = async coord => {
    console.log('coord: ', coord);
    const address = await Location.reverseGeocodeAsync(coord);
    console.log('address: ', address);
  };

  useEffect(() => {
    getAddressFromCoords(coord);
  }, [coord]);
  const publishPost = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <ImageBackground style={styles.image} source={{ uri: foto }}>
            <TouchableOpacity
              style={styles.makeFotoBtn}
              onPress={() => navigation.navigate('CameraScreen')}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ImageBackground>
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
              onChange={value =>
                setPost(prev => {
                  return { ...prev, title: value };
                })
              }
            />
            <InputUnderlineIcon
              onIconPress={getLocation}
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
          <SubmitButton text={'Publish'} onPress={publishPost} />
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
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  makeFotoBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
