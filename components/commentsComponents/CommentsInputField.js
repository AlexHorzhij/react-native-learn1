import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  // KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUserAuth } from '../../redux/auth/authSelector';
import { publishComment } from '../../redux/posts/postsOperations';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { v4 } from 'uuid';

const CommentsInputField = ({ postId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(getUserAuth);

  const sendComment = () => {
    if (comment === '') return;
    const commentData = {
      data: {
        comment,
        userName: name,
        userAvatar: avatar,
        date: Date.now(),
        id: v4(),
      },
      postId,
    };
    console.log('commentData: ', commentData);
    dispatch(publishComment(commentData));
    setComment('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Comment..."
        style={styles.commentInput}
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.button} onPress={sendComment}>
        <AntDesign name="arrowup" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default CommentsInputField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 42,
    marginHorizontal: 16,
  },
  commentInput: {
    height: 50,
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    paddingHorizontal: 16,
  },
  button: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#FF6C00',
    width: 34,
    height: 34,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
