import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { BaseContainer } from "../../containers/BaseContainer";
import { getRandomReminderById, updateRandomReminder } from "../../../services/database/databaseRandomReminders";

export const EditRandomReminderDetailPage = ({ route, navigation }) => {
    const { randomReminderId } = route.params;
    const [randomReminder, setRandomReminder] = useState(null);
    const [formData, setFormData] = useState({
        content: ''
    });

    useEffect(() => {
        const fetchRandomReminder = async () => {
            try {
                const randomReminderDetail = await getRandomReminderById(randomReminderId);
                setRandomReminder(randomReminderDetail);
                // set initial form data from fetched event
                setFormData({
                    content: randomReminderDetail.content
                });
            } catch (error) {
                console.error('Error fetching random reminder details:', error);
            }
        };

        fetchRandomReminder();
    }, [randomReminderId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateRandomReminder(randomReminderId, formData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating random reminder:', error);
        }
    };

    if (!randomReminder) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <TextInput
                style={styles.input}
                value={formData.content}
                onChangeText={(value) => handleInputChange('content', value)}
                placeholder="Content"
            />
            <Button title="Save" onPress={handleSubmit} />
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});