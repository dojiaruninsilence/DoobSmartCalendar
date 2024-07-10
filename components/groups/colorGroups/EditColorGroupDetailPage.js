import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { BaseContainer } from "../../containers/BaseContainer";
import { getColorGroupById, updateColorGroup } from "../../../services/database/databaseColorGroups";

export const EditColorGroupDetailPage = ({ route, navigation }) => {
    const { colorGroupId } = route.params;
    const [colorGroup, setColorGroup] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        hex_color: '',
        notes: '',
        description: '',
    });

    useEffect(() => {
        const fetchColorGroup = async () => {
            try {
                const colorGroupDetail = await getColorGroupById(colorGroupId);
                setColorGroup(colorGroupDetail);
                // set initial form data from fetched event
                setFormData({
                    name: colorGroupDetail.name,
                    hex_color: colorGroupDetail.hex_color,
                    notes: colorGroupDetail.notes,
                    description: colorGroupDetail.description
                });
            } catch (error) {
                console.error('Error fetching color group details:', error);
            }
        };

        fetchColorGroup();
    }, [colorGroupId]);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateColorGroup(colorGroupId, formData);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating color group:', error);
        }
    };

    if (!colorGroup) {
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
                value={formData.hex_color}
                onChangeText={(value) => handleInputChange('hex_color', value)}
                placeholder="hexidecimal color code"
            />
            <TextInput
                style={styles.input}
                value={formData.notes}
                onChangeText={(value) => handleInputChange('notes', value)}
                placeholder="notes"
            />
            <TextInput
                style={styles.input}
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
                placeholder="description"
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