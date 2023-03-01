import { StyleSheet, TextInput, View, Text, Button } from 'react-native';

export const LoginScreen = () => {
  return (
    <View styles={styles.loginContainer}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput styles={styles.input} placeholder={'Login'} />
        <TextInput styles={styles.input} placeholder={'Password'} />
        <Button title="Sign in" color="#FF6C00" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 500,
    fontSize: 30,
    marginBottom: 32,
  },
  loginContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: 375,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    marginHorizontal: 16,
  },
  input: {
    width: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
  },
});
