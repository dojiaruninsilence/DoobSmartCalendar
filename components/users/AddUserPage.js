import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Switch, StyleSheet } from 'react-native';

import { BaseButton } from '../buttons/BaseButton';
import { BaseContainer } from '../containers/BaseContainer';
import { BaseTextBox } from '../text/BaseTextBox';
import { BaseTextInputBox } from '../inputs/BaseTextInputBox';
import { addUser } from '../../services/database/databaseUsers';

export const AddUserPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [timezone, setTimezone] = useState('');
    const [preferenceFlags, setPreferenceFlags] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [primaryColor, setPrimaryColor] = useState('');
    const [secondaryColor, setSecondaryColor] = useState('');
    const [tertiaryColor, setTertiaryColor] = useState('');
    const [font, setFont] = useState('');
    const [fontSize, setFontSize] = useState('');

    const handleAddUser = async () => {
        try {
            await addUser({
                username,
                email,
                password_hash: passwordHash,
                timezone,
                preference_flags: preferenceFlags,
                background_color: backgroundColor,
                primary_color: primaryColor,
                secondary_color: secondaryColor,
                tertiary_color: tertiaryColor,
                font,
                font_size: fontSize
            });
            Alert.alert("Success", "User added succesfully");
        } catch (error) {
            Alert.alert("Error", `Failed to add event: ${error}`);
        }
    };

    return (
        <BaseContainer>
            <ScrollView>
                <BaseTextBox>Add New User</BaseTextBox>

                <BaseTextInputBox
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                />
                <BaseTextInputBox
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                />
                <BaseTextInputBox
                    value={passwordHash}
                    onChangeText={setPasswordHash}
                    placeholder="Password"
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
                <BaseTextInputBox
                    value={backgroundColor}
                    onChangeText={setBackgroundColor}
                    placeholder="Background color"
                />
                <BaseTextInputBox
                    value={primaryColor}
                    onChangeText={setPrimaryColor}
                    placeholder="Primary color"
                />
                <BaseTextInputBox
                    value={secondaryColor}
                    onChangeText={setSecondaryColor}
                    placeholder="Secondary color"
                />
                <BaseTextInputBox
                    value={tertiaryColor}
                    onChangeText={setTertiaryColor}
                    placeholder="Tertiary color"
                />
                <BaseTextInputBox
                    value={font}
                    onChangeText={setFont}
                    placeholder="Font"
                />
                <BaseTextInputBox
                    value={fontSize}
                    onChangeText={setFontSize}
                    placeholder="Font Size"
                />
                <BaseButton title="Add User" onPress={handleAddUser} />
                <BaseButton title="View Users" onPress={() => {
                    console.log('Button Pressed');
                    navigation.navigate('ViewUsers');
                }} />
            </ScrollView>
        </BaseContainer>
    );
};