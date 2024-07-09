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
export const addGroup = async (group) => {
    await ensureDBInitialized();

    const {
        name, timezone, preference_flags
    } = group;

    if (!group) {
        return Promise.reject("Invalid group data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized: addGroup");
    }

    try {
        const result = await db.runAsync(
            `
                INSERT INTO Groups (
                    name, timezone, preference_flags,
                    created_at, updated_at
                )
                VALUES (
                    ?, ?, ?, datetime('now'), datetime('now')
                )
            `, [
            group.name, group.timezone,
            group.preference_flags
        ]
        );
    } catch (error) {
        return Promise.reject(`Error inserting group: ${error}`);
    }
};

// read
export const getGroupById = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const group = await db.getFirstAsync('SELECT * FROM Groups WHERE id = ?', id);
        return group || null;
    } catch (error) {
        return Promise.reject(`Error fetching group: ${error}`);
    }
};

export const getAllGroups = async () => {
    await ensureDBInitialized();
    
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const groups = await db.getAllAsync('SELECT * FROM Groups');
        return groups;
    } catch (error) {
        return Promise.reject(`Error fetching groups: ${error}`);
    }
};

// update
export const updateGroup = async (id, updatedGroup) => {
    await ensureDBInitialized();

    const {
        name, timezone, preference_flags
    } = updatedGroup;

    if (!updatedGroup) {
        return Promise.reject("Invalid group data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync(
            `
                UPDATE Groups
                SET name = ?, timezone = ?, preference_flags = ?,
                    updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedGroup.name, updatedGroup.timezone,
                updatedGroup.preference_flags, id
        ]
        );
    } catch (error) {
        return Promise.reject(`Error updating group: ${error}`);
    }
};

// delete
export const deleteGroup = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('DELETE FROM Groups WHERE id = ?', id);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error deleting group: ${error}`);
    }
};