import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from "../navigation/MenuItem";
import { BaseTextBox } from "../text/BaseTextBox";
import { BaseContainer } from "../containers/BaseContainer";

export const HomePage = ({ navigation }) => {
    return (
        <BaseContainer>
            <View style={styles.container}>
                <Text style={styles.header}>Doob Bloom Smarty Time</Text>
                <View style={styles.row}>
                    <MenuItem title="Add User" onPress={() => navigation.navigate('AddUser')} />
                    <Text> | </Text>
                    <MenuItem title="View Users" onPress={() => navigation.navigate('ViewUsers')} />
                </View>
                <View style={styles.row}>
                    <MenuItem title="Add Event" onPress={() => navigation.navigate('AddEvent')} />
                    <Text> | </Text>
                    <MenuItem title="View Events" onPress={() => navigation.navigate('ViewEvents')} />
                </View>            
                <View style={styles.row}>
                    <MenuItem title="Add Random Reminder" onPress={() => navigation.navigate('AddRandomReminder')} />
                    <Text> | </Text>
                    <MenuItem title="View Random Reminders" onPress={() => navigation.navigate('ViewRandomReminders')} />
                </View>            
                <View style={styles.row}>
                    <MenuItem title="Add Group" onPress={() => navigation.navigate('AddGroup')} />
                    <Text> | </Text>
                    <MenuItem title="View Groups" onPress={() => navigation.navigate('ViewGroups')} />
                </View>            
                <View style={styles.row}>
                    <MenuItem title="Add Color Group" onPress={() => navigation.navigate('AddColorGroup')} />
                    <Text> | </Text>
                    <MenuItem title="View Color Groups" onPress={() => navigation.navigate('ViewColorGroups')} />
                </View>            
                <View style={styles.row}>
                    <MenuItem title="Add User Group" onPress={() => navigation.navigate('AddUserGroup')} />
                    <Text> | </Text>
                    <MenuItem title="View User Groups" onPress={() => navigation.navigate('ViewUserGroups')} />
                </View>            
                <View style={styles.row}>
                    <MenuItem title="Calendar View" onPress={() => navigation.navigate('CalendarView')} />
                </View>                
            </View>
        </BaseContainer>
    )
};

const styles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        marginLeft: '25%',
    },
});