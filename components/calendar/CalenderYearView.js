import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';

export const CalendarYearView = ({ currentDate, onMonthClick }) => {
    const months = moment.months();
    const currentMonth = moment(currentDate).month();

    return (
        <View style={styles.yearContainer}>
            <Text style={styles.yearText}>{moment(currentDate).format('YYYY')}</Text>
            <ScrollView>
                {months.map((month, index) => {
                const isCurrentMonth = index === currentMonth;
                    return (
                        <TouchableOpacity
                        key={index}
                        style={[styles.monthBox, isCurrentMonth && styles.highlightedBox]}
                        onPress={() => onMonthClick(moment(currentDate).month(index).toDate())}
                        >
                            <Text style={styles.monthText}>{month}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    yearContainer: {
        width: '90%',
        height: '80%',
    },
    yearText: {
        fontSize: 20,
        marginBottom: 16,
    },
    monthBox: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    highlightedBox: {
        backgroundColor: '#e0e0e0', // Highlight the current month box
    },
    monthText: {
        fontSize: 16,
    },
});