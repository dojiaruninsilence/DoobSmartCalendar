import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { getUserById, deleteUser } from '../../services/database/databaseUsers';
import { BaseButton } from '../buttons/BaseButton';
import { BaseContainer } from '../containers/BaseContainer';
import { BaseTextBox } from '../text/BaseTextBox';

export const ViewUserDetailPage = ({ route, navigation }) => {
    const { userId } = route.params;
    const [user, setUser] = useState(null);

    const handleDeleteUser = async () => {
        try {
            await deleteUser(userId);
            Alert.alert("Success", "User deleted successfully");
            navigation.navigate('ViewUsers');
        } catch (error) {
            Alert.alert("Error", 'failed to delete user: ${error}');
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetail = await getUserById(userId);
                setUser(userDetail);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <BaseTextBox>{user.username}</BaseTextBox>
            <Text style={styles.detailText}>email: {user.email}</Text>
            <Text style={styles.detailText}>password: {user.password_hash}</Text>
            <Text style={styles.detailText}>timezone: {user.timezone}</Text>
            <Text style={styles.detailText}>preferences: {user.preference_flags}</Text>
            <Button
                title="Edit User"
                onPress={() => navigation.navigate('EditUserDetail', { userId: user.id })}
            />
            <Button title="Delete User" onPress={handleDeleteUser} />
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    detailText: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});