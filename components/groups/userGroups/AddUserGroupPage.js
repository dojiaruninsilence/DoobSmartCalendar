import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Switch, StyleSheet } from 'react-native';

import { BaseButton } from '../../buttons/BaseButton';
import { BaseContainer } from '../../containers/BaseContainer';
import { BaseTextBox } from '../../text/BaseTextBox';
import { BaseTextInputBox } from '../../inputs/BaseTextInputBox';
import { addUserGroup } from '../../../services/database/databaseUserGroups';

export const AddUserGroupPage = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [groupId, setGroupId] = useState('');

    const handleAddUserGroup = async () => {
        try {
            await addUserGroup({
                user_id: userId,
                group_id: groupId
            });
            Alert.alert("Success", "User group added succesfully");
        } catch (error) {
            Alert.alert("Error", `Failed to add user group: ${error}`);
        }
    };

    return (
        <BaseContainer>
            <BaseTextBox>Add New User Group</BaseTextBox>

            <BaseTextInputBox
                value={userId}
                onChangeText={setUserId}
                placeholder="User Id"
            />
            <BaseTextInputBox
                value={groupId}
                onChangeText={setGroupId}
                placeholder="Group Id"
            />
            <BaseButton title="Add User Group" onPress={handleAddUserGroup} />
            <BaseButton title="View User Groups" onPress={() => {
                console.log('Button Pressed');
                navigation.navigate('ViewUserGroups');
            }} />
        </BaseContainer>
    );
};