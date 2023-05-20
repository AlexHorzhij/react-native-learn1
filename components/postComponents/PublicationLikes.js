import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { likePost } from '../../redux/posts/postsOperations';

const Likes = ({ data, uid }) => {
  const { status, postId, likes } = data;
  const [liked, setLiked] = useState(status);
  const dispatch = useDispatch();

  const likedPost = () => {
    dispatch(likePost({ userId: uid, liked: !liked, postId }));
    setLiked(prev => !prev);
  };

  return (
    <TouchableOpacity onPress={likedPost} style={styles.likesBtn}>
      {status ? (
        <AntDesign name="like1" size={24} color="#FF6C00" />
      ) : (
        <AntDesign name="like2" size={24} color="#BDBDBD" />
      )}
      <Text style={styles.likesCounter}>{likes.length}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  likesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCounter: {
    color: '#212121',
    marginLeft: 8,
    marginRight: 24,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default Likes;
