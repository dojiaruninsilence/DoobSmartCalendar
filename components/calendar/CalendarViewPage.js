import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import moment from "moment";

import { CalendarHalfDayView } from "./CalendarHalfDayView";
import { CalendarDayView } from "./CalendarDayView";
import { CalendarThreeDayView } from "./CalendarThreeDayView";
import { CalendarWeekView } from "./CalendarWeekView";
import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarYearView } from "./CalenderYearView";

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
                    } else if (zoomLevel === 'month') {
                        return new Date(prevDate.setMonth(prevDate.getMonth() + 1));
                    } else if (zoomLevel === 'year') {
                        return new Date(prevDate.setFullYear(prevDate.getFullYear() + 1));
                    } else {
                        return new Date(prevDate.setDate(prevDate.getDate() + 1));
                    }
                });
            } else if (nativeEvent.translationX > 0) {
                // swipe right - go back in time
                setCurrentDate(prevDate => {
                    if (zoomLevel === 'week') {
                        return new Date(prevDate.setDate(prevDate.getDate() - 7));
                    } else if (zoomLevel === 'month') {
                        return new Date(prevDate.setMonth(prevDate.getMonth() - 1));
                    } else if (zoomLevel === 'year') {
                        return new Date(prevDate.setFullYear(prevDate.getFullYear() - 1));
                    } else {
                        return new Date(prevDate.setDate(prevDate.getDate() - 1));
                    }
                });
            }
        }
    };

    const handleDayClick = (date) => {
        setCurrentDate(date);
        setZoomLevel('day');
    };

    const renderCalendar = () => {
        switch (zoomLevel) {
            case 'halfDay':
                return <CalendarHalfDayView currentDate={currentDate} />;
            case 'day':
                return <CalendarDayView currentDate={currentDate} />;
            case '3Day':
                return <CalendarThreeDayView currentDate={currentDate} onDayClick={handleDayClick} />;
            case 'week':
                return <CalendarWeekView currentDate={currentDate} onDayClick={handleDayClick} />;
            case 'month':
                return <CalendarMonthView currentDate={currentDate} onDayClick={handleDayClick} />;
            case 'year':
                return <CalendarYearView currentDate={currentDate} onMonthClick={handleDayClick} />;
            default:
                return <CalendarDayView currentDate={currentDate} />;
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
});