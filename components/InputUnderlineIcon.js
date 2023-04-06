import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function InputUnderlineIcon({
  icon,
  placeholder,
  style,
  onFocus,
  onChange,
  onIconPress,
  btnStyle,
  value,
}) {
  return (
    <View style={{ ...styles.inputContainer, ...style }}>
      {icon && (
        <TouchableOpacity onPress={onIconPress} style={btnStyle}>
          {icon}
        </TouchableOpacity>
      )}
      <TextInput
        placeholder={placeholder}
        style={styles.inputText}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
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
  iconButton: {
    height: '100%',
    paddingHorizontal: 10,
  },
});
