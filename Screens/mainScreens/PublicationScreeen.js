import { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAuth } from '../../redux/auth/authSelector';
import PublicationCard from '../../components/postComponents/PublicationCard';
import { getAllPosts } from '../../redux/posts/postsSelector';
import { getPosts } from '../../redux/posts/postsOperations';

export default function PublicationScreeen({ navigation }) {
  const { posts } = useSelector(getAllPosts);
  const { name, email, avatar } = useSelector(getUserAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: avatar }} style={styles.image} />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {posts &&
          posts.map(item => (
            <View key={item.postId} style={{ marginBottom: 32 }}>
              <PublicationCard data={item} navigation={navigation} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
