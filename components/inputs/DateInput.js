import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export const DateInput = ({
    month, setMonth, monthPlaceholder, day, setDay, dayPlaceholder,
    year, setYear, yearPlaceholder }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.monthInput}
                value={month}
                onChangeText={setMonth}
                placeholder={monthPlaceholder}
                placeholderTextColor="#8A8A8A"
            />
            <TextInput
                style={styles.dayInput}
                value={day}
                onChangeText={setDay}
                placeholder={dayPlaceholder}
                placeholderTextColor="#8A8A8A"
            />
            <TextInput
                style={styles.yearInput}
                value={year}
                onChangeText={setYear}
                placeholder={yearPlaceholder}
                placeholderTextColor="#8A8A8A"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 170,
    },
    monthInput: {
        height: 40,
        width: 50,
        borderColor: '#023020',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
    dayInput: {
        height: 40,
        width: 50,
        borderColor: '#023020',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
    yearInput: {
        height: 40,
        width: 70,
        borderColor: '#023020',
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
});