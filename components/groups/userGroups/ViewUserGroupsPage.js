import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

import { BaseContainer } from "../../containers/BaseContainer";
import { BaseTextBox } from "../../text/BaseTextBox";
import { getAllUserGroups } from "../../../services/database/databaseUserGroups";

export const ViewUsersGroupsPage = ({ navigation }) => {
    const [userGroups, setUserGroups] = useState([]);

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const userGroupsList = await getAllUserGroups();
                setUserGroups(userGroupsList);
            } catch (error) {
                console.error('Error fetching user groups:', error);
            }
        };

        fetchUserGroups();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.eventItem}>
            <BaseTextBox>{item.user_id}</BaseTextBox>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('ViewUserGroupDetail', { userGroupId: item.id })}
            />
        </View>
    );

    return (
        <BaseContainer>
            <FlatList
                data={userGroups}
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