import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import moment from "moment";

import { CalendarHalfDayView } from "./CalendarHalfDayView";
import { CalendarDayView } from "./CalendarDayView";
import { CalendarThreeDayView } from "./CalendarThreeDayView";
import { CalendarWeekView } from "./CalendarWeekView";
import { CalendarMonthView } from "./CalendarMonthView";
import { CalendarYearView } from "./CalenderYearView";
import { getEventsForDate } from "../../services/database/databaseEvents";

export const CalendarViewPage = ({ navigation }) => {
    const [zoomLevel, setZoomLevel] = useState('day');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [halfDayStartTime, setHalfDayStartTime] = useState(null);
    const [events, setEvents] = useState([]);
    const [prevEvents, setPrevEvents] = useState([]);
    const [nextEvents, setNextEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const dateStr = moment(currentDate).format('YYYY-MM-DD');
            const prevDateStr = moment(currentDate).subtract(1, 'days').format('YYYY-MM-DD');
            const nextDateStr = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
            let fetchedEvents = await getEventsForDate(dateStr);
            setEvents(fetchedEvents);
            fetchedEvents = await getEventsForDate(prevDateStr);
            setPrevEvents(fetchedEvents);
            fetchedEvents = await getEventsForDate(nextDateStr);
            setNextEvents(fetchedEvents);
        };

        fetchEvents();
    }, [currentDate]);

    const handleGesture = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX < -30) {
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
            } else if (nativeEvent.translationX > 30) {
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
            } else if (nativeEvent.translationY > 30 && zoomLevel === 'halfDay') {
                // swipe down - switch to AM half
                setHalfDayStartTime('AM');
            } else if (nativeEvent.translationY < -30 && zoomLevel === 'halfDay') {
                // swipe up - switch to PM half
                setHalfDayStartTime('PM');
            }
        }
    };

    const handleDayClick = (date) => {
        setCurrentDate(date);
        setZoomLevel('day');
    };

    const handleHalfDayClick = (date, startTime) => {
        setCurrentDate(date);
        setHalfDayStartTime(startTime);
        setZoomLevel('halfDay');
    };

    const renderCalendar = () => {
        switch (zoomLevel) {
            case 'halfDay':
                return <CalendarHalfDayView
                    currentDate={currentDate}
                    events={events}
                    startTime={halfDayStartTime}
                    navigation={navigation}
                />;
            case 'day':
                return <CalendarDayView
                    currentDate={currentDate}
                    events={events}
                    onHalfDayClick={handleHalfDayClick}
                    navigation={navigation}
                />;
            case '3Day':
                return <CalendarThreeDayView
                    currentDate={currentDate}
                    events={events}
                    prevEvents={prevEvents}
                    nextEvents={nextEvents}
                    onDayClick={handleDayClick}
                    navigation={navigation}
                />;
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