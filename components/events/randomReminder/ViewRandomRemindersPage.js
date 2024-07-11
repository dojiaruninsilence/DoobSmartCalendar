import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { BaseContainer } from "../../containers/BaseContainer";
import { BaseTextBox } from "../../text/BaseTextBox";
import { getAllRandomReminders } from "../../../services/database/databaseRandomReminders";

export const ViewRandomRemindersPage = ({ navigation }) => {
    const [randomReminders, setRandomReminder] = useState([]);

    useEffect(() => {
        const fetchRandomReminder = async () => {
            try {
                const randomReminderList = await getAllRandomReminders();
                setRandomReminder(randomReminderList);
            } catch (error) {
                console.error('Error fetching random reminders:', error);
            }
        };

        fetchRandomReminder();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <BaseTextBox>{item.content}</BaseTextBox>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('ViewRandomReminderDetail', { randomReminderId: item.id })}
            />
        </View>
    );

    return (
        <BaseContainer>
            <FlatList
                data={randomReminders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </BaseContainer>
    )
};

const styles = StyleSheet.create({
    eventItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dateText: {
        color: '#888',
    },
});