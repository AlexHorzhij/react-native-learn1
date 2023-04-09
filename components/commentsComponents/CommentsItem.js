import { StyleSheet, View, Image, Text } from 'react-native';

const CommentsItem = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: comment.userAvatar }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.commentText}>{comment.comment}</Text>
        <Text style={styles.data}>{comment.date}</Text>
      </View>
    </View>
  );
};

export default CommentsItem;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // marginHorizontal: 16,
    flexDirection: 'row',
  },
  avatarContainer: {
    width: 44,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
  },
  textContainer: {
    flexGrow: 1,
    // width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  commentText: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  data: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'right',
    color: '#BDBDBD',
    marginTop: 8,
  },
});
