import * as SQLite from 'expo-sqlite';

const database_name = "doob_calendar.db";
let db;

export const openDatabase = async () => {
    db = await SQLite.openDatabaseAsync(database_name);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS Events (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            notes TEXT,
            start_time_hour INTEGER NOT NULL CHECK (start_time_hour >= 0 AND start_time_hour <= 23),
            start_time_minute INTEGER NOT NULL CHECK (start_time_minute >= 0 AND start_time_minute <= 59),
            start_date_month INTEGER NOT NULL CHECK (start_date_month >= 1 AND start_date_month <= 12),
            start_date_day INTEGER NOT NULL CHECK (start_date_day >= 1 AND start_date_day <= 31),
            start_date_year INTEGER NOT NULL CHECK (start_date_year >= 1776 AND start_date_year <= 9999),
            end_time_hour INTEGER CHECK (end_time_hour >= 0 AND end_time_hour <= 23),
            end_time_minute INTEGER CHECK (end_time_minute >= 0 AND end_time_minute <= 59),
            end_date_month INTEGER CHECK (end_date_month >= 1 AND end_date_month <= 12),
            end_date_day INTEGER CHECK (end_date_day >= 1 AND end_date_day <= 31),
            end_date_year INTEGER CHECK (end_date_year >= 1776 AND end_date_year <= 9999),
            duration_days INTEGER CHECK (duration_days >= 0 AND duration_days <= 999),
            duration_hours INTEGER CHECK (duration_hours >= 0 AND duration_hours <= 23),
            duration_minutes INTEGER CHECK (duration_minutes >= 0 AND duration_minutes <= 59),
            importance INTEGER CHECK (importance >= 1 AND importance <= 10),
            deadline_time_hour INTEGER CHECK (deadline_time_hour >= 0 AND deadline_time_hour <= 23),
            deadline_time_minute INTEGER CHECK (deadline_time_minute >= 0 AND deadline_time_minute <= 59),
            deadline_date_month INTEGER CHECK (deadline_date_month >= 1 AND deadline_date_month <= 12),
            deadline_date_day INTEGER CHECK (deadline_date_day >= 1 AND deadline_date_day <= 31),
            deadline_date_year INTEGER CHECK (deadline_date_year >= 1776 AND deadline_date_year <= 9999),
            is_repeating BOOLEAN,
            number_repeats INTEGER,
            is_main_event BOOLEAN,
            is_sub_event BOOLEAN,
            main_event TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY NOT NULL,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS Groups (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS UserGroups (
            id INTEGER PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            group_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id),
            FOREIGN KEY (group_id) REFERENCES Groups(id)
        );

        CREATE TABLE IF NOT EXISTS RandomReminders (
            id INTEGER PRIMARY KEY NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
    `);
};

export const getDB = () => db;