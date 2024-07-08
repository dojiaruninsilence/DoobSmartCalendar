import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomePage } from '../pages/HomePage'
import { AddEventPage } from '../events/AddEventPage';
import { EditEventDetailPage } from '../events/EditEventDetailPage';
import { ViewEventsPage } from '../events/ViewEventPage';
import { ViewEventDetailPage } from '../events/ViewEventDetailPage';
import { CustomDrawerContent } from './CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="AddEvent" component={AddEventPage} />
        <Stack.Screen name="ViewEvents" component={ViewEventsPage} />
        <Stack.Screen name="ViewEventDetail" component={ViewEventDetailPage} />
        <Stack.Screen name="EditEventDetail" component={EditEventDetailPage} />
    </Stack.Navigator>
);

export const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};