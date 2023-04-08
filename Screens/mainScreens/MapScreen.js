import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ navigation, route }) {
  const { location, choosePlace } = route.params;
  const [coords, setCoords] = useState(location);

  const chooseCurrentPlace = async () => {
    await choosePlace(coords);
    // navigation.navigate('AddPublicationScreen');
    console.log(coords);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{ ...coords, latitudeDelta: 0.001, longitudeDelta: 0.002 }}
        zoomEnabled={true}
        scrollEnabled={true}
        showsScale={true}
      >
        <Marker coordinate={coords} />
      </MapView>
      <TouchableOpacity style={styles.btn} onPress={chooseCurrentPlace}>
        <Text style={styles.btnText}>I AM HEAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    bottom: 80,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 24,
  },
});
