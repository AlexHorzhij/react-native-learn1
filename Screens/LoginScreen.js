import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

export const LoginScreen = () => {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={{ ...styles.input, marginBottom: 16 }}
          placeholder={'Login'}
        />
        <TextInput
          style={{ ...styles.input, marginBottom: 43 }}
          placeholder={'Password'}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 30,
    marginBottom: 32,
  },
  loginContainer: {
    paddingTop: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 489,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: '400',
    fontSize: 16,
    padding: 16,
  },
  button: {
    backgroundColor: '#FF6C00',
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 16,
  },
});
