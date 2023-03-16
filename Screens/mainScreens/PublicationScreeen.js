import { View, Text, Image, StyleSheet } from 'react-native';
import { userFoto } from '../../assets/images/tempFoto/user.jpg';

const user = {
  userAvatar: '../../assets/images/tempFoto/user.jpg',
  userName: 'Natali Romanova',
  userEmail: 'email@example.com',
};

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
