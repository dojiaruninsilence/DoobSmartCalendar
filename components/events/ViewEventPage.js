import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { getAllEvents } from "../../services/database/databaseEvents";
import { BaseButton } from "react-native-gesture-handler";
import { BaseContainer } from "../containers/BaseContainer";
import { BaseTextBox } from "../text/BaseTextBox";

const formatDateTime = (year, month, day, hour, minute) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 
    ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

export const ViewEventsPage = ({ navigation }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsList = await getAllEvents();
                setEvents(eventsList);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <BaseTextBox>{item.title}</BaseTextBox>
            <Text style={styles.dateText}>
                {formatDateTime(
                    item.start_date_year, item.start_date_month, item.start_date_day,
                    item.start_time_hour, item.start_time_minute
                )}
            </Text>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('ViewEventDetail', { eventId: item.id })}
            />
        </View>
    );

    return (
        <BaseContainer>
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </BaseContainer>
    );
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
})