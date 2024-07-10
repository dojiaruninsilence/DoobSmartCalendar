import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomePage } from '../pages/HomePage'
import { AddUserPage } from '../users/AddUserPage';
import { ViewUsersPage } from '../users/ViewUsersPage';
import { ViewUserDetailPage } from '../users/ViewUserDetailPage';
import { EditUserDetailPage } from '../users/EditUserDetailPage';
import { AddEventPage } from '../events/AddEventPage';
import { EditEventDetailPage } from '../events/EditEventDetailPage';
import { ViewEventsPage } from '../events/ViewEventPage';
import { ViewEventDetailPage } from '../events/ViewEventDetailPage';
import { AddGroupPage } from '../groups/AddGroupPage';
import { ViewGroupsPage } from '../groups/ViewGroupsPage';
import { ViewGroupDetailPage } from '../groups/ViewGroupDetailPage';
import { CalendarViewPage } from '../calendar/CalendarViewPage';
import { CustomDrawerContent } from './CustomDrawerContent';
import { EditGroupDetailPage } from '../groups/EditGroupDetailPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="AddUser" component={AddUserPage} />
        <Stack.Screen name="ViewUsers" component={ViewUsersPage} />
        <Stack.Screen name="ViewUserDetail" component={ViewUserDetailPage} />
        <Stack.Screen name="EditUserDetail" component={EditUserDetailPage} />
        <Stack.Screen name="AddEvent" component={AddEventPage} />
        <Stack.Screen name="ViewEvents" component={ViewEventsPage} />
        <Stack.Screen name="ViewEventDetail" component={ViewEventDetailPage} />
        <Stack.Screen name="EditEventDetail" component={EditEventDetailPage} />
        <Stack.Screen name="AddGroup" component={AddGroupPage} />
        <Stack.Screen name="ViewGroups" component={ViewGroupsPage} />
        <Stack.Screen name="ViewGroupDetail" component={ViewGroupDetailPage} />
        <Stack.Screen name="EditGroupDetail" component={EditGroupDetailPage} />
        <Stack.Screen name="CalendarView" component={CalendarViewPage} />
    </Stack.Navigator>
);

export const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Homes" component={HomeStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};