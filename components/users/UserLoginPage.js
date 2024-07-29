import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getUserByName } from "../../services/database/databaseUsers";
import { authenticateUser } from "../../services/auth";

export const UserLoginPage = ({ route }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const redirectTo = route.params?.redirectTo || 'Home'; // default to home page if no redirect path is provided

    const handleLogin = async () => {
        try {
            const user = await getUserByName(username);
            console.log(user);
            console.log(password);
            console.log(username);
            if (user && user[0].password_hash === password) { // eventually need to use hashed passwords
                await authenticateUser(user); // save user session
                navigation.navigate(redirectTo);
            } else {
                Alert.alert('Login failed', 'Invalid username or password');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View>
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};
