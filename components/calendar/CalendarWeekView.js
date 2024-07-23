import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { calculateEventLayoutWeek } from '../../utils/calendarUtils/eventLayout';

export const CalendarWeekView = ({ currentDate, events, onDayClick, navigation }) => {
    const startOfWeek = moment(currentDate).startOf('week');

    if (!startOfWeek.isValid()) {
        console.warn('Invalid startOfWeek date');
        return null;
    }
    
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.clone().add(i, 'days')
    );

    const renderEventBox = (event) => {

        return (
            <TouchableOpacity
                key={event.id}
                style={[
                    styles.eventBox,
                    {
                        left: `${event.left}%`,
                        width: `${event.width}%`,
                        backgroundColor: event.color,
                    }
                ]}
                onPress={() => navigation.navigate('ViewEventDetail', { eventId: event.id })}            
            >
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.weekContainer}>
        {daysOfWeek.map((day, index) => {
            const dayFormatted = day.format('dddd');
            const dateFormatted = day.format('MM/DD/YY');
            const isToday = day.isSame(currentDate, 'day');

            const eventLayouts = calculateEventLayoutWeek(events, day);

            return (
            <TouchableOpacity
                key={index}
                style={[styles.weekBox, isToday && styles.highlightedBox]}
                onPress={() => onDayClick(day.toDate())}
            >
                <Text style={styles.weekDayText}>{dayFormatted}</Text>
                <Text style={styles.weekDateText}>{dateFormatted}</Text>
                <View style={styles.eventsContainer}>
                    {eventLayouts.map(event => renderEventBox(event))}
                </View>
            </TouchableOpacity>
            );
        })}
        </View>
    );
};

const styles = StyleSheet.create({
    weekContainer: {
        width: '90%',
        height: '80%',
    },
    weekBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    highlightedBox: {
        backgroundColor: '#e0e0e0', // Highlight the current date box
    },
    weekDayText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    weekDateText: {
        fontSize: 14,
    },
    eventsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
    eventBox: {
        position: 'absolute',
        borderRadius: 4,
        padding: 4,
        zIndex: 3,
        height: 20,
    },
});