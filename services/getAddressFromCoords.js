import * as Location from 'expo-location';

export const getAddressFromCoords = async coords => {
  const data = await Location.reverseGeocodeAsync(coords);
  if (data.length === 0) {
    return null;
  }
  console.log(
    '`${data[0].region}, ${data[0].country}`: ',
    `${data[0].region}, ${data[0].country}`
  );
  return `${data[0].region}, ${data[0].country}`;
};
