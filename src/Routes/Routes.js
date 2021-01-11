import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/Login/Login';
import {Title} from 'react-native-paper';
import {Button} from 'react-native';
import Home from '../views/Home/Home';
import Task from '../views/Task/Task';

const Stack = createStackNavigator();
const MyTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    card: 'rgb(0, 145, 244)',
    border: 'rgb(0, 145, 244)',
    text: 'rgb(255, 255, 255)',
  },
};
const Routes = () => {
  const headerTitle = {
    title: 'Task Manager',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="/" component={Login} options={headerTitle} />
        <Stack.Screen name="UserHome" component={Home} />
        <Stack.Screen name="Task" component={Task} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
