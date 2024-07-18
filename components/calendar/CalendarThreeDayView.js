import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { getTextColor } from '../../utils/colors';
import { calculateEventLayout } from '../../utils/calendarUtils/eventLayout';

export const CalendarThreeDayView = ({ currentDate, events, prevEvents, nextEvents, onDayClick, navigation }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const prevDate = moment(currentDate).subtract(1, 'days');
    const nextDate = moment(currentDate).add(1, 'days');

    const dates = [prevDate, moment(currentDate), nextDate];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const eventLayouts = calculateEventLayout(events, 0, 24);
    const prevEventLayouts = calculateEventLayout(prevEvents, 0, 24);
    const nextEventLayouts = calculateEventLayout(nextEvents, 0, 24);

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
        );
    };

    return (
        <View style={styles.threeDayContainer}>
            {dates.map((date, index) => {
                const dayEvents = events.filter(event =>
                    moment(event.start_date).isSame(date, 'day')
                );

                let eventLayout;
                //const eventLayouts = calculateEventLayout(dayEvents, 0, 24);
                if (index === 0) {
                    eventLayout = prevEventLayouts;
                } else if (index === 1) {
                    eventLayout = eventLayouts;
                } else if (index === 2) {
                    eventLayout = nextEventLayouts;
                }

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
                            {eventLayout.map(event => renderEventBox(event))}
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