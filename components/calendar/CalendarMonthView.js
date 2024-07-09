import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export const CalendarMonthView = ({ currentDate, onDayClick }) => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startDayOfMonth = startOfMonth.day();
    const daysInMonth = startOfMonth.daysInMonth();
    const days = Array.from({ length: daysInMonth }, (_, i) =>
        startOfMonth.clone().add(i, 'days')
    );

    for (let i = 0; i < startDayOfMonth; i++) {
        days.unshift(null);
    }

    // add placeholders for days after the end of the month to fill the last week
    const endDayOfMonth = endOfMonth.day();
    for (let i = endDayOfMonth + 1; i < 7; i++) {
        days.push(null);
    }

    const weeks = [];
    
    while (days.length) {
        weeks.push(days.splice(0, 7));
    }

    return (
        <View style={styles.monthContainer}>
            <Text style={styles.monthYearText}>{startOfMonth.format('MMMM YYYY')}</Text>
            {weeks.map((week, weekIndex) => (
                <View key={weekIndex} style={styles.weekRow}>
                {week.map((day, dayIndex) => {
                    if (day) {
                        const dateFormatted = day.format('DD');
                        const isToday = day.isSame(currentDate, 'day');
                        return (
                            <TouchableOpacity
                            key={dayIndex}
                            style={[styles.dayBox, isToday && styles.highlightedBox]}
                            onPress={() => onDayClick(day.toDate())}
                            >
                                <Text style={styles.dayDateText}>{dateFormatted}</Text>
                            </TouchableOpacity>
                        );
                    } else {
                        return <View key={dayIndex} style={styles.emptyBox} />;
                    }
                })}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    monthContainer: {
        width: '90%',
        height: '80%',
    },
    monthYearText: {
        fontSize: 20,
        marginBottom: 16,
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 4,
    },
    dayBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
    },
    highlightedBox: {
        backgroundColor: '#e0e0e0', // Highlight the current date box
    },
    dayDateText: {
        fontSize: 16,
    },
    emptyBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        marginHorizontal: 2,
        opacity: 0,
    },
});