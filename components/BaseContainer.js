import React from 'react';
import { View, StyleSheet } from 'react-native';

export const BaseContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#556B2F',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});