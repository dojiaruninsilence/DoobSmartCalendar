import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { calculateEventLayoutWeek } from '../../utils/calendarUtils/eventLayout';
import { ScrollView } from 'react-native-gesture-handler';

export const CalendarWeekView = ({ currentDate, events, colorGroups, onDayClick, navigation }) => {
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

    // extract unique color groups used in the currents week's events
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
            <View style={styles.colorKeyContainer}>
                {usedColorGroups.map(group => (
                    <View key={group.id} style={styles.colorGroup}>
                        <View style={[styles.colorBox, { backgroundColor: group.hex_color }]} />
                        <Text style={styles.colorName}>{group.name}</Text>
                        <Text style={styles.colorDescription}>{group.description}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
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
        width: '100%'
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
    colorKeyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        //justifyContent: 'center',
        //alignItems: 'center',
        marginTop: 10,
        width: '100%',
        height: 800, // need to make this automatic dont know why it isnt adjusting height as items added
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
});