import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { requestPermissions } from './services/notifications/notifications';

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
import { migrateDatabase } from './services/database/databaseMigration';
import { deleteOldDatabase } from './services/database/deleteOldDatabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    requestPermissions();
  }, []);

  (async () => {
    try {
      // await migrateDatabase();
      // await deleteOldDatabase();
    } catch (error) {
      console.error(`Migration or deletion failed: ${error}`);
    }
  })();
  
  return <MainNavigation />; 
}