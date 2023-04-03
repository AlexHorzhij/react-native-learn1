import { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Alert,
} from 'react-native';
import API from '../../api/API';

import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [foto, setFoto] = useState(null);

  const takeFoto = async () => {
    const foto = await camera.takePictureAsync();
    setFoto(foto.uri);
  };

  const saveFoto = async () => {
    const res = await fetch(foto);
    const file = await res.blob();
    console.log(file);
    API.saveInStorage(file);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setPermission(status === 'granted');
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return Alert(<Text>No access to camera</Text>);
  }

  const toggleCamera = () => {
    setType(prev =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <Camera style={styles.camera} type={type} ref={setCamera}>
      <TouchableOpacity
        style={styles.prewievContainer}
        onPress={() => navigation.navigate('FotoPreview', { foto })}
      >
        <ImageBackground
          source={{ uri: foto }}
          style={{ flex: 1 }}
          resizeMode={'contain'}
        ></ImageBackground>
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.publishBtn}
          onPress={() => {
            navigation.navigate('AddPublicationScreen', { foto });
            saveFoto();
          }}
        >
          <Text style={styles.publishText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={takeFoto}
        ></TouchableOpacity>
        <TouchableOpacity style={styles.toggleCameraBtn} onPress={toggleCamera}>
          <MaterialIcons name="flip-camera-android" size={34} color="#fff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  prewievContainer: {
    position: 'absolute',
    width: 150,
    height: 150,
    right: 20,
    top: 20,
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // publishBtn: {
  //   width,
  // },
  publishText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 20,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  button: {
    // position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    // bottom: 50,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
  },
  toggleCameraBtn: {
    // position: 'absolute',
    width: 70,
    height: 70,
    // right: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // bottom: 50,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
