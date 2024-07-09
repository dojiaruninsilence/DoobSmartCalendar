import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { getUserById, updateUser } from "../../services/database/databaseUsers";
import { BaseContainer } from "../containers/BaseContainer";

export const EditUserDetailPage = ({ route, navigation }) => {
    const { userId } = route.params;
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password_hash: '',
        timezone: '',
        preference_flag: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetail = await getUserById(userId);
                setUser(userDetail);
                // set initial form data from fetched event
                setFormData({
                    username: userDetail.username,
                    email: userDetail.email,
                    password_hash: userDetail.password_hash,
                    timezone: userDetail.timezone,
                    preference_flag: userDetail.preference_flag
                });
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateUser(userId, formData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (!user) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="email"
            />
            <TextInput
                style={styles.input}
                value={formData.password_hash}
                onChangeText={(value) => handleInputChange('password_Hash', value)}
                placeholder="password"
            />
            <TextInput
                style={styles.input}
                value={formData.timezone}
                onChangeText={(value) => handleInputChange('timezone', value)}
                placeholder="Timezone"
            />
            <TextInput
                style={styles.input}
                value={formData.preference_flag}
                onChangeText={(value) => handleInputChange('preference_flag', value)}
                placeholder="Preferences"
            />
            <Button title="Save" onPress={handleSubmit} />
        </BaseContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
});