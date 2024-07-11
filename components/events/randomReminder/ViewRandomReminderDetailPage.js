import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { BaseContainer } from '../../containers/BaseContainer';
import { BaseTextBox } from '../../text/BaseTextBox';
import { deleteRandomReminder, getRandomReminderById } from '../../../services/database/databaseRandomReminders';

export const ViewRandomReminderDetailPage = ({ route, navigation }) => {
    const { randomReminderId } = route.params;
    const [randomReminder, setRandomReminder] = useState(null);

    const handleDeleteRandomReminder = async () => {
        try {
            await deleteRandomReminder(randomReminderId);
            Alert.alert("Success", "Random reminder deleted successfully");
            navigation.navigate('ViewRandomReminders');
        } catch (error) {
            Alert.alert("Error", `failed to delete random reminder: ${error}`);
        }
    }

    useEffect(() => {
        const fetchRandomReminder = async () => {
            try {
                const randomReminderDetail = await getRandomReminderById(randomReminderId);
                setRandomReminder(randomReminderDetail);
            } catch (error) {
                console.error('Error fetching random reminder details:', error);
            }
        };

        fetchRandomReminder();
    }, [randomReminderId]);

    if (!randomReminder) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <BaseTextBox>Content: </BaseTextBox>
            <Text style={styles.detailText}>{randomReminder.content}</Text>
            <Button
                title="Edit Random Reminder"
                onPress={() => navigation.navigate('EditRandomReminderDetail', { randomReminderId: randomReminder.id })}
            />
            <Button title="Delete Random Reminder" onPress={handleDeleteRandomReminder} />
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    detailText: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});