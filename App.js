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
import { AddEventPage } from './components/AddEventPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="AddEvent">
            <Stack.Screen name="AddEvent" component={AddEventPage} />
            {/* Add other screens here */}
        </Stack.Navigator>
    </NavigationContainer>
  );
  // const [textInput, setTextInput] = useState('');
  // const [latestText, setLatestText] = useState('No entries found');

  // useEffect(() => {
  //   const initializeDatabase = async () => {
  //     await openDatabase();
  //     fetchLatestText();
  //   };

  //   initializeDatabase();
  // }, []);

  // const fetchLatestText = async () => {
  //   try {
  //     const latest = await getLatestText();
  //     if (latest && latest.text) {
  //       console.log("Latest text fetched:", latest.text);
  //       setLatestText(latest.text);
  //     } else {
  //       console.log("No entries found in the database");
  //       setLatestText('No entries found');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching latest text:", error);
  //     setLatestText('Error fetching latest text');
  //   }
  // };

  // const handleButtonPress = async () => {
  //   try {
  //     await insertText(textInput);
  //     setTextInput('');
  //     fetchLatestText();
  //   } catch (error) {
  //     console.error("Error inserting text:", error);
  //   }
  // };

  // return (
  //   <BaseContainer>
  //     <View style={styles.container}>
  //       <BaseTextInputBox
  //         value={textInput}
  //         onChangeText={setTextInput}
  //         placeholder="Enter event details"
  //       />
  //       <BaseButton title="Add Event" onPress={handleButtonPress} />
  //       <BaseTextBox>Latest Text: {latestText}</BaseTextBox>
  //       <StatusBar style="auto" />
  //     </View>
  //   </BaseContainer>
  // );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//     width: '100%',
//     color: '#fff',
//   },
//   text: {
//     color: '#fff',
//     marginTop: 20,
//   },
// });