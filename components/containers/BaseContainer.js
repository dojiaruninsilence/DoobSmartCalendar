import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { getUserByName } from '../../services/database/databaseUsers';
import { getCurrentUser } from '../../services/auth';

export const BaseContainer = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#556B2F');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = getCurrentUser();
            setUser(currentUser || [{ username: 'defaultUser' }]);
        };

        fetchUser();
    }, [children]);

    useEffect(() => {
        const fetchUserBackgroundColor = async () => {
            try {
                if (user && user[0] && user[0].username !== 'defaultUser') {
                    const users = await getUserByName(user[0].username);
                    if (users && users[0].background_color) {
                        setBackgroundColor(users[0].background_color);
                        //console.log(user[0].username);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch user background color:', error);
            }
        };

        fetchUserBackgroundColor();
        //console.log('bg fetched');
    }, [user]);
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