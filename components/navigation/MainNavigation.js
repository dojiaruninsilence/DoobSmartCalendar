import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomePage } from '../pages/HomePage'
import { AddUserPage } from '../users/AddUserPage';
import { ViewUsersPage } from '../users/ViewUsersPage';
import { ViewUserDetailPage } from '../users/ViewUserDetailPage';
import { EditUserDetailPage } from '../users/EditUserDetailPage';
import { UserLoginPage } from '../users/UserLoginPage';
import { AddEventPage } from '../events/AddEventPage';
import { EditEventDetailPage } from '../events/EditEventDetailPage';
import { ViewEventsPage } from '../events/ViewEventPage';
import { ViewEventDetailPage } from '../events/ViewEventDetailPage';
import { AddRandomReminderPage } from '../events/randomReminder/AddRandomReminderPage';
import { ViewRandomRemindersPage } from '../events/randomReminder/ViewRandomRemindersPage';
import { ViewRandomReminderDetailPage } from '../events/randomReminder/ViewRandomReminderDetailPage';
import { EditRandomReminderDetailPage } from '../events/randomReminder/EditRandomReminderDetailPage';
import { AddGroupPage } from '../groups/AddGroupPage';
import { ViewGroupsPage } from '../groups/ViewGroupsPage';
import { ViewGroupDetailPage } from '../groups/ViewGroupDetailPage';
import { EditGroupDetailPage } from '../groups/EditGroupDetailPage';
import { AddColorGroupPage } from '../groups/colorGroups/AddColorGroupPage';
import { ViewColorGroupsPage } from '../groups/colorGroups/ViewColorGroupsPage';
import { ViewColorGroupDetailPage } from '../groups/colorGroups/ViewColorGroupDetailPage';
import { EditColorGroupDetailPage } from '../groups/colorGroups/EditColorGroupDetailPage';
import { AddUserGroupPage } from '../groups/userGroups/AddUserGroupPage';
import { ViewUsersGroupsPage } from '../groups/userGroups/ViewUserGroupsPage';
import { ViewUserGroupDetailPage } from '../groups/userGroups/ViewUserGroupDetailPage';
import { EditUserGroupDetailPage } from '../groups/userGroups/EditUserGroupDetailPage';
import { CalendarViewPage } from '../calendar/CalendarViewPage';
import { CustomDrawerContent } from './CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const HomeStack = () => (
//     <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomePage} />
//         <Stack.Screen name="AddUser" component={AddUserPage} />
//         <Stack.Screen name="ViewUsers" component={ViewUsersPage} />
//         <Stack.Screen name="ViewUserDetail" component={ViewUserDetailPage} />
//         <Stack.Screen name="EditUserDetail" component={EditUserDetailPage} />
//         <Stack.Screen name="AddEvent" component={AddEventPage} />
//         <Stack.Screen name="ViewEvents" component={ViewEventsPage} />
//         <Stack.Screen name="ViewEventDetail" component={ViewEventDetailPage} />
//         <Stack.Screen name="EditEventDetail" component={EditEventDetailPage} />
//         <Stack.Screen name="AddRandomReminder" component={AddRandomReminderPage} />
//         <Stack.Screen name="ViewRandomReminders" component={ViewRandomRemindersPage} />
//         <Stack.Screen name="ViewRandomReminderDetail" component={ViewRandomReminderDetailPage} />
//         <Stack.Screen name="EditRandomReminderDetail" component={EditRandomReminderDetailPage} />
//         <Stack.Screen name="AddGroup" component={AddGroupPage} />
//         <Stack.Screen name="ViewGroups" component={ViewGroupsPage} />
//         <Stack.Screen name="ViewGroupDetail" component={ViewGroupDetailPage} />
//         <Stack.Screen name="EditGroupDetail" component={EditGroupDetailPage} />
//         <Stack.Screen name="AddColorGroup" component={AddColorGroupPage} />
//         <Stack.Screen name="ViewColorGroups" component={ViewColorGroupsPage} />
//         <Stack.Screen name="ViewColorGroupDetail" component={ViewColorGroupDetailPage} />
//         <Stack.Screen name="EditColorGroupDetail" component={EditColorGroupDetailPage} />
//         <Stack.Screen name="AddUserGroup" component={AddUserGroupPage} />
//         <Stack.Screen name="ViewUserGroups" component={ViewUsersGroupsPage} />
//         <Stack.Screen name="ViewUserGroupDetail" component={ViewUserGroupDetailPage} />
//         <Stack.Screen name="EditUserGroupDetail" component={EditUserGroupDetailPage} />
//         <Stack.Screen name="CalendarView" component={CalendarViewPage} />
//     </Stack.Navigator>
// );

export const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                {/* <Drawer.Screen name="Homes" component={HomeStack} /> */}
                <Drawer.Screen name="Home" component={HomePage} />
                <Drawer.Screen name="AddUser" component={AddUserPage} />
                <Drawer.Screen name="ViewUsers" component={ViewUsersPage} />
                <Drawer.Screen name="ViewUserDetail" component={ViewUserDetailPage} />
                <Drawer.Screen name="EditUserDetail" component={EditUserDetailPage} />
                <Drawer.Screen name="UserLogin" component={UserLoginPage} />
                <Drawer.Screen name="AddEvent" component={AddEventPage} />
                <Drawer.Screen name="ViewEvents" component={ViewEventsPage} />
                <Drawer.Screen name="ViewEventDetail" component={ViewEventDetailPage} />
                <Drawer.Screen name="EditEventDetail" component={EditEventDetailPage} />
                <Drawer.Screen name="AddRandomReminder" component={AddRandomReminderPage} />
                <Drawer.Screen name="ViewRandomReminders" component={ViewRandomRemindersPage} />
                <Drawer.Screen name="ViewRandomReminderDetail" component={ViewRandomReminderDetailPage} />
                <Drawer.Screen name="EditRandomReminderDetail" component={EditRandomReminderDetailPage} />
                <Drawer.Screen name="AddGroup" component={AddGroupPage} />
                <Drawer.Screen name="ViewGroups" component={ViewGroupsPage} />
                <Drawer.Screen name="ViewGroupDetail" component={ViewGroupDetailPage} />
                <Drawer.Screen name="EditGroupDetail" component={EditGroupDetailPage} />
                <Drawer.Screen name="AddColorGroup" component={AddColorGroupPage} />
                <Drawer.Screen name="ViewColorGroups" component={ViewColorGroupsPage} />
                <Drawer.Screen name="ViewColorGroupDetail" component={ViewColorGroupDetailPage} />
                <Drawer.Screen name="EditColorGroupDetail" component={EditColorGroupDetailPage} />
                <Drawer.Screen name="AddUserGroup" component={AddUserGroupPage} />
                <Drawer.Screen name="ViewUserGroups" component={ViewUsersGroupsPage} />
                <Drawer.Screen name="ViewUserGroupDetail" component={ViewUserGroupDetailPage} />
                <Drawer.Screen name="EditUserGroupDetail" component={EditUserGroupDetailPage} />
                <Drawer.Screen name="CalendarView" component={CalendarViewPage} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};