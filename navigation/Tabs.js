import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  PublicationScreen,
  AddPublicationScreen,
  UserScreen,
} from '../Screens/mainScreens';

const Tab = createBottomTabNavigator();

export const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: '500',
          fontSize: 17,
          lineHeight: 22,
        },
        headerTitleAlign: 'center',
        headerStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          elevation: 5,
          shadowOffset: {
            height: 0.5,
          },
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 9,
          height: 60,
        },
        tabBarItemStyle: {
          height: 40,
          justifyContent: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Publications"
        component={PublicationScreen}
        options={{
          title: 'Publications',
          tabBarIcon: (focused, color, size) => (
            <Ionicons name="grid-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Create publications"
        component={AddPublicationScreen}
        options={{
          tabBarIcon: (focused, color, size) => (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddPublicationScreen')}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'relative',
    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
