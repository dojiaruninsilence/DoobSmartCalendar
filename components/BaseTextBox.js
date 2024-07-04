import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BaseTextBox = ({ children }) => {
    return (
        <View style={styles.box}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 10,
        borderColor: '#023020',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
        marginVertical: 10,
    },
    text: {
        color: '#333333',
    },
});