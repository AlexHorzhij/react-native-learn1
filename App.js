import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ScreensWrapper from './Screens/ScreensWrapper';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ScreensWrapper />
      </NavigationContainer>
    </Provider>
  );
}
