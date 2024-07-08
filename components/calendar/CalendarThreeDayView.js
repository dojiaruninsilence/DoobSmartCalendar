import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export const CalendarThreeDayView = ({ currentDate, onDayClick }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const prevDate = moment(currentDate).subtract(1, 'days').format('MM/DD/YY');
    const nextDate = moment(currentDate).add(1, 'days').format('MM/DD/YY');

    return (
        <View style={styles.threeDayContainer}>
            <TouchableOpacity style={styles.smallBox} onPress={() => onDayClick(moment(currentDate).subtract(1, 'days').toDate())}>
                <Text style={styles.smallDateText}>{prevDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallBox, styles.centerBox]} onPress={() => onDayClick(currentDate)}>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallBox} onPress={() => onDayClick(moment(currentDate).add(1, 'days').toDate())}>
                <Text style={styles.smallDateText}>{nextDate}</Text>
            </TouchableOpacity>
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
    smallBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
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
});