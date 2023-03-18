import { View, Text, Image, StyleSheet } from 'react-native';
import PublicationItem from '../../components/publicationScreenComponents/PublicationItem';
import image from '../../assets/images/tempFoto/forest.jpg';

const user = {
  userAvatar: '../../assets/images/tempFoto/user.jpg',
  userName: 'Natali Romanova',
  userEmail: 'email@example.com',
};
const data = [
  {
    id: '1',
    title: 'Forest',
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
    image,
  },
  {
    id: '2',
    title: 'Forest',
    commentsCount: 0,
    location: "Ivano-Frankivs'k Region, Ukraine",
    image,
  },
];

export default function PublicationScreeen() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/tempFoto/user.jpg')}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{user.userName}</Text>
          <Text>{user.userEmail}</Text>
        </View>
      </View>
      {data.map(item => (
        <View key={item.id} style={{ marginBottom: 32 }}>
          <PublicationItem data={item} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    color: '#212121',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    color: 'rgba(33, 33, 33, 0.8)',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 11,
  },
});
