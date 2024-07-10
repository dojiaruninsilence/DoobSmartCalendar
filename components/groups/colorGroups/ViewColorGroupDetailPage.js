import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import { BaseContainer } from '../../containers/BaseContainer';
import { BaseTextBox } from '../../text/BaseTextBox';
import { getColorGroupById, deleteColorGroup } from '../../../services/database/databaseColorGroups';

export const ViewColorGroupDetailPage = ({ route, navigation }) => {
    const { colorGroupId } = route.params;
    const [colorGroup, setColorGroup] = useState(null);

    const handleDeleteColorGroup = async () => {
        try {
            await deleteColorGroup(colorGroupId);
            Alert.alert("Success", "Color Group deleted successfully");
            navigation.navigate('ViewColorGroups');
        } catch (error) {
            Alert.alert("Error", `failed to delete color group: ${error}`);
        }
    }

    useEffect(() => {
        const fetchColorGroup = async () => {
            try {
                const colorGroupDetail = await getColorGroupById(colorGroupId);
                setColorGroup(colorGroupDetail);
            } catch (error) {
                console.error('Error fetching color group details:', error);
            }
        };

        fetchColorGroup();
    }, [colorGroupId]);

    if (!colorGroup) {
        return (
            <BaseContainer>
                <Text>Loading...</Text>
            </BaseContainer>
        );
    }

    return (
        <BaseContainer>
            <BaseTextBox>{colorGroup.name}</BaseTextBox>
            <Text style={styles.detailText}>hexidecimal color code: {colorGroup.hex_color}</Text>
            <Text style={styles.detailText}>notes: {colorGroup.notes}</Text>
            <Text style={styles.detailText}>description: {colorGroup.description}</Text>
            <Button
                title="Edit Color Group"
                onPress={() => navigation.navigate('EditColorGroupDetail', { colorGroupId: colorGroup.id })}
            />
            <Button title="Delete Color Group" onPress={handleDeleteColorGroup} />
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