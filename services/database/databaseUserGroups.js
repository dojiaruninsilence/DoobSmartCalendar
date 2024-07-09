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
export const addUserGroup = async (userGroup) => {
    await ensureDBInitialized();

    const {
        user_id, group_id
    } = userGroup;

    if (!userGroup) {
        return Promise.reject("Invalid group data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized: addUserGroup");
    }

    try {
        const result = await db.runAsync(
            `
                INSERT INTO UserGroups (
                    user_id, group_id,
                    created_at, updated_at
                )
                VALUES (
                    ?, ?, datetime('now'), datetime('now')
                )
            `, [
                userGroup.user_id, userGroup.group_id
        ]
        );
    } catch (error) {
        return Promise.reject(`Error inserting userGroup: ${error}`);
    }
};

// read
export const getUserGroupById = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const userGroup = await db.getFirstAsync('SELECT * FROM UserGroups WHERE id = ?', id);
        return userGroup || null;
    } catch (error) {
        return Promise.reject(`Error fetching userGroup: ${error}`);
    }
};

export const getAllUserGroups = async () => {
    await ensureDBInitialized();
    
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const userGroups = await db.getAllAsync('SELECT * FROM UserGroups');
        return userGroups;
    } catch (error) {
        return Promise.reject(`Error fetching userGroups: ${error}`);
    }
};

// update
export const updateUserGroup = async (id, updatedUserGroup) => {
    await ensureDBInitialized();

    const {
        user_id, group_id
    } = updatedUserGroup;

    if (!updatedUserGroup) {
        return Promise.reject("Invalid user group data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync(
            `
                UPDATE UserGroups
                SET user_id = ?, group_id = ?, updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedUserGroup.user_id, updatedUserGroup.group_id, id
        ]
        );
    } catch (error) {
        return Promise.reject(`Error updating user group: ${error}`);
    }
};

// delete
export const deleteUserGroup = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('DELETE FROM UserGroups WHERE id = ?', id);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error deleting user group: ${error}`);
    }
};