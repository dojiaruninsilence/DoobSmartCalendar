import React from "react";
import { View, StyleSheet } from "react-native";

import { BaseDropDownInput } from "./BaseDropDownInput";

const timezoneOptions = [
    { label: "UTC-12:00 (Baker Island Time)", value: -12 },
    { label: "UTC-11:00 (Samoa Standard Time)", value: -11 },
    { label: "UTC-10:00 (Hawaii-Aleutian Standard Time)", value: -10 },
    { label: "UTC-09:00 (Alaska Standard Time)", value: -9 },
    { label: "UTC-08:00 (Pacific Standard Time)", value: -8 },
    { label: "UTC-07:00 (Mountain Standard Time)", value: -7 },
    { label: "UTC-06:00 (Central Standard Time)", value: -6 },
    { label: "UTC-05:00 (Eastern Standard Time)", value: -5 },
    { label: "UTC-04:00 (Atlantic Standard Time)", value: -4 },
    { label: "UTC-03:00 (Argentina Time)", value: -3 },
    { label: "UTC-02:00 (South Georgia Time)", value: -2 },
    { label: "UTC-01:00 (Azores Standard Time)", value: -1 },
    { label: "UTC+00:00 (Greenwich Mean Time)", value: 0 },
    { label: "UTC+01:00 (Central European Time)", value: 1 },
    { label: "UTC+02:00 (Eastern European Time)", value: 2 },
    { label: "UTC+03:00 (Moscow Standard Time)", value: 3 },
    { label: "UTC+04:00 (Gulf Standard Time)", value: 4 },
    { label: "UTC+05:00 (Pakistan Standard Time)", value: 5 },
    { label: "UTC+06:00 (Bangladesh Standard Time)", value: 6 },
    { label: "UTC+07:00 (Indochina Time)", value: 7 },
    { label: "UTC+08:00 (China Standard Time)", value: 8 },
    { label: "UTC+09:00 (Japan Standard Time)", value: 9 },
    { label: "UTC+10:00 (Australian Eastern Standard Time)", value: 10 },
    { label: "UTC+11:00 (Solomon Islands Time)", value: 11 },
    { label: "UTC+12:00 (New Zealand Standard Time)", value: 12 },
];

export const TimezoneDropDownInput = ({ selectedTimezone, onTimezoneChange }) => {
    return (
        <View style={styles.container}>
            <BaseDropDownInput
                label="Select Timezone"
                selectedValue={selectedTimezone}
                onValueChange={onTimezoneChange}
                options={timezoneOptions}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
});