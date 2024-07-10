import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Switch, StyleSheet } from 'react-native';

import { BaseButton } from '../../buttons/BaseButton';
import { BaseContainer } from '../../containers/BaseContainer';
import { BaseTextBox } from '../../text/BaseTextBox';
import { BaseTextInputBox } from '../../inputs/BaseTextInputBox';
import { addColorGroup } from '../../../services/database/databaseColorGroups';

export const AddColorGroupPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [hexColor, setHexColor] = useState('');
    const [notes, setNotes] = useState('');
    const [description, setDescription] = useState('');

    const handleAddColorGroup = async () => {
        try {
            await addColorGroup({
                name,
                hex_color: hexColor,
                notes,
                description
            });
            Alert.alert("Success", "Color group added succesfully");
        } catch (error) {
            Alert.alert("Error", `Failed to add color group: ${error}`);
        }
    };

    return (
        <BaseContainer>
            <BaseTextBox>Add New User Group</BaseTextBox>

            <BaseTextInputBox
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
            <BaseTextInputBox
                value={hexColor}
                onChangeText={setHexColor}
                placeholder="Hexidecimal Color"
            />
            <BaseTextInputBox
                value={notes}
                onChangeText={setNotes}
                placeholder="notes"
            />
            <BaseTextInputBox
                value={description}
                onChangeText={setDescription}
                placeholder="description"
            />
            <BaseButton title="Add Color Group" onPress={handleAddColorGroup} />
            <BaseButton title="View Color Groups" onPress={() => {
                console.log('Button Pressed');
                navigation.navigate('ViewColorGroups');
            }} />
        </BaseContainer>
    );
};