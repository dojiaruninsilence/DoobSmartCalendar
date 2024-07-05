import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { getEventById, updateEvent } from "../../services/database/databaseEvents";
import { BaseContainer } from "../BaseContainer";

export const EditEventDetailPage = ({ route, navigation }) => {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        notes: '',
        start_time_hour: '',
        start_time_minute: '',
        start_date_month: '',
        start_date_day: '',
        start_date_year: '',
        end_time_hour: '',
        end_time_minute: '',
        end_date_month: '',
        end_date_day: '',
        end_date_year: '',
        duration_days: '',
        duration_hours: '',
        duration_minutes: '',
        importance: '',
        deadline_time_hour: '',
        deadline_time_minute: '',
        deadline_date_month: '',
        deadline_date_day: '',
        deadline_date_year: '',
        is_repeating: '',
        number_repeats: '',
        is_main_event: '',
        is_sub_event: '',
        main_event: ''
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventDetail = await getEventById(eventId);
                setEvent(eventDetail);
                // set initial form data from fetched event
                setFormData({
                    title: eventDetail.title,
                    description: eventDetail.description,
                    notes: eventDetail.notes,
                    start_time_hour: String(eventDetail.start_time_hour),
                    start_time_minute: String(eventDetail.start_time_minute),
                    start_date_month: String(eventDetail.start_date_month),
                    start_date_day: String(eventDetail.start_date_day),
                    start_date_year: String(eventDetail.start_date_year),
                    end_time_hour: String(eventDetail.end_time_hour),
                    end_time_minute: String(eventDetail.end_time_minute),
                    end_date_month: String(eventDetail.end_date_month),
                    end_date_day: String(eventDetail.end_date_day),
                    end_date_year: String(eventDetail.end_date_year),
                    duration_days: String(eventDetail.duration_days),
                    duration_hours: String(eventDetail.duration_hours),
                    duration_minutes: String(eventDetail.duration_minutes),
                    importance: String(eventDetail.importance),
                    deadline_time_hour: String(eventDetail.deadline_time_hour),
                    deadline_time_minute: String(eventDetail.deadline_time_minute),
                    deadline_date_month: String(eventDetail.deadline_date_month),
                    deadline_date_day: String(eventDetail.deadline_date_day),
                    deadline_date_year: String(eventDetail.deadline_date_year),
                    is_repeating: eventDetail.is_repeating ? 'true' : 'false',
                    number_repeats: String(eventDetail.number_repeats),
                    is_main_event: eventDetail.is_main_event ? 'true' : 'false',
                    is_sub_event: eventDetail.is_sub_event ? 'true' : 'false',
                    main_event: eventDetail.main_event ? 'true' : 'false',
                });
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateEvent(eventId, formData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    if (!event) {
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
                value={formData.title}
                onChangeText={(value) => handleInputChange('title', value)}
                placeholder="Title"
            />
            <TextInput
                style={styles.input}
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                placeholder="Description"
            />
            <TextInput
                style={styles.input}
                value={formData.notes}
                onChangeText={(value) => handleInputChange('notes', value)}
                placeholder="Notes"
            />
            <TextInput
                style={styles.input}
                value={formData.start_time_hour}
                onChangeText={(value) => handleInputChange('start_time_hour', value)}
                placeholder="Start Time Hour"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={formData.start_time_minute}
                onChangeText={(value) => handleInputChange('start_time_minute', value)}
                placeholder="Start Time Minute"
                keyboardType="numeric"
            />
            {/* Add more text input fields as needed for other event properties */}
            <Button title="Save" onPress={handleSubmit} />
        </BaseContainer>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});