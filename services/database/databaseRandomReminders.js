import { getDB, openDatabase } from "./database";

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

// create
export const addRandomReminder = async (randomReminder) => {
    await ensureDBInitialized();

    const {
        content
    } = randomReminder;

    if (!randomReminder) {
        return Promise.reject("Invalid random reminder data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized: addRandomReminder");
    }

    try {
        const result = await db.runAsync(
            `
                INSERT INTO RandomReminder (
                    content,
                    created_at, updated_at
                )
                VALUES (
                    ?, datetime('now'), datetime('now')
                )
            `, [
                randomReminder.content
        ]
        );
    } catch (error) {
        return Promise.reject(`Error inserting random reminder: ${error}`);
    }
};

// read
export const getRandomReminderById = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const randomReminder = await db.getFirstAsync('SELECT * FROM RandomReminders WHERE id = ?', id);
        return randomReminder || null;
    } catch (error) {
        return Promise.reject(`Error fetching random reminder: ${error}`);
    }
};

export const getAllRandomReminders = async () => {
    await ensureDBInitialized();
    
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const randomReminders = await db.getAllAsync('SELECT * FROM RandomReminders');
        return randomReminders;
    } catch (error) {
        return Promise.reject(`Error fetching random reminders: ${error}`);
    }
};

// update
export const updateRandomReminder = async (id, updatedRandomReminder) => {
    await ensureDBInitialized();

    const {
        content
    } = updatedRandomReminder;

    if (!updatedUserGroup) {
        return Promise.reject("Invalid random reminder data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync(
            `
                UPDATE UserGroups
                SET content = ?, updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedRandomReminder.content, id
        ]
        );
    } catch (error) {
        return Promise.reject(`Error updating random reminder: ${error}`);
    }
};

// delete
export const deleteRandomReminder = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('DELETE FROM RandomReminders WHERE id = ?', id);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error deleting random reminder: ${error}`);
    }
};