import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Switch, StyleSheet } from 'react-native';

import { BaseButton } from '../../buttons/BaseButton';
import { BaseContainer } from '../../containers/BaseContainer';
import { BaseTextBox } from '../../text/BaseTextBox';
import { BaseTextInputBox } from '../../inputs/BaseTextInputBox';
import { addRandomReminder } from '../../../services/database/databaseRandomReminders';

export const AddRandomReminderPage = ({ navigation }) => {
    const [content, setContent] = useState('');

    const handleAddRandomReminder = async () => {
        try {
            await addRandomReminder({
                content: content
            });
            Alert.alert("Success", "Random reminder added succesfully");
        } catch (error) {
            Alert.alert("Error", `Failed to add random reminder: ${error}`);
        }
    };

    return (
        <BaseContainer>
            <BaseTextBox>Add New Random Reminder</BaseTextBox>

            <BaseTextInputBox
                value={content}
                onChangeText={setContent}
                placeholder="Content"
            />
            <BaseButton title="Add Random Reminder" onPress={handleAddRandomReminder} />
            <BaseButton title="View Random Reminder" onPress={() => {
                console.log('Button Pressed');
                navigation.navigate('ViewRandomReminders');
            }} />
        </BaseContainer>
    );
};