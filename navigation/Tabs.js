import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import {
  PublicationScreen,
  AddPublicationScreen,
  UserScreen,
} from '../Screens/mainScreens';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
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
          shadowColor: '#000',
          elevation: 5,
          shadowOffset: {
            height: 0.5,
          },
          shadowRadius: 14,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 9,
          height: 60,
          // shadowColor: '#000',
          // elevation: 5,
          // shadowOffset: {
          //   height: -0.5,
          // },
          // shadowRadius: 14,
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
            <View style={styles.addButton}>
              <AntDesign name="plus" size={24} color="#fff" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
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
