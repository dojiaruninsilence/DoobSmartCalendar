import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { openDatabase, insertText, getLatestText } from './utils/testDatabase';
import { BaseContainer } from './components/BaseContainer';
import { BaseButton } from './components/BaseButton';
import { BaseTextInputBox } from './components/BaseTextInputBox';
import { BaseTextBox } from './components/BaseTextBox'
import { AddEventPage } from './components/events/AddEventPage';
import { ViewEventsPage } from './components/events/ViewEventPage';
import { ViewEventDetailPage } from './components/events/ViewEventDetailPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AddEvent">
          <Stack.Screen name="AddEvent" component={AddEventPage} />
          <Stack.Screen name="ViewEventDetail" component={ViewEventDetailPage} />
          <Stack.Screen name="ViewEvents" component={ViewEventsPage} />
          {/* Add other screens here */}
        </Stack.Navigator>
    </NavigationContainer>
  ); 
}