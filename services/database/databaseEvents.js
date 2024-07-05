import * as SQLite from 'expo-sqlite';

import { getDB, openDatabase } from "./database";

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

    // Apply defaults for missing or invalid fields
    event.start_time_hour = (event.start_time_hour >= 0 && event.start_time_hour <= 23) ? event.start_time_hour : currentHour;
    event.start_time_minute = (event.start_time_minute >= 0 && event.start_time_minute <= 59) ? event.start_time_minute : currentMinute;

    event.start_date_month = (event.start_date_month >= 1 && event.start_date_month <= 12) ? event.start_date_month : currentMonth;
    event.start_date_day = (event.start_date_day >= 1 && event.start_date_day <= 31) ? event.start_date_day : currentDay;
    event.start_date_year = (event.start_date_year >= 1900 && event.start_date_year <= 2100) ? event.start_date_year : currentYear;

    event.end_time_hour = (event.end_time_hour >= 0 && event.end_time_hour <= 23) ? event.end_time_hour : event.start_time_hour;
    event.end_time_minute = (event.end_time_minute >= 0 && event.end_time_minute <= 59) ? event.end_time_minute : event.start_time_minute;

    event.end_date_month = (event.end_date_month >= 1 && event.end_date_month <= 12) ? event.end_date_month : event.start_date_month;
    event.end_date_day = (event.end_date_day >= 1 && event.end_date_day <= 31) ? event.end_date_day : event.start_date_day;
    event.end_date_year = (event.end_date_year >= 1900 && event.end_date_year <= 2100) ? event.end_date_year : event.start_date_year;

    event.deadline_time_hour = (event.deadline_time_hour >= 0 && event.deadline_time_hour <= 23) ? event.deadline_time_hour : event.start_time_hour;
    event.deadline_time_minute = (event.deadline_time_minute >= 0 && event.deadline_time_minute <= 59) ? event.deadline_time_minute : event.start_time_minute;

    event.deadline_date_month = (event.deadline_date_month >= 1 && event.deadline_date_month <= 12) ? event.deadline_date_month : event.start_date_month;
    event.deadline_date_day = (event.deadline_date_day >= 1 && event.deadline_date_day <= 31) ? event.deadline_date_day : event.start_date_day;
    event.deadline_date_year = (event.deadline_date_year >= 1900 && event.deadline_date_year <= 2100) ? event.deadline_date_year : event.start_date_year;

    event.duration_days = (event.duration_days >= 0 && event.duration_days <= 999) ? event.duration_days : 0;
    event.duration_hours = (event.duration_hours >= 0 && event.duration_hours <= 23) ? event.duration_hours : 0;
    event.duration_minutes = (event.duration_minutes >= 0 && event.duration_minutes <= 59) ? event.duration_minutes : 0;
    
    event.importance = (event.importance >= 1 && event.importance <= 10) ? event.importance : 1;

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
        is_repeating, number_repeats, is_main_event, is_sub_event,
        main_event
    } = event;

    event = validateAndDefaultEvent(event)

    // // validate the dates
    // if (!isValidDate(start_date_year, start_date_month, start_date_day)) {
    //     return Promise.reject("Invalid event start date");
    // }
    // if (!isValidDate(end_date_year, end_date_month, end_date_day)) {
    //     return Promise.reject("Invalid event end date");
    // }
    // if (!isValidDate(deadline_date_year, deadline_date_month, deadline_date_day)) {
    //     return Promise.reject("Invalid event deadline date");
    // }

    // // validate the times 
    // if (start_time_hour < 0 || start_time_hour > 23 ||
    //     start_time_minute < 0 || start_time_minute > 59) {
    //     return Promise.reject("Invalid start time");
    // }
    // if (end_time_hour < 0 || end_time_hour > 23 ||
    //     end_time_minute < 0 || end_time_minute > 59) {
    //     return Promise.reject("Invalid end time");
    // }
    // if (deadline_time_hour < 0 || deadline_time_hour > 23 ||
    //     deadline_time_minute < 0 || deadline_time_minute > 59) {
    //     return Promise.reject("Invalid deadline time");
    // }

    // // validate importance
    // if (importance < 1 || importance > 10) {
    //     return Promise.reject("Importance must be between 1 and 5");
    // }

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
                    is_repeating, number_repeats, is_main_event, is_sub_event,
                    main_event, created_at, updated_at
                )
                VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
                )
            `, [
                event.title, event.description, event.notes, event.start_time_hour, event.start_time_minute,
                event.start_date_month, event.start_date_day, event.start_date_year,
                event.end_time_hour, event.end_time_minute, event.end_date_month, event.end_date_day,
                event.end_date_year, event.duration_days, event.duration_hours, event.duration_minutes,
                event.importance, event.deadline_time_hour, event.deadline_time_minute,
                event.deadline_date_month, event.deadline_date_day, event.deadline_date_year,
                event.is_repeating, event.number_repeats, event.is_main_event, event.is_sub_event,
                event.main_event
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
        is_repeating, number_repeats, is_main_event, is_sub_event,
        main_event
    } = updatedEvent;

    updatedEvent = validateAndDefaultEvent(updatedEvent)

    // // Validate the dates
    // if (!isValidDate(start_date_year, start_date_month, start_date_day)) {
    //     return Promise.reject("Invalid event start date");
    // }
    // if (!isValidDate(end_date_year, end_date_month, end_date_day)) {
    //     return Promise.reject("Invalid event end date");
    // }
    // if (!isValidDate(deadline_date_year, deadline_date_month, deadline_date_day)) {
    //     return Promise.reject("Invalid event deadline date");
    // }

    // // Validate the times 
    // if (start_time_hour < 0 || start_time_hour > 23 ||
    //     start_time_minute < 0 || start_time_minute > 59) {
    //     return Promise.reject("Invalid start time");
    // }
    // if (end_time_hour < 0 || end_time_hour > 23 ||
    //     end_time_minute < 0 || end_time_minute > 59) {
    //     return Promise.reject("Invalid end time");
    // }
    // if (deadline_time_hour < 0 || deadline_time_hour > 23 ||
    //     deadline_time_minute < 0 || deadline_time_minute > 59) {
    //     return Promise.reject("Invalid deadline time");
    // }

    // // Validate importance
    // if (importance < 1 || importance > 10) {
    //     return Promise.reject("Importance must be between 1 and 10");
    // }

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
                    is_repeating = ?, number_repeats = ?, is_main_event = ?, is_sub_event = ?,
                    main_event = ?, updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedEvent.title, updatedEvent.description, updatedEvent.notes, updatedEvent.start_time_hour, updatedEvent.start_time_minute,
                updatedEvent.start_date_month, updatedEvent.start_date_day, updatedEvent.start_date_year,
                updatedEvent.end_time_hour, updatedEvent.end_time_minute, updatedEvent.end_date_month, updatedEvent.end_date_day,
                updatedEvent.end_date_year, updatedEvent.duration_days, updatedEvent.duration_hours, updatedEvent.duration_minutes,
                updatedEvent.importance, updatedEvent.deadline_time_hour, updatedEvent.deadline_time_minute,
                updatedEvent.deadline_date_month, updatedEvent.deadline_date_day, updatedEvent.deadline_date_year,
                updatedEvent.is_repeating, updatedEvent.number_repeats, updatedEvent.is_main_event, updatedEvent.is_sub_event,
                updatedEvent.main_event, id
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