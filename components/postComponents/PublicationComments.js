import { StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Comments = ({ comments }) => {
  return (
    <>
      <Feather
        name="message-circle"
        size={24}
        color={comments.length > 0 ? '#FF6C00' : '#BDBDBD'}
      />
      <Text style={styles.commentsCount}>{comments.length}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  commentsCount: {
    color: '#212121',
    marginLeft: 8,
    marginRight: 24,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
});

export default Comments;
