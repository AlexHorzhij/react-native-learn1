import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { CommentsItem, CommentsInputField } from '../../components';

const CommentsScreen = ({ route }) => {
  const { comments, image, postId } = route.params;

  console.log('comments: ', comments);
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={styles.imageContainer}>
          <ImageBackground source={{ uri: image }} style={styles.image} />
        </View>
        {/* <View style={styles.commentsContainer}> */}
        {comments.length === 0 ? (
          <Text>No comments yet...</Text>
        ) : (
          comments.map(item => (
            <View key={item.id} style={{ width: '100%', marginBottom: 24 }}>
              <CommentsItem comment={item} />
            </View>
          ))
        )}
        {/* </View> */}
      </ScrollView>
      <CommentsInputField postId={postId} />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 16,
    paddingBottom: 16,
  },
  imageContainer: {
    marginVertical: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 20,
  },
  commentsContainer: {
    // marginBottom: 32,
    // width: '100%',
  },
});
