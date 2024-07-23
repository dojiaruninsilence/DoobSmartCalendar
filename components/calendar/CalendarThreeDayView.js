import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { getTextColor } from '../../utils/colors';
import { calculateEventLayout, calculateEventLayoutThreeDay } from '../../utils/calendarUtils/eventLayout';

export const CalendarThreeDayView = ({ currentDate, events, onDayClick, navigation }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const currDate = moment(currentDate);
    const prevDate = moment(currentDate).subtract(1, 'days');
    const nextDate = moment(currentDate).add(1, 'days');

    const dates = [prevDate, moment(currentDate), nextDate];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const {
        prevEventLayouts, prevNumberOfColumns,
        currentEventLayouts, currentNumberOfColumns,
        nextEventLayouts, nextNumberOfColumns
    } = calculateEventLayoutThreeDay(events, currentDate);
    
    const renderEventBox = (event, numCol) => {
        const textColor = getTextColor(event.color);
        const width = 90 / numCol;

        return (
            <TouchableOpacity
                key={event.id}
                style={[
                    styles.eventBox,
                    {
                        top: `${event.top}%`,
                        height: `${event.height}%`,
                        backgroundColor: event.color,
                        width: `${width}%`,
                        left: `${event.column * width + 5}%`,
                    }
                ]}
                onPress={() => navigation.navigate('ViewEventDetail', { eventId: event.id })}
            >
                <Text style={[styles.eventText, { color: textColor }]}>{event.title}</Text>
            </TouchableOpacity>
        );
    };

    const pickDay = (index) => {
        if (index === 0) {
            return prevEventLayouts.map(event => renderEventBox(event, prevNumberOfColumns));
        } else if (index === 1) {
            return currentEventLayouts.map(event => renderEventBox(event, currentNumberOfColumns));
        } else if (index === 2) {
            return nextEventLayouts.map(event => renderEventBox(event, nextNumberOfColumns));
        }
    }

    return (
        <View style={styles.threeDayContainer}>
            {dates.map((date, index) => {
                return (
                    <TouchableOpacity
                        key={date}
                        style={[styles.dayContainer, index === 1 && styles.centerBox]}
                        onPress={() => onDayClick(date.toDate())}
                    >
                        
                        <Text style={styles.dateText}>{date.format('MMMM Do YYYY')}</Text>
                        <View style={styles.hoursContainer}>
                            {hours.map((hour) => (
                                <View key={hour} style={styles.hourMark}>
                                    <Text style={styles.hourText}>
                                        {moment({ hour }).format('h A')}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.eventsContainer}>
                            {pickDay(index)}
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    threeDayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        height: '80%',
    },
    dayContainer: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        position: 'relative',
    },
    centerBox: {
        backgroundColor: '#e0e0e0', // Highlight the center box
    },
    dateText: {
        fontSize: 20,
    },
    smallDateText: {
        fontSize: 16,
    },
    hoursContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    hourMark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    hourText: {
        fontSize: 12,
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
    },
    eventText: {
        fontSize: 14,
    },
});