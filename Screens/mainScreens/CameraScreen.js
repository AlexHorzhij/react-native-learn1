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

import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({ navigation, route }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [foto, setFoto] = useState(null);
  const getImage = route.params.saveFoto;

  const takeFoto = async () => {
    const foto = await camera.takePictureAsync();
    setFoto(foto.uri);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setPermission(status === 'granted');
    })();
  }, []);

  const toggleCamera = () => {
    setType(prev =>
      prev === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return Alert(<Text>No access to camera</Text>);
  }

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
            navigation.navigate('AddPublicationScreen');
            getImage(foto);
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
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
  },
  toggleCameraBtn: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});
