import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const DurationInput = ({
    label, day, setDay, dayPlaceholder, hour, setHour, hourPlaceholder,
    minute, setMinute, minutePlaceholder }) => {
    return (
        <View style={styles.container}>
            <Text>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.dayInput}
                    value={day}
                    onChangeText={setDay}
                    placeholder={dayPlaceholder}
                    placeholderTextColor="#8A8A8A"
                />
                <TextInput
                    style={styles.hourInput}
                    value={hour}
                    onChangeText={setHour}
                    placeholder={hourPlaceholder}
                    placeholderTextColor="#8A8A8A"
                />
                <TextInput
                    style={styles.minuteInput}
                    value={minute}
                    onChangeText={setMinute}
                    placeholder={minutePlaceholder}
                    placeholderTextColor="#8A8A8A"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '75%',
    },
    inputContainer: {
        flexDirection: 'row',
        width: 170,
    },
    dayInput: {
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
    hourInput: {
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
    minuteInput: {
        height: 40,
        width: 50,
        borderColor: '#023020',
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
});