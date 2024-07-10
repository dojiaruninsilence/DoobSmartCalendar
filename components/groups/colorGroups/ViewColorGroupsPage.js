import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { BaseContainer } from "../../containers/BaseContainer";
import { BaseTextBox } from "../../text/BaseTextBox";
import { getAllColorGroups } from "../../../services/database/databaseColorGroups";

export const ViewColorGroupsPage = ({ navigation }) => {
    const [colorGroups, setColorGroups] = useState([]);

    useEffect(() => {
        const fetchColorGroups = async () => {
            try {
                const colorGroupsList = await getAllColorGroups();
                setColorGroups(colorGroupsList);
            } catch (error) {
                console.error('Error fetching color groups:', error);
            }
        };

        fetchColorGroups();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <BaseTextBox>{item.name}</BaseTextBox>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('ViewColorGroupDetail', { colorGroupId: item.id })}
            />
        </View>
    );

    return (
        <BaseContainer>
            <FlatList
                data={colorGroups}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </BaseContainer>
    )
};

const styles = StyleSheet.create({
    eventItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dateText: {
        color: '#888',
    },
});