import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export const CalendarWeekView = ({ currentDate, weekEvents, onDayClick, navigation }) => {
    const startOfWeek = moment(currentDate).startOf('week');
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.clone().add(i, 'days')
    );

    return (
        <View style={styles.weekContainer}>
        {daysOfWeek.map((day, index) => {
            const dayFormatted = day.format('dddd');
            const dateFormatted = day.format('MM/DD/YY');
            const isToday = day.isSame(currentDate, 'day');
            return (
            <TouchableOpacity
                key={index}
                style={[styles.weekBox, isToday && styles.highlightedBox]}
                onPress={() => onDayClick(day.toDate())}
            >
                <Text style={styles.weekDayText}>{dayFormatted}</Text>
                <Text style={styles.weekDateText}>{dateFormatted}</Text>
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
});