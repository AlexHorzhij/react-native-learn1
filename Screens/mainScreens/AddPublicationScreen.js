import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAuth } from '../../redux/auth/authSelector';
import { addPost } from '../../redux/posts/postsOperations';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
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
import {
  InputUnderlineIcon,
  SubmitButton,
  DeleteBottomButton,
} from '../../components';
import { getAddressFromCoords } from '../../services/getAddressFromCoords';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function AddPublicationScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [isOpenKeyboard, setIsOpenKeyboard] = useState(false);
  const [coord, setCoord] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState({});
  const [title, setTitle] = useState('');

  const { uid } = useSelector(getUserAuth);
  const dispatch = useDispatch();

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

  const choosePlace = async coords => {
    const place = await getAddressFromCoords(coords);
    setAddress(place);
    // navigation.navigate('AddPublicationScreen');
  };

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync();
    const location = { latitude: coords.latitude, longitude: coords.longitude };

    setCoord(location);
    navigation.navigate('MapScreen', { location, choosePlace });
  };

  const publishPost = () => {
    const postData = {
      title: title,
      comments: [],
      likes: [],
      location: coord,
      image,
      owner: uid,
    };

    dispatch(addPost(postData));
    navigation.navigate('Publications');
  };

  const loadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveFoto = foto => {
    setImage(foto);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <ImageBackground style={styles.image} source={{ uri: image }}>
            <TouchableOpacity
              style={styles.makeFotoBtn}
              onPress={() => navigation.navigate('CameraScreen', { saveFoto })}
            >
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity onPress={loadImage}>
            <Text style={styles.cameraText}>Load foto</Text>
          </TouchableOpacity>
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
              onChange={setTitle}
            />
            <InputUnderlineIcon
              value={address}
              onIconPress={getLocation}
              btnStyle={{
                borderColor: '#BDBDBD',
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                marginRight: 10,
                // backgroundColor: '#E8E8E8',
              }}
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
              onChange={setAddress}
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
