import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { openDatabase, insertText, getLatestText } from './utils/testDatabase';
import { BaseContainer } from './components/containers/BaseContainer';
import { BaseButton } from './components/buttons/BaseButton';
import { BaseTextInputBox } from './components/inputs/BaseTextInputBox';
import { BaseTextBox } from './components/text/BaseTextBox'
import { AddEventPage } from './components/events/AddEventPage';
import { ViewEventsPage } from './components/events/ViewEventPage';
import { ViewEventDetailPage } from './components/events/ViewEventDetailPage';
import { EditEventDetailPage } from './components/events/EditEventDetailPage';
import { MainNavigation } from './components/navigation/MainNavigation';

const Stack = createStackNavigator();

export default function App() {
  return <MainNavigation />; 
}