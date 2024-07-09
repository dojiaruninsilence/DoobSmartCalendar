import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

export const CalendarHalfDayView = ({ currentDate, startTime }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const startHour = startTime === 'AM' ? 0 : 12;
    const hours = Array.from({ length: 12 }, (_, i) => i + startHour);

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
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    hourMark: {
        height: '8.33%', // 100% / 12 hours
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    hourText: {
        fontSize: 12,
    },
});