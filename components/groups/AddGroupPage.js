import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Switch, StyleSheet } from 'react-native';

import { BaseButton } from '../buttons/BaseButton';
import { BaseContainer } from '../containers/BaseContainer';
import { BaseTextBox } from '../text/BaseTextBox';
import { BaseTextInputBox } from '../inputs/BaseTextInputBox';
import { addGroup } from '../../services/database/databaseGroups';

export const AddGroupPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [timezone, setTimezone] = useState('');
    const [preferenceFlags, setPreferenceFlags] = useState('');

    const handleAddGroup = async () => {
        try {
            await addGroup({
                name,
                timezone,
                preference_flags: preferenceFlags
            });
            Alert.alert("Success", "Group added succesfully");
        } catch (error) {
            Alert.alert("Error", `Failed to add group: ${error}`);
        }
    };

    return (
        <BaseContainer>
            <BaseTextBox>Add New Group</BaseTextBox>

            <BaseTextInputBox
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
            <BaseTextInputBox
                value={timezone}
                onChangeText={setTimezone}
                placeholder="Timezone"
            />
            <BaseTextInputBox
                value={preferenceFlags}
                onChangeText={setPreferenceFlags}
                placeholder="Preferences"
            />
            <BaseButton title="Add Group" onPress={handleAddGroup} />
            <BaseButton title="View Groups" onPress={() => {
                console.log('Button Pressed');
                navigation.navigate('ViewGroups');
            }} />
        </BaseContainer>
    )
}