import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { BaseContainer } from "../../containers/BaseContainer";
import { getUserGroupById, updateUserGroup } from "../../../services/database/databaseUserGroups";

export const EditUserGroupDetailPage = ({ route, navigation }) => {
    const { userGroupId } = route.params;
    const [userGroup, setUserGroup] = useState(null);
    const [formData, setFormData] = useState({
        user_id: '',
        group_id: '',
    });

    useEffect(() => {
        const fetchUserGroup = async () => {
            try {
                const userGroupDetail = await getUserGroupById(userGroupId);
                setUserGroup(userGroupDetail);
                // set initial form data from fetched event
                setFormData({
                    user_id: userGroupDetail.user_id,
                    group_id: userGroupDetail.group_id
                });
            } catch (error) {
                console.error('Error fetching user group details:', error);
            }
        };

        fetchUserGroup();
    }, [userGroupId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateUserGroup(userGroupId, formData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating user group:', error);
        }
    };

    if (!userGroup) {
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
                value={formData.user_id}
                onChangeText={(value) => handleInputChange('user_id', value)}
                placeholder="User id"
            />
            <TextInput
                style={styles.input}
                value={formData.group_id}
                onChangeText={(value) => handleInputChange('group_id', value)}
                placeholder="Group id"
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