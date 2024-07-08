import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import moment from "moment";

export const CalendarViewPage = () => {
    const [zoomLevel, setZoomLevel] = useState('day');
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleGesture = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX < 0) {
                // swipe left - advance date
                setCurrentDate(prevDate => {
                    if (zoomLevel === 'week') {
                        return new Date(prevDate.setDate(prevDate.getDate() + 7));
                    } else {
                        return new Date(prevDate.setDate(prevDate.getDate() + 1));
                    }
                });
            } else if (nativeEvent.translationX > 0) {
                // swipe right - go back in time
                setCurrentDate(prevDate => {
                    if (zoomLevel === 'week') {
                        return new Date(prevDate.setDate(prevDate.getDate() - 7));
                    } else {
                        return new Date(prevDate.setDate(prevDate.getDate() - 1));
                    }
                });
            }
        }
    };

    const handleDayClick = (date) => {
        setCurrentDate(date);
        setZoomLevel('3Day');
    };

    const renderCalendar = () => {
        const formattedDate = moment(currentDate).format('MMMM Do YYYY');
        const prevDate = moment(currentDate).subtract(1, 'days').format('MM/DD/YY');
        const nextDate = moment(currentDate).add(1, 'days').format('MM/DD/YY');

        switch (zoomLevel) {
            case 'halfDay':
                return (
                    <View style={styles.box}>
                        <Text style={styles.dateText}>Half Day View</Text>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                );
            case 'day':
                return (
                    <View style={styles.box}>
                        <Text style={styles.dateText}>Day View</Text>
                        <Text style={styles.dateText}>{formattedDate}</Text>
                    </View>
                );
            case '3Day':
                return (
                    <View style={styles.threeDayContainer}>
                        <View style={styles.smallBox}>
                            <Text style={styles.smallDateText}>{prevDate}</Text>
                        </View>
                        <View style={[styles.smallBox, styles.centerBox]}>
                            <Text style={styles.dateText}>{formattedDate}</Text>
                        </View>
                        <View style={styles.smallBox}>
                            <Text style={styles.smallDateText}>{nextDate}</Text>
                        </View>
                    </View>
                );
            case 'week':
                const startOfWeek = moment(currentDate).startOf('week');
                const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
                    startOfWeek.clone().add(i, 'days')
                );

                return (
                    <View style={styles.weekContainer}>
                        {daysOfWeek.map((day, index) => {
                            const dayFormatted = day.format('dddd');
                            const dateFormatted = day.format('MM/DD/YY');
                            const isToday = day.isSame(currentDate, 'day');
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.weekBox, isToday && styles.highlightedBox]}
                                    onPress={() => handleDayClick(day.toDate())}
                                >
                                    <Text style={styles.weekDayText}>{dayFormatted}</Text>
                                    <Text style={styles.weekDateText}>{dateFormatted}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );
            case 'month':
                return <Text>Month View</Text>
            case 'year':
                return <Text>Year View</Text>
            default:
                return <Text>Day View</Text>
        }
    };

    return (
        <PanGestureHandler onHandlerStateChange={handleGesture}>
            <View style={styles.container}>
                <View style={styles.controls}>
                    <Button title="Half Day" onPress={() => setZoomLevel('halfDay')} />
                    <Button title="Day" onPress={() => setZoomLevel('day')} />
                    <Button title="3 Day" onPress={() => setZoomLevel('3Day')} />
                    <Button title="Week" onPress={() => setZoomLevel('week')} />
                    <Button title="Month" onPress={() => setZoomLevel('month')} />
                    <Button title="Year" onPress={() => setZoomLevel('year')} />
                </View>
                <View style={styles.calendar}>
                    {renderCalendar()}
                </View>
            </View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    calendar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '90%',
        height: '80%',
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        backgroundColor: '#e0e0e0',
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
    },
    highlightedBox: {
        backgroundColor: '#e0e0e0',
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    smallDateText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    weekDayText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    weekDateText: {
        fontSize: 14,
    },
});