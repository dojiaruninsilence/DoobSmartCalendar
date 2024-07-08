import React from "react";
import { View, StyleSheet } from 'react-native';
import { MenuItem } from "../navigation/MenuItem";

export const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <MenuItem title="Add Event" onPress={() => navigation.navigate('AddEvent')} />
            <MenuItem title="View Events" onPress={() => navigation.navigate('ViewEvents')} />
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