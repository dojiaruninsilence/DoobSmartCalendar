import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { getEventById, updateEvent } from "../../services/database/databaseEvents";
import { getColorGroupByColor, getAllColorGroups } from "../../services/database/databaseColorGroups";
import { BaseContainer } from "../containers/BaseContainer";
import { BaseTextInputBox } from "../inputs/BaseTextInputBox";
import { BaseMidTextInputBox } from "../inputs/BaseMidTextInputBox";
import { DateTimeInput } from "../inputs/DateTimeInput";
import { DurationInput } from "../inputs/DurationInput";
import { BaseDropDownInput } from "../inputs/BaseDropDownInput";
import { ScrollView } from "react-native-gesture-handler";
import { BaseLargeTextInputBox } from "../inputs/BaseLargeTextInputBox";

export const EditEventDetailPage = ({ route, navigation }) => {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);
    const [colorGroups, setColorGroups] = useState([]);
    const [selectedColorGroup, setSelectedColorGroup] = useState('');
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
        main_event: '',
        color: '',
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
                    color: String(eventDetail.color)
                });
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        const fetchColorGroups = async () => {
            try {
                const colorGroupsData = await getAllColorGroups();
                setColorGroups(colorGroupsData);
                const eventDetail = await getEventById(eventId);
                const colorGroup = await getColorGroupByColor(eventDetail.color);
                setSelectedColorGroup(colorGroup ? colorGroup.id : '');
            } catch (error) {
                console.error('Error fetching color groups:', error);
            }
        };

        fetchEvent();
        fetchColorGroups();
    }, [eventId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleColorChange = (value) => {
        setSelectedColorGroup(value);
        setFormData({ ...formData, color: colorGroups.find(group => group.id === value)?.hex_color || '' });
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
            <ScrollView>
                <BaseTextInputBox
                    value={formData.title}
                    onChangeText={(value) => handleInputChange('title', value)}
                    placeholder="Title"
                />
                <BaseMidTextInputBox
                    value={formData.description}
                    onChangeText={(value) => handleInputChange('description', value)}
                    placeholder="Description"
                />
                <DateTimeInput
                    label="Start"
                    month={formData.start_date_month}
                    setMonth={(value) => handleInputChange('start_date_month', value)}
                    monthPlaceholder="MM"
                    day={formData.start_date_day}
                    setDay={(value) => handleInputChange('start_date_day', value)}
                    dayPlaceholder="DD"
                    year={formData.start_date_year}
                    setYear={(value) => handleInputChange('start_date_year', value)}
                    yearPlaceholder="YYYY"
                    hour={formData.start_time_hour}
                    setHour={(value) => handleInputChange('start_time_hour', value)}
                    hourPlaceholder="HH"
                    minute={formData.start_time_minute}
                    setMinute={(value) => handleInputChange('start_time_minute', value)}
                    minutePlaceholder="mm"
                />
                <DateTimeInput
                    label="End"
                    month={formData.end_date_month}
                    setMonth={(value) => handleInputChange('end_date_month', value)}
                    monthPlaceholder="MM"
                    day={formData.end_date_day}
                    setDay={(value) => handleInputChange('end_date_day', value)}
                    dayPlaceholder="DD"
                    year={formData.end_date_year}
                    setYear={(value) => handleInputChange('end_date_year', value)}
                    yearPlaceholder="YYYY"
                    hour={formData.end_time_hour}
                    setHour={(value) => handleInputChange('end_time_hour', value)}
                    hourPlaceholder="HH"
                    minute={formData.end_time_minute}
                    setMinute={(value) => handleInputChange('end_time_minute', value)}
                    minutePlaceholder="mm"
                />
                <DateTimeInput
                    label="Deadline"
                    month={formData.deadline_date_month}
                    setMonth={(value) => handleInputChange('deadline_date_month', value)}
                    monthPlaceholder="MM"
                    day={formData.deadline_date_day}
                    setDay={(value) => handleInputChange('deadline_date_day', value)}
                    dayPlaceholder="DD"
                    year={formData.deadline_date_year}
                    setYear={(value) => handleInputChange('deadline_date_year', value)}
                    yearPlaceholder="YYYY"
                    hour={formData.deadline_time_hour}
                    setHour={(value) => handleInputChange('deadline_time_hour', value)}
                    hourPlaceholder="HH"
                    minute={formData.deadline_time_minute}
                    setMinute={(value) => handleInputChange('deadline_time_minute', value)}
                    minutePlaceholder="mm"
                />
                <DurationInput
                    label="Duration"
                    day={formData.duration_days}
                    setDay={(value) => handleInputChange('duration_days', value)}
                    dayPlaceholder="DD"
                    hour={formData.duration_hours}
                    setHour={(value) => handleInputChange('duration_hours', value)}
                    hourPlaceholder="HH"
                    minute={formData.duration_minutes}
                    setMinute={(value) => handleInputChange('duration_minutes', value)}
                    minutePlaceholder="mm"
                />
                <BaseTextInputBox
                    value={formData.importance}
                    onChangeText={(value) => handleInputChange('importance', value)}
                    placeholder="Importance (1-10)"
                    keyboardType="numeric"
                />
                <BaseDropDownInput
                    label="Color Group"
                    selectedValue={selectedColorGroup}
                    onValueChange={handleColorChange}
                    options={[
                        ...colorGroups.map(group => ({ label: group.name, value: group.id })),
                        { label: 'Create new color group', value: 'create_new' }
                    ]}
                />
                <BaseLargeTextInputBox
                    value={formData.notes}
                    onChangeText={(value) => handleInputChange('notes', value)}
                    placeholder="Notes"
                />
                {/* Add more text input fields as needed for other event properties */}
                <Button title="Save" onPress={handleSubmit} />
            </ScrollView>
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