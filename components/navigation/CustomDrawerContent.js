import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

export const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView{...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.drawerHeaderText}>Doob Smart Calendar</Text>
            </View>
            <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
                label="Add User"
                onPress={() => props.navigation.navigate('AddUser')}
            />
            <DrawerItem
                label="View Users"
                onPress={() => props.navigation.navigate('ViewUsers')}
            />
            <DrawerItem
                label="Add Event"
                onPress={() => props.navigation.navigate('AddEvent')}
            />
            <DrawerItem
                label="View Events"
                onPress={() => props.navigation.navigate('ViewEvents')}
            />
            <DrawerItem
                label="Add Group"
                onPress={() => props.navigation.navigate('AddGroup')}
            />
            <DrawerItem
                label="View Groups"
                onPress={() => props.navigation.navigate('ViewGroups')}
            />
            <DrawerItem
                label="Calendar View"
                onPress={() => props.navigation.navigate('CalendarView')}
            />
            {/* Add more drawer items as needed */}
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
});