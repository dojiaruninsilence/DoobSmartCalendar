import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { BaseButton } from '../buttons/BaseButton';
import { BaseContainer } from '../containers/BaseContainer';
import { BaseTextBox } from '../text/BaseTextBox';
import { deleteGroup, getGroupById } from '../../services/database/databaseGroups';

export const ViewGroupDetailPage = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [group, setGroup] = useState(null);

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(groupId);
            Alert.alert("Success", "Group deleted successfully");
            navigation.navigate('ViewGroups');
        } catch (error) {
            Alert.alert("Error", `failed to delete group: ${error}`);
        }
    }

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const groupDetail = await getGroupById(groupId);
                console.log('tried fetching group:', groupId);  
                setGroup(groupDetail);
            } catch (error) {
                console.error('Error fetching group details:', error);
            }
        };

        fetchGroup();
    }, [groupId]);

    if (!group) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <BaseTextBox>{group.name}</BaseTextBox>
            <Text style={styles.detailText}>timezone: {group.timezone}</Text>
            <Text style={styles.detailText}>preferences: {group.preference_flags}</Text>
            <Button
                title="Edit Group"
                onPress={() => navigation.navigate('EditGroupDetail', { groupId: group.id })}
            />
            <Button title="Delete Group" onPress={handleDeleteGroup} />
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