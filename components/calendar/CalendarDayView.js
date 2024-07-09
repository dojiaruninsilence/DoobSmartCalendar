import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

export const CalendarDayView = ({ currentDate, onHalfDayClick }) => {
    const formattedDate = moment(currentDate).format('MMMM Do YYYY');
    const hours = Array.from({ length: 24 }, (_, i) => i);

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
        fontSize: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    halfBoxContainer: {
        flex:3,
    },
    halfBox: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    timeText: {
        fontSize: 18,
    },
    hoursContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hourMark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    hourText: {
        fontSize: 12,
    },
});