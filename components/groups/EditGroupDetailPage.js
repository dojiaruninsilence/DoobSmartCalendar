import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { BaseContainer } from "../containers/BaseContainer";
import { getGroupById, updateGroup } from "../../services/database/databaseGroups";

export const EditGroupDetailPage = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [group, setGroup] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        timezone: '',
        preference_flag: ''
    });

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const groupDetail = await getGroupById(groupId);
                setGroup(groupDetail);
                // set initial form data from fetched event
                setFormData({
                    name: groupDetail.name,
                    timezone: groupDetail.timezone,
                    preference_flag: groupDetail.preference_flag
                });
            } catch (error) {
                console.error('Error fetching group details:', error);
            }
        };

        fetchGroup();
    }, [groupId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateGroup(groupId, formData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating group:', error);
        }
    };

    if (!group) {
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
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Name"
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