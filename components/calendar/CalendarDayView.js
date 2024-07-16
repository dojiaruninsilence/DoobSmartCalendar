import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { getTextColor } from '../../utils/colors';

export const CalendarDayView = ({ currentDate, events, onHalfDayClick, navigation }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // function to find overlapping events
    // const findOverlappingEvents = (event, events) => {
    //     return events.filter((e) => {
    //         return (
    //             (event.start_time_hour < e.end_time_hour || (event.start_time_hour === e.end_time_hour && event.start_time_minute < e.end_time_minute)) &&
    //             (event.end_time_hour > e.start_time_hour || (event.end_time_hour === e.start_time_hour && event.end_time_minute > e.start_time_minute)) &&
    //             event.id !== e.id
    //         );
    //     });
    // };

    const calculateEventColumns = (events) => {
        const eventColumns = [];
        const sortedEvents = [...events].sort((a, b) => {
            if (a.start_time_hour !== b.start_time_hour) {
                return a.start_time_hour - b.start_time_hour;
            }
            return a.start_time_minute - b.start_time_minute;
        });

        sortedEvents.forEach(event => {
            let placed = false;
            for (let col of eventColumns) {
                if (!col.some(e =>
                    (event.start_time_hour < e.end_time_hour || (event.start_time_hour === e.end_time_hour && event.start_time_minute < e.end_time_minute)) &&
                    (event.end_time_hour > e.start_time_hour || (event.end_time_hour === e.start_time_hour && event.end_time_minute > e.start_time_minute))
                )) {
                    col.push(event);
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                eventColumns.push([event]);
            }
        });

        return eventColumns;
    };

    const renderEventBox = (event, columnIndex, totalColumns) => {
        const startHour = event.start_time_hour;
        const endHour = event.end_time_hour;
        const startMinute = event.start_time_minute;
        const endMinute = event.end_time_minute;

        const top = (startHour * 60 + startMinute) / (24 * 60) * 100;
        const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) /
            (24 * 60) * 100;
        
        const textColor = getTextColor(event.color);

        const width = `${100 / totalColumns}%`;
        const left = `${columnIndex * (100 / totalColumns)}%`;

        
        return (
            <TouchableOpacity
                key={event.id}
                style={[
                    styles.eventBox,
                    { top: `${top}%`, height: `${height}%`, backgroundColor: event.color, width, left }
                ]}
                onPress={() => navigation.navigate('ViewEventDetail', { eventId: event.id })}
            >
                <Text style={[styles.eventText, { color: textColor }]}>{event.title}</Text>
            </TouchableOpacity>
        );
    };

    const renderEvents = (events) => {
        const eventColumns = calculateEventColumns(events);

        return eventColumns.flatMap((column, columnIndex) =>
            column.map(event => renderEventBox(event, columnIndex, eventColumns.length))
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <View style={styles.halfBoxContainer}>
                    <TouchableOpacity 
                    style={styles.halfBox} 
                    onPress={() => onHalfDayClick(currentDate, 'AM')}
                    >
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Text style={styles.timeText}>12:00 AM - 12:00 PM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.halfBox} 
                        onPress={() => onHalfDayClick(currentDate, 'PM')}
                    >
                        <Text style={styles.dateText}>{formattedDate}</Text>
                        <Text style={styles.timeText}>12:00 PM - 12:00 AM</Text>
                    </TouchableOpacity>
                </View>
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
                    {renderEvents(events)}
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
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 16,
    },
    timeContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
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
        color: '#000',
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
    },
    eventText: {
        fontSize: 14,
    },
    halfBoxContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderWidth: 1,
    },
});