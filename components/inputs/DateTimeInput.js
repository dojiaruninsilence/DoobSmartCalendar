import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { DateInput } from "./DateInput";
import { TimeInput } from "./TimeInput";

export const DateTimeInput = ({
    label, month, setMonth, monthPlaceholder, day, setDay, dayPlaceholder,
    year, setYear, yearPlaceholder, hour, setHour, hourPlaceholder,
    minute, setMinute, minutePlaceholder }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text>{label}</Text>
                <Text>Date/Time</Text>
            </View>
            <DateInput
                month={month}
                setMonth={setMonth}
                monthPlaceholder={monthPlaceholder}
                day={day}
                setDay={setDay}
                dayPlaceholder={dayPlaceholder}
                year={year}
                setYear={setYear}
                yearPlaceholder={yearPlaceholder}
            />
            <TimeInput
                hour={hour}
                setHour={setHour}
                hourPlaceholder={hourPlaceholder}
                minute={minute}
                setMinute={setMinute}
                minutePlaceholder={minutePlaceholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '23%',
        paddingHorizontal: 10,
    },
});