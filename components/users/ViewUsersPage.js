import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { getAllUsers } from "../../services/database/databaseUsers";
import { BaseButton } from "react-native-gesture-handler";
import { BaseContainer } from "../containers/BaseContainer";
import { BaseTextBox } from "../text/BaseTextBox";

export const ViewUsersPage = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getAllUsers();
                setUsers(usersList);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <BaseTextBox>{item.username}</BaseTextBox>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('ViewUserDetail', { userId: item.id })}
            />
        </View>
    );

    return (
        <BaseContainer>
            <FlatList
                data={users}
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