import * as SQLite from 'expo-sqlite';
import moment from 'moment';

import { getDB, openDatabase } from "./database";
import { modifyDateTime, formatDateTime, separateDateTime, calculateDifference } from '../../utils/dateTimeCalculations';

// ensure that the database is opened and initialized
(async () => {
    await openDatabase();
})();

let db = getDB();

const ensureDBInitialized = async () => {
    if (!db) {
        await openDatabase();
        db = getDB();
    }
};

const isLeapyear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

const isValidDate = (year, month, day) => {
    const daysInMonth = [31, isLeapyear(year) ? 29 : 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day > 0 && day <= daysInMonth[month - 1];
}

const validateAndDefaultEvent = (event) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
    const currentDay = now.getDate();
    const currentYear = now.getFullYear();
    const defaultColor = '#D3D3D3';

    // check for incomplete time groupings
    const timeGroups = [
        { hour: event.start_time_hour, minute: event.start_time_minute },
        { hour: event.end_time_hour, minute: event.end_time_minute },
        { hour: event.deadline_time_hour, minute: event.deadline_time_minute }
    ];

    for (const group of timeGroups) {
        const { hour, minute } = group;
        if ((hour !== undefined && minute === undefined) || (hour === undefined && minute !== undefined) ||
            (!isNaN(hour) && isNaN(minute)) || (isNaN(hour) && !isNaN(minute))) {
            alert("Please provide both hour and minute for any time fields.");
            return null;
        }
    }

    // check for incomplete date groupings
    const dateGroups = [
        { year: event.start_date_year, month: event.start_date_month, day: event.start_date_day },
        { year: event.end_date_year, month: event.end_date_month, day: event.end_date_day },
        { year: event.deadline_date_year, month: event.deadline_date_month, day: event.deadline_date_day }
    ];

    for (const group of dateGroups) {
        const { year, month, day } = group;
        if ((year !== undefined && (month === undefined || day === undefined)) ||
            (year === undefined && (month !== undefined || day !== undefined)) ||
            (isNaN(year) && (!isNaN(month) || !isNaN(day))) ||
            (!isNaN(year) && (isNaN(month) || isNaN(day)))) {
            alert("Please provide year, month, and day for any date fields");
            return null;
        }
    }

    
    // apply defaults for missing or invalid fields - start time and date
    event.start_time_hour = (event.start_time_hour >= 0 && event.start_time_hour <= 23) ? event.start_time_hour : currentHour;
    event.start_time_minute = (event.start_time_minute >= 0 && event.start_time_minute <= 59) ? event.start_time_minute : currentMinute;

    event.start_date_month = (event.start_date_month >= 1 && event.start_date_month <= 12) ? event.start_date_month : currentMonth;
    event.start_date_day = (event.start_date_day >= 1 && event.start_date_day <= 31) ? event.start_date_day : currentDay;
    event.start_date_year = (event.start_date_year >= 1900 && event.start_date_year <= 2100) ? event.start_date_year : currentYear;

    // apply defaults for missing or invalid fields - duration
    event.duration_days = (event.duration_days >= 0 && event.duration_days <= 999) ? event.duration_days : 0;
    event.duration_hours = (event.duration_hours >= 0 && event.duration_hours <= 23) ? event.duration_hours : 0;
    event.duration_minutes = (event.duration_minutes >= 0 && event.duration_minutes <= 59) ? event.duration_minutes : 0;

    // additional checks for end date and time and duration
    const endTimeFieldsEmpty = (event.end_time_hour === undefined && event.end_time_minute === undefined) ||
        (isNaN(event.end_time_hour) && isNaN(event.end_time_minute));
    const endDateFieldsEmpty = (event.end_date_month === undefined && event.end_date_day === undefined && event.end_date_year === undefined) ||
        (isNaN(event.end_date_month) && isNaN(event.end_date_day) && isNaN(event.end_date_year));
    const durationFieldsFilled = event.duration_days !== 0 || event.duration_hours !== 0 || event.duration_minutes !== 0;

    // calculate end date and time if empty and duration provided
    if (endTimeFieldsEmpty && endDateFieldsEmpty && durationFieldsFilled) {
        const startDateTime = formatDateTime(
            event.start_date_month, event.start_date_day, event.start_date_year, event.start_time_hour, event.start_time_minute);

        const endDateTime = modifyDateTime(startDateTime, event.duration_days, event.duration_hours, event.duration_minutes);
        const { month, day, year, hours, minutes } = separateDateTime(endDateTime);

        event.end_date_month = month;
        event.end_date_day = day;
        event.end_date_year = year;
        event.end_time_hour = hours;
        event.end_time_minute = minutes;
    }

    // apply defaults for missing or invalid fields - end time
    event.end_time_hour = (event.end_time_hour >= 0 && event.end_time_hour <= 23) ? event.end_time_hour : event.start_time_hour;
    event.end_time_minute = (event.end_time_minute >= 0 && event.end_time_minute <= 59) ? event.end_time_minute : event.start_time_minute;

    event.end_date_month = (event.end_date_month >= 1 && event.end_date_month <= 12) ? event.end_date_month : event.start_date_month;
    event.end_date_day = (event.end_date_day >= 1 && event.end_date_day <= 31) ? event.end_date_day : event.start_date_day;
    event.end_date_year = (event.end_date_year >= 1900 && event.end_date_year <= 2100) ? event.end_date_year : event.start_date_year;

    // calculate the duration if an end date or time was provided
    if (!endTimeFieldsEmpty || !endDateFieldsEmpty) {
        const startDateTime = formatDateTime(event.start_date_month, event.start_date_day, event.start_date_year, event.start_time_hour, event.start_time_minute);
        const endDateTime = formatDateTime(event.end_date_month, event.end_date_day, event.end_date_year, event.end_time_hour, event.end_time_minute);

        const { days, hours, minutes } = calculateDifference(startDateTime, endDateTime);

        event.duration_days = days;
        event.duration_hours = hours;
        event.duration_minutes = minutes;
    }

    // apply defaults for missing or invalid fields - deadline
    event.deadline_time_hour = (event.deadline_time_hour >= 0 && event.deadline_time_hour <= 23) ? event.deadline_time_hour : event.end_time_hour;
    event.deadline_time_minute = (event.deadline_time_minute >= 0 && event.deadline_time_minute <= 59) ? event.deadline_time_minute : event.end_time_minute;

    event.deadline_date_month = (event.deadline_date_month >= 1 && event.deadline_date_month <= 12) ? event.deadline_date_month : event.end_date_month;
    event.deadline_date_day = (event.deadline_date_day >= 1 && event.deadline_date_day <= 31) ? event.deadline_date_day : event.end_date_day;
    event.deadline_date_year = (event.deadline_date_year >= 1900 && event.deadline_date_year <= 2100) ? event.deadline_date_year : event.end_date_year;

    event.importance = (event.importance >= 1 && event.importance <= 10) ? event.importance : 1;

    event.color = event.color ? event.color : defaultColor;

    return event;
};

// create
export const addEvent = async (event) => {
    await ensureDBInitialized();

    const {
        title, description, notes, start_time_hour, start_time_minute,
        start_date_month, start_date_day, start_date_year,
        end_time_hour, end_time_minute, end_date_month, end_date_day,
        end_date_year, duration_days, duration_hours, duration_minutes,
        importance, deadline_time_hour, deadline_time_minute,
        deadline_date_month, deadline_date_day, deadline_date_year,
        repeat_flags, number_repeats, repeat_end_date_month, 
        repeat_end_date_day, repeat_end_date_year, repeat_start_time_hour,
        repeat_start_time_minute, repeat_end_time_hour, 
        repeat_end_time_minute, is_main_event, is_sub_event, main_event,
        color, group_id, user_id
    } = event;

    event = validateAndDefaultEvent(event)

    if (!event) {
        return Promise.reject("Invalid event data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized: addEvent");
    }

    try {
        const result = await db.runAsync(
            `
                INSERT INTO Events (
                    title, description, notes, start_time_hour, start_time_minute,
                    start_date_month, start_date_day, start_date_year,
                    end_time_hour, end_time_minute, end_date_month, end_date_day,
                    end_date_year, duration_days, duration_hours, duration_minutes,
                    importance, deadline_time_hour, deadline_time_minute,
                    deadline_date_month, deadline_date_day, deadline_date_year,
                    repeat_flags, number_repeats, repeat_end_date_month, 
                    repeat_end_date_day, repeat_end_date_year, repeat_start_time_hour,
                    repeat_start_time_minute, repeat_end_time_hour, 
                    repeat_end_time_minute, is_main_event, is_sub_event, main_event,
                    color, group_id, user_id, created_at, updated_at
                )
                VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
                )
            `, [
                event.title, event.description, event.notes, event.start_time_hour, event.start_time_minute,
                event.start_date_month, event.start_date_day, event.start_date_year,
                event.end_time_hour, event.end_time_minute, event.end_date_month, event.end_date_day,
                event.end_date_year, event.duration_days, event.duration_hours, event.duration_minutes,
                event.importance, event.deadline_time_hour, event.deadline_time_minute,
                event.deadline_date_month, event.deadline_date_day, event.deadline_date_year,
                event.repeat_flags, event.number_repeats, event.repeat_end_date_month, 
                event.repeat_end_date_day, event.repeat_end_date_year, event.repeat_start_time_hour,
                event.repeat_start_time_minute, event.repeat_end_time_hour, event.repeat_end_time_minute,
                event.is_main_event, event.is_sub_event, event.main_event, event.color,
                event.group_id, event.user_id
            ]
        );
    } catch (error) {
        return Promise.reject(`Error inserting event: ${error}`);
    }
};

// read
export const getEventById = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const event = await db.getFirstAsync('SELECT * FROM  Events WHERE id = ?', id);
        return event || null;
    } catch (error) {
        return Promise.reject(`Error fetching event: ${error}`);
    }
};

export const getEventsForDate = async (date) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const events = await db.getAllAsync(
            'SELECT * FROM Events WHERE start_date_year = ? AND start_date_month = ? AND start_date_day = ?',
            [parseInt(date.substring(0, 4)), parseInt(date.substring(5, 7)), parseInt(date.substring(8, 10))]
        );
        return events;
    } catch (error) {
        return Promise.reject(`Error fetching events: ${error}`);
    }
};

export const getEventsForThreeDay = async (date) => {
    const currentDate = (moment(date).format('YYYY-MM-DD'));
    const prevDate = (moment(date).subtract(1, 'days').format('YYYY-MM-DD'));
    const nextDate = (moment(date).add(1, 'days').format('YYYY-MM-DD'));

    let events = [];

    const prevEvents = await getEventsForDate(prevDate);
    const currentEvents = await getEventsForDate(currentDate);
    const nextEvents = await getEventsForDate(nextDate);

    events = events.concat(prevEvents);
    events = events.concat(currentEvents);
    events = events.concat(nextEvents);

    return events;
};

export const getEventsForWeek = async (date) => {
    const startOfWeek = moment(date).startOf('week').format('YYYY-MM-DD');
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD')
    );
    let events = [];

    for (const day of daysOfWeek) {
        try {
            const dayEvents = await getEventsForDate(day);
            events = events.concat(dayEvents);
        } catch (error) {
            console.error(`Error fetching events for date ${day}: ${error}`);
        }
    }

    return events;
};

export const getAllEvents = async () => {
    await ensureDBInitialized();
    
    if (!db) {
        return Promise.reject("Database is not initialized"); 
    }

    try {
        const events = await db.getAllAsync('SELECT * FROM Events');
        return events;
    } catch (error) {
        return Promise.reject(`Error fetching events: ${error}`);
    }
};

// update
export const updateEvent = async (id, updatedEvent) => {
    await ensureDBInitialized();

    const {
        title, description, notes, start_time_hour, start_time_minute,
        start_date_month, start_date_day, start_date_year,
        end_time_hour, end_time_minute, end_date_month, end_date_day,
        end_date_year, duration_days, duration_hours, duration_minutes,
        importance, deadline_time_hour, deadline_time_minute,
        deadline_date_month, deadline_date_day, deadline_date_year,
        repeat_flags, number_repeats, repeat_end_date_month, 
        repeat_end_date_day, repeat_end_date_year, repeat_start_time_hour,
        repeat_start_time_minute, repeat_end_time_hour, 
        repeat_end_time_minute, is_main_event, is_sub_event, main_event,
        color, group_id, user_id
    } = updatedEvent;

    updatedEvent = validateAndDefaultEvent(updatedEvent);

    if (!updatedEvent) {
        return Promise.reject("Invalid event data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync(
            `
                UPDATE Events
                SET title = ?, description = ?, notes = ?, start_time_hour = ?, start_time_minute = ?,
                    start_date_month = ?, start_date_day = ?, start_date_year = ?,
                    end_time_hour = ?, end_time_minute = ?, end_date_month = ?, end_date_day = ?,
                    end_date_year = ?, duration_days = ?, duration_hours = ?, duration_minutes = ?,
                    importance = ?, deadline_time_hour = ?, deadline_time_minute = ?,
                    deadline_date_month = ?, deadline_date_day = ?, deadline_date_year = ?,
                    repeat_flags = ?, number_repeats = ?, repeat_end_date_month = ?, 
                    repeat_end_date_day = ?, repeat_end_date_year = ?, repeat_start_time_hour = ?,
                    repeat_start_time_minute = ?, repeat_end_time_hour = ?, 
                    repeat_end_time_minute = ?, is_main_event = ?, is_sub_event = ?,
                    main_event = ?, color = ?, group_id = ?, user_id = ?, updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedEvent.title, updatedEvent.description, updatedEvent.notes, updatedEvent.start_time_hour,
                updatedEvent.start_time_minute, updatedEvent.start_date_month, updatedEvent.start_date_day,
                updatedEvent.start_date_year, updatedEvent.end_time_hour, updatedEvent.end_time_minute,
                updatedEvent.end_date_month, updatedEvent.end_date_day, updatedEvent.end_date_year,
                updatedEvent.duration_days, updatedEvent.duration_hours, updatedEvent.duration_minutes,
                updatedEvent.importance, updatedEvent.deadline_time_hour, updatedEvent.deadline_time_minute,
                updatedEvent.deadline_date_month, updatedEvent.deadline_date_day, updatedEvent.deadline_date_year,
                updatedEvent.repeat_flags, updatedEvent.number_repeats, updatedEvent.repeat_end_date_month, 
                updatedEvent.repeat_end_date_day, updatedEvent.repeat_end_date_year, updatedEvent.repeat_start_time_hour,
                updatedEvent.repeat_start_time_minute, updatedEvent.repeat_end_time_hour, updatedEvent.repeat_end_time_minute,
                updatedEvent.is_main_event, updatedEvent.is_sub_event, updatedEvent.main_event, updatedEvent.color,
                updatedEvent.group_id, updatedEvent.user_id, id
        ]);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error updating event: ${error}`);
    }
};

// Delete
export const deleteEvent = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('DELETE FROM Events WHERE id = ?', id);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error deleting event: ${error}`);
    }
};