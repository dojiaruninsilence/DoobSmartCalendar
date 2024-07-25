import moment from 'moment';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';
import { Asset, useAssets} from 'expo-asset';

// request permissions
export async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('You need to enable notifications in settings');
    }
}

export async function scheduleNotification(event, soundUri) {

    const eventDate = moment({
        year: event.start_date_year,
        month: event.start_date_month - 1,
        day: event.start_date_day,
        hour: event.start_time_hour, // adjust for timezone here
        minute: event.start_time_minute,
    }).toDate();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: event.title,
            body: `Event starting at ${event.start_time_hour}:${event.start_time_minute}`,
            sound: true,

            // TODO: need to add custom notification sounds, was stymied before
            // sounds: '../../assets/sounds/battle_ram_001.mp3',
        },
        trigger: {
            date: eventDate,
        },
    });
}