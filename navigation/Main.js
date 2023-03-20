import { Tabs } from './Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import AddPublicationScreen from '../Screens/mainScreens/AddPublicationScreen';
import { TouchableOpacity, TouchableOpacityComponent } from 'react-native';

const MainStack = createNativeStackNavigator();

export const Main = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AddPublicationScreen"
        component={AddPublicationScreen}
        options={{
          title: 'Create publication',
          headerRight: () => (
            <TouchableOpacity>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
    </MainStack.Navigator>
  );
};
