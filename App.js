import React from 'react';
import { Provider as PaperProvider, Appbar, Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import Chat from './screens/Chat';
import Contacts from './screens/Contacts';

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Chat' >
        <Tab.Screen name='Chat' component={Chat} options={{
          tabBarIcon: ({focused, color, size}) => <MaterialIcons name='chat-bubble' size={20} color={color}/>
        }}/>
        <Tab.Screen name='Contacts' component={Contacts} options={{
          tabBarIcon: ({focused, color, size}) => <MaterialIcons name='contacts' size={20} color={color}/>
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Chat app" subtitle={'A simple chat app using websockets'} />
        <Appbar.Action icon='dots-vertical' />
      </Appbar.Header>
      <Tabs />
    </PaperProvider>
  );
}
