import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { BaseButton } from "react-native-gesture-handler";
import { BaseContainer } from "../containers/BaseContainer";
import { BaseTextBox } from "../text/BaseTextBox";
import { getAllGroups } from "../../services/database/databaseGroups";

export const ViewGroupsPage = ({ navigation }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsList = await getAllGroups();
                setGroups(groupsList);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <BaseTextBox>{item.name}</BaseTextBox>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('ViewGroupDetail', { groupId: item.id })}
            />
        </View>
    );

    return (
        <BaseContainer>
            <FlatList
                data={groups}
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