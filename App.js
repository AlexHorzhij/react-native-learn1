import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ScreensWrapper from './Screens/ScreensWrapper';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ScreensWrapper />
      </NavigationContainer>
    </Provider>
  );
}
