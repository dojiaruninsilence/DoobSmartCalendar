import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';

export const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView{...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerHeaderText}>Doob Smart Calendar</Text>
            </View>
            
            <View style={styles.menuContainer}>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('Home')}
                    >
                        <Text style={styles.itemText}>Home</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('AddUser')}
                    >
                        <Text style={styles.itemText}>Add User</Text>
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text>|</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('ViewUsers')}
                    >
                        <Text style={styles.itemText}>View Users</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('AddEvent')}
                    >
                        <Text style={styles.itemText}>Add Event</Text>
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text>|</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('ViewEvents')}
                    >
                        <Text style={styles.itemText}>View Events</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('AddRandomReminder')}
                    >
                        <Text style={styles.itemText}>Add Reminder</Text>
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text>|</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('ViewRandomReminders')}
                    >
                        <Text style={styles.itemText}>View Reminders</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('AddGroup')}
                    >
                        <Text style={styles.itemText}>Add Group</Text>
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text>|</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('ViewGroups')}
                    >
                        <Text style={styles.itemText}>View Groups</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('AddColorGroup')}
                    >
                        <Text style={styles.itemText}>Add Color Group</Text>
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text>|</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('ViewColorGroups')}
                    >
                        <Text style={styles.itemText}>View Color Groups</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('AddUserGroup')}
                    >
                        <Text style={styles.itemText}>Add User Group</Text>
                    </TouchableOpacity>
                    <View style={styles.itemContainer}>
                        <Text>|</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('ViewUserGroups')}
                    >
                        <Text style={styles.itemText}>View User Groups</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('CalendarView')}
                    >
                        <Text style={styles.itemText}>Calendar View</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => props.navigation.navigate('UserLogin')}
                    >
                        <Text style={styles.itemText}>User Login</Text>
                    </TouchableOpacity>
                </View>
                {/* Add more drawer items as needed */}
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerHeader: {
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    drawerHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuContainer: {
        padding: 10,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        width: '60%',
    },
    itemContainer: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        color: '#999999',
        fontSize: 16,
        textAlign: 'center'
    },
});