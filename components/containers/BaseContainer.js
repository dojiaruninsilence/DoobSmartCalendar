import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getUserByName } from '../../services/database/databaseUsers';

export const BaseContainer = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#556B2F');

    useEffect(() => {
        const fetchUserBackgroundColor = async () => {
            try {
                const users = await getUserByName('main');
                if (users && users[0].background_color) {
                    setBackgroundColor(users[0].background_color);
                    console.log(users);
                }
            } catch (error) {
                console.error('Failed to fetch user background color:', error);
            }
        };

        fetchUserBackgroundColor();
        console.log('bg fetched');
    }, []);
    return (
        <View style={[styles.container, { backgroundColor }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#556B2F',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});