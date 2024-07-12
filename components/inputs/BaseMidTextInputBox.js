import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const BaseMidTextInputBox = ({ value, onChangeText, placeholder }) => {
    return (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#8A8A8A"
            multiline={true}
            textAlignVertical="top"
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 80,
        borderColor: '#023020',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#ECFFDC',
        marginVertical: 10,
        textAlign: 'left',
    },
});