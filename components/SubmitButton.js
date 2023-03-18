import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SubmitButton({
  onPress,
  text,
  bgColor = '#FF6C00',
  textColor = '#fff',
  disable,
  style,
}) {
  return (
    <TouchableOpacity
      style={
        disable
          ? { ...styles.button, backgroundColor: '#F6F6F6', ...style }
          : { ...styles.button, backgroundColor: bgColor, ...style }
      }
      onPress={onPress}
    >
      <Text
        style={
          disable
            ? { ...styles.buttonText, color: '#BDBDBD' }
            : { ...styles.buttonText, color: textColor }
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
  },
});
