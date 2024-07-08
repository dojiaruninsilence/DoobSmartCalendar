import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from "react-native-gesture-handler";

export const CalendarViewPage = () => {
    const [zoomLevel, setZoomLevel] = useState('day');
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleGesture = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX < 0) {
                // swipe left - advance date
                setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)));
            } else if (nativeEvent.translationX > 0) {
                // swipe right - go back in time
                setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
            }
        }
    };

    const renderCalendar = () => {
        switch (zoomLevel) {
            case 'halfDay':
                return <Text>Half Day View</Text>
            case 'day':
                return <Text>Day View</Text>
            case '3Day':
                return <Text>3-Day View</Text>
            case 'week':
                return <Text>Week View</Text>
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
                    <Text>{currentDate.toDateString()}</Text>
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