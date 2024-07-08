import React from "react";
import { View, StyleSheet } from 'react-native';
import { MenuItem } from "../navigation/MenuItem";

export const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <MenuItem title="Add Event" onPress={() => navigation.navigate('AddEvent')} />
            <MenuItem title="View Events" onPress={() => navigation.navigate('ViewEvents')} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});