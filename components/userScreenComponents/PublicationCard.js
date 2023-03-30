import { StyleSheet, View, Text, Image } from 'react-native';
import { Feather, SimpleLineIcons, AntDesign } from '@expo/vector-icons';

export default function PublicationCard({ data }) {
  const like = true;
  const comment = true;
  return (
    <View style={styles.container}>
      <Image source={{ uri: data.url }} style={styles.image} />
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.links}>
        <View style={styles.feadbackContainer}>
          <Feather
            name="message-circle"
            size={24}
            color={data.comments.length > 0 ? '#FF6C00' : '#BDBDBD'}
          />
          <Text style={styles.commentsCount}>{data.comments.length}</Text>
          {like ? (
            <AntDesign name="like1" size={24} color="#FF6C00" />
          ) : (
            <AntDesign name="like2" size={24} color="#BDBDBD" />
          )}
          <Text style={styles.commentsCount}>{data.like}</Text>
        </View>
        <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
        <Text style={styles.location}>{data.location}</Text>
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
  commentsCount: {
    color: '#212121',
    marginLeft: 8,
    marginRight: 24,
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
