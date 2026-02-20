import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
          <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'My Tasks' }} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}