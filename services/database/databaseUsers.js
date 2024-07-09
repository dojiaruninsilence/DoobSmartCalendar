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
export const addUser = async (user) => {
    await ensureDBInitialized();

    const {
        username, email, password_hash, timezone, preference_flags
    } = user;

    if (!user) {
        return Promise.reject("Invalid user data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized: addUser");
    }

    try {
        const result = await db.runAsync(
            `
                INSERT INTO Users (
                    username, email, password_hash, timezone, preference_flags,
                    created_at, updated_at
                )
                VALUES (
                    ?, ?, ?, ?, ?, datetime('now'), datetime('now')
                )
            `, [
            user.username, user.email, user.password_hash, user.timezone,
            user.preference_flags
        ]
        );
    } catch (error) {
        return Promise.reject(`Error inserting user: ${error}`);
    }
};

// read
export const getUserById = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const user = await db.getFirstAsync('SELECT * FROM Users WHERE id = ?', id);
        return user || null;
    } catch (error) {
        return Promise.reject(`Error fetching user: ${error}`);
    }
};

export const getAllUsers = async () => {
    await ensureDBInitialized();
    
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const users = await db.getAllAsync('SELECT * FROM Users');
        return users;
    } catch (error) {
        return Promise.reject(`Error fetching users: ${error}`);
    }
};

// update
export const updateUser = async (id, updatedUser) => {
    await ensureDBInitialized();

    const {
        username, email, password_hash, timezone, preference_flags
    } = updatedUser;

    if (!updatedUser) {
        return Promise.reject("Invalid user data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync(
            `
                UPDATE Users
                SET username = ?, email = ?, password_hash = ?,
                    timezone = ?, preference_flags = ?, updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedUser.username, updatedUser.email, updatedUser.password_hash,
                updatedUser.timezone, updatedUser.preference_flags, id
            ]
        );
    } catch (error) {
        return Promise.reject(`Error updating user: ${error}`);
    }
};

// delete
export const deleteUser = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('DELETE FROM Users WHERE id = ?', id);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error deleting user: ${error}`);
    }
};