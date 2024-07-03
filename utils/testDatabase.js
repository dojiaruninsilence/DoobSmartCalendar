import * as SQLite from 'expo-sqlite';

const database_name = "test_calendar.db";
let db;

export const openDatabase = async () => {
    db = await SQLite.openDatabaseAsync(database_name);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS TextInputs (
            id INTEGER PRIMARY KEY NOT NULL,
            text TEXT NOT NULL
        );
    `);
};

export const insertText = async (text) => {
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('INSERT INTO TextInputs (text) VALUES (?)', text);
        return result.lastInsertRowId;
    } catch (error) {
        return Promise.reject(`Error inserting text: ${error}`);
    }
};

export const getLatestText = async () => {
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const firstRow = await db.getFirstAsync('SELECT * FROM TextInputs ORDER BY id DESC LIMIT 1');
        return firstRow || null;
    } catch (error) {
        return Promise.reject(`Error fetching latest text: ${error}`);
    }
};