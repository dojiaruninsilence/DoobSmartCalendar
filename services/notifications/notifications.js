import * as Notifications from 'expo-notifications';
import moment from 'moment';
//import * as Permissions from 'expo-permissions';

// request permissions
export async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('You need to enable notifications in settings');
    }
}

export async function scheduleNotification(event) {
    const eventDate = moment({
        year: event.start_date_year,
        month: event.start_date_month - 1,
        day: event.start_date_day,
        hour: event.start_time_hour,
        minute: event.start_time_minute,
    }).toDate();

    console.log(eventDate);
    console.log(event);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: event.title,
            body: `Event starting at ${event.start_time_hour}:${event.start_time_minute}`,
            sound: true,
        },
        trigger: {
            date: eventDate,
        },
    });
}