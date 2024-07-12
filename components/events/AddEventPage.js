import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Switch, StyleSheet } from 'react-native';

import { BaseButton } from '../buttons/BaseButton';
import { BaseContainer } from '../containers/BaseContainer';
import { BaseTextBox } from '../text/BaseTextBox';
import { BaseTextInputBox } from '../inputs/BaseTextInputBox';
import { addEvent } from '../../services/database/databaseEvents';
import { DateInput } from '../inputs/DateInput';
import { TimeInput } from '../inputs/TimeInput';
import { DateTimeInput } from '../inputs/DateTimeInput';

export const AddEventPage = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startDay, setStartDay] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [endMonth, setEndMonth] = useState('');
    const [endDay, setEndDay] = useState('');
    const [endYear, setEndYear] = useState('');
    const [durationDays, setDurationDays] = useState('');
    const [durationHours, setDurationHours] = useState('');
    const [durationMinutes, setDurationMinutes] = useState('');
    const [importance, setImportance] = useState('');
    const [deadlineHour, setDeadlineHour] = useState('');
    const [deadlineMinute, setDeadlineMinute] = useState('');
    const [deadlineMonth, setDeadlineMonth] = useState('');
    const [deadlineDay, setDeadlineDay] = useState('');
    const [deadlineYear, setDeadlineYear] = useState('');
    const [isRepeating, setIsRepeating] = useState(false);
    const [numberRepeats, setNumberRepeats] = useState('');
    const [isMainEvent, setIsMainEvent] = useState(false);
    const [isSubEvent, setIsSubEvent] = useState(false);
    const [mainEvent, setMainEvent] = useState('');

    const handleAddEvent = async () => {
        try {
            await addEvent({
                title,
                description,
                notes,
                start_time_hour: parseInt(startHour),
                start_time_minute: parseInt(startMinute),
                start_date_month: parseInt(startMonth),
                start_date_day: parseInt(startDay),
                start_date_year: parseInt(startYear),
                end_time_hour: parseInt(endHour),
                end_time_minute: parseInt(endMinute),
                end_date_month: parseInt(endMonth),
                end_date_day: parseInt(endDay),
                end_date_year: parseInt(endYear),
                duration_days: parseInt(durationDays),
                duration_hours: parseInt(durationHours),
                duration_minutes: parseInt(durationMinutes),
                importance: parseInt(importance),
                deadline_time_hour: parseInt(deadlineHour),
                deadline_time_minute: parseInt(deadlineMinute),
                deadline_date_month: parseInt(deadlineMonth),
                deadline_date_day: parseInt(deadlineDay),
                deadline_date_year: parseInt(deadlineYear),
                is_repeating: isRepeating,
                number_repeats: numberRepeats,
                is_main_event: isMainEvent,
                is_sub_event: isSubEvent,
                main_event: mainEvent
            });
            Alert.alert("Success", "Event added successfully");
        } catch (error) {
            Alert.alert("Error", `Failed to add event: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <BaseTextBox>Add New Event</BaseTextBox>

                <BaseTextInputBox
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title"
                />
                <BaseTextInputBox
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description"
                />
                <BaseTextInputBox
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Notes"
                />
                <DateTimeInput
                    label="Start"
                    month={startMonth}
                    setMonth={setStartMonth}
                    monthPlaceholder="MM"
                    day={startDay}
                    setDay={setStartDay}
                    dayPlaceholder="DD"
                    year={startYear}
                    setYear={setStartYear}
                    yearPlaceholder="YYYY"
                    hour={startHour}
                    setHour={setStartHour}
                    hourPlaceholder="HH"
                    minute={startMinute}
                    setMinute={setStartMinute}
                    minutePlaceholder="mm"
                /> 
                <DateTimeInput
                    label="End"
                    month={endMonth}
                    setMonth={setEndMonth}
                    monthPlaceholder="MM"
                    day={endDay}
                    setDay={setEndDay}
                    dayPlaceholder="DD"
                    year={endYear}
                    setYear={setEndYear}
                    yearPlaceholder="YYYY"
                    hour={endHour}
                    setHour={setEndHour}
                    hourPlaceholder="HH"
                    minute={endMinute}
                    setMinute={setEndMinute}
                    minutePlaceholder="mm"
                /> 
                <BaseTextInputBox
                    value={endHour}
                    onChangeText={setEndHour}
                    placeholder="End Hour (0-23)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={endMinute}
                    onChangeText={setEndMinute}
                    placeholder="End Minute (0-59)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={endMonth}
                    onChangeText={setEndMonth}
                    placeholder="End Month (1-12)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={endDay}
                    onChangeText={setEndDay}
                    placeholder="End Day (1-31)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={endYear}
                    onChangeText={setEndYear}
                    placeholder="End Year"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={durationDays}
                    onChangeText={setDurationDays}
                    placeholder="Duration Days (0-999)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={durationHours}
                    onChangeText={setDurationHours}
                    placeholder="Duration Hour (0-23)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={durationMinutes}
                    onChangeText={setDurationMinutes}
                    placeholder="Duration Minutes (0-59)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={importance}
                    onChangeText={setImportance}
                    placeholder="Importance (1-10)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={deadlineHour}
                    onChangeText={setDeadlineHour}
                    placeholder="Deadline Hour (0-23)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={deadlineMinute}
                    onChangeText={setDeadlineMinute}
                    placeholder="Deadline Minute (0-59)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={deadlineMonth}
                    onChangeText={setDeadlineMonth}
                    placeholder="Deadline Month (1-12)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={deadlineDay}
                    onChangeText={setDeadlineDay}
                    placeholder="Deadline Day (1-31)"
                    keyboardType="numeric"
                />
                <BaseTextInputBox
                    value={deadlineYear}
                    onChangeText={setDeadlineYear}
                    placeholder="Deadline Year"
                    keyboardType="numeric"
                />
                
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Is Repeating</Text>
                    <Switch value={isRepeating} onValueChange={setIsRepeating} />
                </View>
                {isRepeating && (
                    <BaseTextInputBox
                        value={numberRepeats}
                        onChangeText={setNumberRepeats}
                        placeholder="Number of times to repeat"
                        keyboardType="numeric"
                    />
                )}
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Is Main Event:</Text>
                    <Switch value={isMainEvent} onValueChange={setIsMainEvent} />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Is Sub Event:</Text>
                    <Switch value={isSubEvent} onValueChange={setIsSubEvent} />
                </View>
                {isSubEvent && (
                    <BaseTextInputBox value={mainEvent} onChangeText={setMainEvent} placeholder="Main Event Title" />
                )}
                <BaseButton title="Add Event" onPress={handleAddEvent} />
                <BaseButton title="View Events" onPress={() => {
                    console.log('Button Pressed');
                    navigation.navigate('ViewEvents');
                }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        color: '#333333',
    },
    tallBox: {
        height: 30,
    },
    dateContainer: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        width: '50%',
    },
    dateInput: {
        height: 40,
        width: '33%',
        borderColor: '#023020',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        width: '30%',
    },
    timeInput: {
        height: 40,
        width: '45%',
        borderColor: '#023020',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '23%',
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '99%',
    },
})