import { Tabs } from './Tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import {
  AddPublicationScreen,
  CameraScreen,
  FotoPreview,
  MapScreen,
  CommentsScreen,
} from '../Screens/mainScreens';
import { TouchableOpacity } from 'react-native';

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
      <MainStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Location',
        }}
      />
      <MainStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          title: 'CameraScreen',
        }}
      />
      <MainStack.Screen
        name="FotoPreview"
        component={FotoPreview}
        options={{
          title: 'FotoPreview',
        }}
      />
      <MainStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: 'Comments',
        }}
      />
    </MainStack.Navigator>
  );
};
