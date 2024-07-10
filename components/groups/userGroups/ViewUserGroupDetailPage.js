import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { BaseContainer } from '../../containers/BaseContainer';
import { BaseTextBox } from '../../text/BaseTextBox';
import { deleteUserGroup, getUserGroupById } from '../../../services/database/databaseUserGroups';

export const ViewUserGroupDetailPage = ({ route, navigation }) => {
    const { userGroupId } = route.params;
    const [userGroup, setUserGroup] = useState(null);

    const handleDeleteUserGroup = async () => {
        try {
            await deleteUserGroup(userGroupId);
            Alert.alert("Success", "User Group deleted successfully");
            navigation.navigate('ViewUserGroups');
        } catch (error) {
            Alert.alert("Error", `failed to delete user group: ${error}`);
        }
    }

    useEffect(() => {
        const fetchUserGroup = async () => {
            try {
                const userGroupDetail = await getUserGroupById(userGroupId);
                setUserGroup(userGroupDetail);
            } catch (error) {
                console.error('Error fetching user group details:', error);
            }
        };

        fetchUserGroup();
    }, [userGroupId]);

    if (!userGroup) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <BaseTextBox>User id: {userGroup.user_id}</BaseTextBox>
            <Text style={styles.detailText}>Group id: {userGroup.group_id}</Text>
            <Button
                title="Edit User Group"
                onPress={() => navigation.navigate('EditUserGroupDetail', { userGroupId: userGroup.id })}
            />
            <Button title="Delete User Group" onPress={handleDeleteUserGroup} />
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