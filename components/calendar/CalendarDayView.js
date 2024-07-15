import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export const CalendarDayView = ({ currentDate, events, onHalfDayClick, navigation }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const hours = Array.from({ length: 24 }, (_, i) => i);

    const renderEventBox = (event) => {
        const startHour = event.start_time_hour;
        const endHour = event.end_time_hour;
        const startMinute = event.start_time_minute;
        const endMinute = event.end_time_minute;

        const top = (startHour * 60 + startMinute) / (24 * 60) * 100;
        const height = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) /
            (24 * 60) * 100;
        
        return (
            <TouchableOpacity
                key={event.id}
                style={[
                    styles.eventBox,
                    { top: `${top}%`, height: `${height}%`, backgroundColor: event.color }
                ]}
                onPress={() => navigation.navigate('ViewEventDetail', { eventId: event.id })}
            >
                <Text style={styles.eventText}>{event.title}</Text>
            </TouchableOpacity>
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
                    {events.map(event => renderEventBox(event))}
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
        left: '5%',
        width: '90%',
        backgroundColor: 'lightblue',
        borderRadius: 4,
        padding: 4,
    },
    eventText: {
        fontSize: 14,
        color: '#000',
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