// function to calculate luminance of a color
export const getLuminance = (color) => {
    let r, g, b;
    if (color.startsWith('#')) {
        r = parseInt(color.slice(1, 3), 16) / 255;
        g = parseInt(color.slice(3, 5), 16) / 255;
        b = parseInt(color.slice(5, 7), 16) / 255;
    } else if (color.startsWith('rgb')) {
        const rgbValues = color.match(/\d+/g).map(Number);
        r = rgbValues[0] / 255;
        g = rgbValues[1] / 255;
        b = rgbValues[2] / 255;
    } else {
        return 1; // default to bright luminance for unknown formats
    }

    const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

export const getTextColor = (bgColor) => {
    return getLuminance(bgColor) > 0.5 ? '#000000' : '#FFFFFF';
};