import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { getTextColor } from '../../utils/colors';
import { calculateEventLayout } from '../../utils/calendarUtils/eventLayout';

export const CalendarHalfDayView = ({ currentDate, startTime, events, navigation }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const startHour = startTime === 'AM' ? 0 : 12;
    const totalHours = 12;
    const hours = Array.from({ length: totalHours }, (_, i) => i + startHour);
    const eventLayouts = calculateEventLayout(events, startHour, totalHours);

    const renderEventBox = (event) => {
        const textColor = getTextColor(event.color);
        const width = 90 / (eventLayouts.length > 3 ? 3 : eventLayouts.length);

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
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>Half Day View</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.dateText}>{startTime}</Text>
            <View style={styles.hoursContainer}>
                {hours.map((hour) => (
                    <View key={hour} style={styles.hourMark}>
                        <Text style={styles.hourText}>
                            {moment({ hour }).format('h A')}
                        </Text>
                    </View>
                ))}
                <View style={styles.eventsContainer}>
                    {eventLayouts.map(event => renderEventBox(event))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '80%',
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 20,
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
        backgroundColor: 'lightblue',
        borderRadius: 4,
        padding: 4,
    },
    eventText: {
        fontSize: 14,
    },
});