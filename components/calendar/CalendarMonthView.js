import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { calculateEventLayoutMonthDay, calculateEventLayoutMonthHour, sortAndLimitEvents } from '../../utils/calendarUtils/eventLayout';
import { ScrollView } from 'react-native-gesture-handler';

export const CalendarMonthView = ({ currentDate, events, colorGroups, onDayClick, navigation }) => {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startDayOfMonth = startOfMonth.day();
    const daysInMonth = startOfMonth.daysInMonth();
    const days = Array.from({ length: daysInMonth }, (_, i) =>
        startOfMonth.clone().add(i, 'days')
    );

    const sortedEvents = sortAndLimitEvents(events, 5);

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

    const renderEventBox = (event) => {
        return (
            <View
                key={event.id}
                style={[
                    styles.eventBox,
                    { backgroundColor: event.color, opacity: 0.3 }
                ]}
            />
        );
    };

    const renderEvent = (event) => {
        console.log("Rendering Event:", event);

        return (            
            <Text key={event.id} style={styles.importantEventText}>{event.title}</Text> 
        );
    };

    // extract unique color groups used in the current month's events
    const usedColorGroups = [];
    events.forEach(event => {
        const colorGroup = colorGroups.find(group => group.hex_color === event.color);
        // console.log(colorGroup);
        if (colorGroup && !usedColorGroups.includes(colorGroup)) {
            usedColorGroups.push(colorGroup);
            // console.log(`added color group: ${colorGroup}`);
        }
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.monthContainer}>
                <Text style={styles.monthYearText}>{startOfMonth.format('MMMM YYYY')}</Text>
                {weeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.weekRow}>
                    {week.map((day, dayIndex) => {
                        if (day) {
                            const dateFormatted = day.format('DD');
                            const isToday = day.isSame(currentDate, 'day');

                            const dayEvents = calculateEventLayoutMonthDay(events, day);
                            return (
                                <TouchableOpacity
                                key={dayIndex}
                                style={[styles.dayBox, isToday && styles.highlightedBox]}
                                onPress={() => onDayClick(day.toDate())}
                                >
                                    <Text style={styles.dayDateText}>{dateFormatted}</Text>
                                    <View style={styles.hoursContainer}>
                                        {Array.from({ length: 24 }, (_, hourIndex) => {
                                            const eventLayouts = calculateEventLayoutMonthHour(dayEvents, hourIndex);
                                            
                                            return (
                                                <View key={hourIndex} style={styles.hourBox}>
                                                    {eventLayouts.map(event => renderEventBox(event))}
                                                </View>
                                            );
                                        })}
                                    </View>
                                </TouchableOpacity>
                            );
                        } else {
                            return <View key={dayIndex} style={styles.emptyBox} />;
                        }
                    })}
                    </View>
                ))}
            </View>
            <View style={styles.colorKeyContainer}>
                {usedColorGroups.map(group => (
                    <View key={group.id} style={styles.colorGroup}>
                        <View style={[styles.colorBox, { backgroundColor: group.hex_color }]} />
                        <Text style={styles.colorName}>{group.name}</Text>
                        <Text style={styles.colorDescription}>{group.description}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.importantEventsContainer}>
                <Text>Important Events:</Text>
                {sortedEvents.map(event => renderEvent(event))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    monthContainer: {
        width: '90%',
        height: '30%',
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
        zIndex: 2,
    },
    emptyBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        marginHorizontal: 2,
        opacity: 0,
    },
    hoursContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 1,
    },
    hourBox: {
        width: '16.5%',
        height: '25%',
    },
    eventBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    colorKeyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        marginTop: 10,
        width: '100%',
        height: 200, // need to fix this look at week
    },
    colorGroup: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        alignItems: 'center',
    },
    colorBox: {
        width: 20,
        height: 20,
        marginBottom: 5,
    },
    colorName: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    colorDescription: {
        fontStyle: 'italic',
    },
    importantEventsContainer: {
        width: '90%',
        height: 100,
        backgroundColor: '#f0f0f0', // Add a background color to debug
        justifyContent: 'center',
        alignItems: 'center',
    },
    importantEventText: {
        fontSize: 16,
        marginVertical: 2,
    },
});