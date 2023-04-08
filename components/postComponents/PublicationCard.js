import { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserAuth } from '../../redux/auth/authSelector';
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { getAddressFromCoords } from '../../services/getAddressFromCoords';
import { Comments, Likes } from './index';

export default function PublicationCard({ data }) {
  const [address, setAddress] = useState(null);
  const { uid } = useSelector(getUserAuth);
  if (data.owner !== uid) return null;

  (async () => {
    const address = await getAddressFromCoords(data.location);
    setAddress(address);
  })();

  console.log('data: ', data);
  const like = true;
  const comment = true;
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.links}>
        <View style={styles.feadbackContainer}>
          <Comments comments={data.comments} />
          <Likes data={data} uid={uid} />
        </View>
        <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
        <Text style={styles.location}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    marginBottom: 32,
  },

  image: {
    height: 240,
    width: '100%',
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
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
  feadbackContainer: {
    flexDirection: 'row',
    marginRight: 'auto',
    alignItems: 'center',
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
