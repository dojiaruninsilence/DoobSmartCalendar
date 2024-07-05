import * as SQLite from 'expo-sqlite';

import { getDB, openDatabase } from "./database";

// ensure that the database is opened and initialized
(async () => {
    await openDatabase();
})();

const db = getDB();

const ensureDBInitialized = async () => {
    if (!db) {
        await openDatabase();
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

    // validate the dates
    if (!isValidDate(start_date_year, start_date_month, start_date_day)) {
        return Promise.reject("Invalid event start date");
    }
    if (!isValidDate(end_date_year, end_date_month, end_date_day)) {
        return Promise.reject("Invalid event end date");
    }
    if (!isValidDate(deadline_date_year, deadline_date_month, deadline_date_day)) {
        return Promise.reject("Invalid event deadline date");
    }

    // validate the times 
    if (start_time_hour < 0 || start_time_hour > 23 ||
        start_time_minute < 0 || start_time_minute > 59) {
        return Promise.reject("Invalid start time");
    }
    if (end_time_hour < 0 || end_time_hour > 23 ||
        end_time_minute < 0 || end_time_minute > 59) {
        return Promise.reject("Invalid end time");
    }
    if (deadline_time_hour < 0 || deadline_time_hour > 23 ||
        deadline_time_minute < 0 || deadline_time_minute > 59) {
        return Promise.reject("Invalid deadline time");
    }

    // validate importance
    if (importance < 1 || importance > 10) {
        return Promise.reject("Importance must be between 1 and 5");
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
                    is_repeating, number_repeats, is_main_event, is_sub_event,
                    main_event, created_at, updated_at
                )
                VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now')
                )
            `, [
            title, description, notes, start_time_hour, start_time_minute,
            start_date_month, start_date_day, start_date_year,
            end_time_hour, end_time_minute, end_date_month, end_date_day,
            end_date_year, duration_days, duration_hours, duration_minutes,
            importance, deadline_time_hour, deadline_time_minute,
            deadline_date_month, deadline_date_day, deadline_date_year,
            is_repeating, number_repeats, is_main_event, is_sub_event,
            main_event
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

    // Validate the dates
    if (!isValidDate(start_date_year, start_date_month, start_date_day)) {
        return Promise.reject("Invalid event start date");
    }
    if (!isValidDate(end_date_year, end_date_month, end_date_day)) {
        return Promise.reject("Invalid event end date");
    }
    if (!isValidDate(deadline_date_year, deadline_date_month, deadline_date_day)) {
        return Promise.reject("Invalid event deadline date");
    }

    // Validate the times 
    if (start_time_hour < 0 || start_time_hour > 23 ||
        start_time_minute < 0 || start_time_minute > 59) {
        return Promise.reject("Invalid start time");
    }
    if (end_time_hour < 0 || end_time_hour > 23 ||
        end_time_minute < 0 || end_time_minute > 59) {
        return Promise.reject("Invalid end time");
    }
    if (deadline_time_hour < 0 || deadline_time_hour > 23 ||
        deadline_time_minute < 0 || deadline_time_minute > 59) {
        return Promise.reject("Invalid deadline time");
    }

    // Validate importance
    if (importance < 1 || importance > 10) {
        return Promise.reject("Importance must be between 1 and 10");
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
                    is_repeating = ?, number_repeats = ?, is_main_event = ?, is_sub_event = ?,
                    main_event = ?, updated_at = datetime('now')
                WHERE id = ?
            `, [
            title, description, notes, start_time_hour, start_time_minute,
            start_date_month, start_date_day, start_date_year,
            end_time_hour, end_time_minute, end_date_month, end_date_day,
            end_date_year, duration_days, duration_hours, duration_minutes,
            importance, deadline_time_hour, deadline_time_minute,
            deadline_date_month, deadline_date_day, deadline_date_year,
            is_repeating, number_repeats, is_main_event, is_sub_event,
            main_event, id
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