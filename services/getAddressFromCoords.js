import * as Location from 'expo-location';

export const getAddressFromCoords = async coords => {
  const data = await Location.reverseGeocodeAsync(coords);
  if (data.length === 0) {
    return null;
  }
  return `${data[0].region}, ${data[0].country}`;
};
