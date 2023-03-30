import { StyleSheet, ImageBackground, View } from 'react-native';

export default function FotoPreview({ route }) {
  console.log('route', route);
  if (!route) return null;
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{ uri: route.params.foto }}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'center',
  },
});
