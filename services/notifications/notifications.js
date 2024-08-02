import moment from 'moment';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as FileSystem from 'expo-file-system';
import { Asset, useAssets } from 'expo-asset';
import { Audio } from 'expo-av';

// request permissions
export async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        alert('You need to enable notifications in settings');
    }
}

export const ALARM_TASK_NAME = 'background-alarm-task';

// define the task outside of scheduleAlarm to avoid redefining it multiple times
TaskManager.defineTask(ALARM_TASK_NAME, ({ data, error }) => {
    console.log('Task triggered:', data, error);

    if (error) {
        console.error(error);
        return;
    }

    if (data) {
        const { event, soundUri } = data;
        playAlarmSound(event, soundUri);
    }
});

export async function scheduleAlarm(event, soundUri) {
    const eventDate = moment({
        year: event.start_date_year,
        month: event.start_date_month - 1,
        day: event.start_date_day,
        hour: event.start_time_hour,
        minute: event.start_time_minute,
    }).toDate();

    console.log('Scheduling notification for:', eventDate);

    await Notifications.scheduleNotificationAsync({
        content: {
            // title: event.title,
            // body: `Event starting at ${event.start_time_hour}:${event.start_time_minute}`,
            data: { eventId: event.id, soundUri },
        },
        trigger: {
            date: eventDate,
        },
    });

    Notifications.registerTaskAsync(ALARM_TASK_NAME);

    console.log('Notification scheduled');


    // register the alarm task
    // TaskManager.defineTask(ALARM_TASK_NAME, ({ data, error }) => {
    //     if (error) {
    //         console.error(error);
    //         return;
    //     }

    //     if (data) {
    //         const { event, soundUri } = data;
    //         playAlarmSound(event, soundUri);
    //     }
    // });
}

async function playAlarmSound(event, soundUri) {

    console.log('Playing alarm sound for event:', event);
    
    const { sound } = await Audio.Sound.createAsync(
        { uri: soundUri },
        { shouldPlay: true, isLooping: true }
    );

    global.alarmSound = sound;

    // Notifications.scheduleNotificationAsync({
    //     content: {
    //         title: 'Alarm',
    //         body: `Event starting at ${event.start_time_hour}:${event.start_time_minute}`,
    //         data: { event, soundUri },
    //     },
    //     trigger: null, // trigger immediately
    // });
}

export async function snoozeAlarm(event, soundUri) {
    const snoozeTime = moment().add(5, 'minutes').toDate();
    global.alarmSound.stopAsync();
    scheduleAlarm({
        ...event,
        start_date_day: snoozeTime.getDate(),
        start_time_hour: snoozeTime.getHours(),
        start_time_minute: snoozeTime.getMinutes()
    }, soundUri);
}

export async function silenceAlarm() {
    if (global.alarmSound) {
        global.alarmSound.stopAsync();
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