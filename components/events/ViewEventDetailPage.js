import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { getEventById, deleteEvent } from '../../services/database/databaseEvents';
import { BaseButton } from '../BaseButton';
import { BaseContainer } from '../BaseContainer';
import { BaseTextBox } from '../BaseTextBox';

export const ViewEventDetailPage = ({ route, navigation }) => {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);

    const handleDeleteEvent = async () => {
        try {
            await deleteEvent(eventId);
            Alert.alert("Success", "Event deleted successfully");
            navigation.navigate('ViewEvents');
        } catch (error) {
            Alert.alert("Error", 'failed to delete event: ${error}');
        }
    }

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventDetail = await getEventById(eventId);
                setEvent(eventDetail);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (!event) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <BaseTextBox>{event.title}</BaseTextBox>
            <Text style={styles.detailText}>Description: {event.description}</Text>
            <Text style={styles.detailText}>Notes: {event.notes}</Text>
            <Text style={styles.detailText}>Start Time: {formatDateTime(event.start_date_year, event.start_date_month, event.start_date_day, event.start_time_hour, event.start_time_minute)}</Text>
            <Text style={styles.detailText}>End Time: {formatDateTime(event.end_date_year, event.end_date_month, event.end_date_day, event.end_time_hour, event.end_time_minute)}</Text>
            <Text style={styles.detailText}>Deadline: {formatDateTime(event.deadline_date_year, event.deadline_date_month, event.deadline_date_day, event.deadline_time_hour, event.deadline_time_minute)}</Text>
            <Text style={styles.detailText}>Importance: {event.importance}</Text>
            <Text style={styles.detailText}>Repeating: {event.is_repeating ? 'Yes' : 'No'}</Text>
            <Text style={styles.detailText}>Main Event: {event.is_main_event ? 'Yes' : 'No'}</Text>
            <Button
                title="Edit Event"
                onPress={() => navigation.navigate('EditEventDetail', { eventId: event.id })}
            />
            <Button title="Delete Event" onPress={handleDeleteEvent} />
        </BaseContainer>
    );
};

const formatDateTime = (year, month, day, hour, minute) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 
    ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
    detailText: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});