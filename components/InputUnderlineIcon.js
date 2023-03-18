import { View, TextInput, StyleSheet } from 'react-native';

export default function InputUnderlineIcon({
  icon,
  placeholder,
  style,
  onFocus,
}) {
  return (
    <View style={{ ...styles.inputContainer, ...style }}>
      {icon}
      <TextInput
        placeholder={placeholder}
        style={styles.inputText}
        onFocus={onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  inputText: {
    flex: 1,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4,
    placeholderTextColor: '#BDBDBD',
    color: '#212121',
  },
});
