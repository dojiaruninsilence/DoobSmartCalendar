import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

export const ColorPickerInput = ({ onColorSelected }) => {
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    const getColorHex = () => {
        return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
    };

    const handleColorChange = () => {
        const colorHex = getColorHex();
        onColorSelected(colorHex);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.colorBox, { backgroundColor: getColorHex() }]} />
            <View style={styles.sliderContainer}>
                <Text>Red: {red}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={255}
                    value={red}
                    onValueChange={(value) => {
                        setRed(value);
                        handleColorChange();
                    }}
                    minimumTrackTintColor="#FF0000"
                    maximumTrackTintColor="#FF0000"
                />
            </View>
            <View style={styles.sliderContainer}>
                <Text>Green: {green}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={255}
                    value={green}
                    onValueChange={(value) => {
                        setGreen(value);
                        handleColorChange();
                    }}
                    minimumTrackTintColor="#FF0000"
                    maximumTrackTintColor="#FF0000"
                />
            </View>
            <View style={styles.sliderContainer}>
                <Text>Blue: {blue}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={255}
                    value={blue}
                    onValueChange={(value) => {
                        setBlue(value);
                        handleColorChange();
                    }}
                    minimumTrackTintColor="#FF0000"
                    maximumTrackTintColor="#FF0000"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    colorBox: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    sliderContainer: {
        width: '100%',
        marginVertical: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});