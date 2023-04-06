import { StyleSheet, View, Text, Image } from 'react-native';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import { getAddressFromCoords } from '../../services/getAddressFromCoords';
import { useState } from 'react';

export default function PublicationItem({ data }) {
  const [address, setAddress] = useState(null);

  (async () => {
    const address = await getAddressFromCoords(data.location);
    setAddress(address);
  })();

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.links}>
        <Feather name="message-circle" size={24} color="#BDBDBD" />
        <Text style={styles.commentsCount}>{data.comments.length}</Text>
        <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
        <Text style={styles.location}>{address ? address : 'Somewhere'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    height: 300,
  },

  image: {
    height: 240,
    width: '100%',
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    // fontFamily: 'RobotoBold',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginBottom: 8,
  },
  links: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  commentsCount: {
    color: '#BDBDBD',
    marginLeft: 8,
    marginRight: 'auto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  location: {
    marginLeft: 3,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});
