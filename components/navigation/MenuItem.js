import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from 'react-native';

export const MenuItem = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <Text style={styles.menuItemText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuItemText: {
        fontSize: 18,
        textAlign: 'center',
    },
});