import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

export const CalendarDayView = ({ currentDate }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');

    return (
        <View style={styles.box}>
            <Text style={styles.dateText}>Day View</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
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
});