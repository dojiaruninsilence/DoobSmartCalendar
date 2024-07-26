import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const BaseDropDownInput = ({ label, selectedValue, onValueChange, options }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={onValueChange}
            >
                {options.map((option) => (
                    <Picker.Item
                        key={option.value}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#023020',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ECFFDC',
    },
});