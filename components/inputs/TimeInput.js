import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export const TimeInput = ({
    hour, setHour, hourPlaceholder, minute, setMinute, minutePlaceholder }) => {
    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 100,
    },
    hourInput: {
        height: 40,
        width: 45,
        borderColor: '#023020',
        borderWidth: 1,
        borderRightWidth: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
    minuteInput: {
        height: 40,
        width: 45,
        borderColor: '#023020',
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
    },
});