import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import moment from "moment";

import { MenuItem } from "../navigation/MenuItem";
import { BaseTextBox } from "../text/BaseTextBox";
import { BaseContainer } from "../containers/BaseContainer";
import { getCurrentUser } from "../../services/auth";
import { getEventsForDate } from "../../services/database/databaseEvents";
import { sortAndLimitEvents } from "../../utils/calendarUtils/eventLayout";

export const HomePage = ({ navigation }) => {
    // const user = getCurrentUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    //const [events, setEvents] = useState([]); 
    //const [nextEvents, setNextEvents] = useState([]);
    const [sortedEvents, setSortedEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const dateStr = moment(currentDate).format('YYYY-MM-DD');
            const nextDateStr = moment(currentDate).add(1, 'days').format('YYYY-MM-DD');
            const fetchedEvents = await getEventsForDate(dateStr);
            const fetchedNextEvents = await getEventsForDate(nextDateStr);

            const sortEvents = sortAndLimitEvents(fetchedEvents, 3);
            setSortedEvents(sortEvents);
        };

        fetchEvents();
    }, [currentDate]);

    const renderEvent = (event) => {
        //console.log(event.title);

        return (            
            <Text key={event.id} style={styles.eventText}>{event.title}</Text> 
        );
    };

    return (
        <BaseContainer>
            <View style={styles.container}>
                <Text style={styles.header}>Doob Bloom Smarty Time</Text>
                <View style={styles.eventsContainer}>
                    {sortedEvents.map(event => renderEvent(event))}

                </View>
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
                <View style={styles.row}>
                    <MenuItem title="User Login" onPress={() => navigation.navigate('UserLogin')} />
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
    eventsContainer: {
        width: '90%',
        height: 100,
    },
    eventText: {
        fontSize: 16,
        marginVertical: 2,
    },
});