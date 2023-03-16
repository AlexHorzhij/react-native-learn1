import { Tabs } from './Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddPublicationScreen from '../Screens/mainScreens/AddPublicationScreen';

const MainStack = createNativeStackNavigator();

export const Main = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Tabs" component={Tabs} />
      <MainStack.Screen
        name="AddPublicationScreen"
        component={AddPublicationScreen}
      />
    </MainStack.Navigator>
  );
};
