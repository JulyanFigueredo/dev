import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#7159c1' },
          headerTintColor: '#FFF',
        }}
      >
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ title: 'Usuários', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({ title: route.params.user.name })}
        />
        <Stack.Screen name="Repository" component={Repository} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
