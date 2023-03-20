import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import user from '../../assets/images/tempFoto/user.jpg';
import PublicationCard from '../../components/userScreenComponents/PublicationCard';
import gallery from '../../assets/dataBase/gallery';
import image1 from '../../assets/images/tempFoto/forest.jpg';

const userData = {
  name: 'Natali Romanova',
  avatar: user,
};
const data = [
  {
    id: '1',
    title: 'Forest',
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
    image: image1,
  },
  {
    id: '2',
    title: 'Forest',
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
    image: image1,
  },
];

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode={'cover'}
        source={require('../../assets/images/backgroundFoto.jpg')}
      >
        {/* <ScrollView> */}
        <View style={styles.userContainer}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={userData.avatar} />

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.avatarDeleteBtnContainer}
            >
              <Ionicons name="close-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutIcon}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.name}>{userData.name}</Text>
          {data.map(item => (
            <View key={item.id}>
              <PublicationCard data={item} />
            </View>
          ))}
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
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
  },
  userContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    top: 145,
    left: 0,
    zIndex: 10,
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
    marginTop: 92,
    marginBottom: 35,
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
  },
});
