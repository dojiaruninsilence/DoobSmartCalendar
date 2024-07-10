import React from "react";
import { View, StyleSheet } from 'react-native';
import { MenuItem } from "../navigation/MenuItem";

export const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <MenuItem title="Add User" onPress={() => navigation.navigate('AddUser')} />
            <MenuItem title="View Users" onPress={() => navigation.navigate('ViewUsers')} />
            <MenuItem title="Add Event" onPress={() => navigation.navigate('AddEvent')} />
            <MenuItem title="View Events" onPress={() => navigation.navigate('ViewEvents')} />
            <MenuItem title="Add Group" onPress={() => navigation.navigate('AddGroup')} />
            <MenuItem title="View Groups" onPress={() => navigation.navigate('ViewGroups')} />
            <MenuItem title="Add Color Group" onPress={() => navigation.navigate('AddColorGroup')} />
            <MenuItem title="View Color Groups" onPress={() => navigation.navigate('ViewColorGroups')} />
            <MenuItem title="Add User Group" onPress={() => navigation.navigate('AddUserGroup')} />
            <MenuItem title="View User Groups" onPress={() => navigation.navigate('ViewUserGroups')} />
            <MenuItem title="Calendar View" onPress={() => navigation.navigate('CalendarView')} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});