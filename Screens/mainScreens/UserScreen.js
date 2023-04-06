import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { getUserAuth } from '../../redux/auth/authSelector';
import { getAllPosts } from '../../redux/posts/postsSelector';
import { updateUser } from '../../redux/auth/authOperations';

import { ScrollView } from 'react-native-gesture-handler';
import PublicationCard from '../../components/userScreenComponents/PublicationCard';
// import gallery from '../../assets/dataBase/gallery';
import { useLogout } from '../../services/hooks/useLogout';
import * as ImagePicker from 'expo-image-picker';

// const data = [
//   {
//     id: '1',
//     title: 'Forest',
//     commentsCount: 0,
//     location: "Ivano-Frankivs'k Region, Ukraine",
//     image: '../../assets/images/tempFoto/forest.jpg',
//   },
//   {
//     id: '2',
//     title: 'Forest',
//     commentsCount: 0,
//     location: "Ivano-Frankivs'k Region, Ukraine",
//     image: '../../assets/images/tempFoto/forest.jpg',
//   },
// ];

export default function UserScreen() {
  const logout = useLogout();
  const { name, avatar } = useSelector(getUserAuth);
  const { posts } = useSelector(getAllPosts);
  const dispatch = useDispatch();

  const removeAvatar = () => {
    Alert.alert('Delete', 'Do you want delete photo?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => dispatch(updateUser({ photoURL: null })),
      },
    ]);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0].uri;
      console.log('image: ', image);
      dispatch(updateUser({ photoURL: image }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode={'cover'}
        source={require('../../assets/images/backgroundFoto.jpg')}
      >
        <ScrollView>
          <View style={styles.userContainer}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                <Image style={styles.avatar} source={{ uri: avatar }} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.avatarDeleteBtnContainer}
                onPress={removeAvatar}
              >
                <Ionicons name="close-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.logoutIcon} onPress={logout}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
            {posts.map(item => (
              <View key={item.id} style={{ width: '100%' }}>
                <PublicationCard data={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  userContainer: {
    paddingHorizontal: 20,
    top: 145,
    left: 0,
    marginBottom: 145,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    width: 140,
    height: 120,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatarDeleteBtnContainer: {
    position: 'absolute',
    right: -12,
    bottom: 15,
    zIndex: 50,
    backgroundColor: '#fff',
    size: 24,
    borderRadius: Dimensions.get('window').width * 0.5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },
  name: {
    alignSelf: 'center',
    marginTop: 92,
    marginBottom: 35,
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
  },
});
