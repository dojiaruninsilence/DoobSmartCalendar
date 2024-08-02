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
export const addColorGroup = async (colorGroup) => {
    await ensureDBInitialized();

    const {
        name, hex_color, notes, description
    } = colorGroup;

    if (!colorGroup) {
        return Promise.reject("Invalid random reminder data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized: addColorGroup");
    }

    try {
        const result = await db.runAsync(
            `
                INSERT INTO ColorGroups (
                    name, hex_color, notes, description,
                    created_at, updated_at
                )
                VALUES (
                    ?, ?, ?, ?, datetime('now'), datetime('now')
                )
            `, [
                colorGroup.name, colorGroup.hex_color, colorGroup.notes, 
                colorGroup.description
        ]
        );
    } catch (error) {
        return Promise.reject(`Error inserting color group: ${error}`);
    }
};

// read
export const getColorGroupById = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const colorGroup = await db.getFirstAsync('SELECT * FROM ColorGroups WHERE id = ?', id);
        return colorGroup || null;
    } catch (error) {
        return Promise.reject(`Error fetching color group: ${error}`);
    }
};

export const getColorGroupByColor = async (color) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const colorGroup = await db.getFirstAsync('SELECT * FROM ColorGroups WHERE hex_color = ?', color);
        return colorGroup || null;
    } catch (error) {
        return Promise.reject(`Error fetching color group: ${error}`);
    }
};

export const getAllColorGroups = async () => {
    await ensureDBInitialized();
    
    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const colorGroups = await db.getAllAsync('SELECT * FROM ColorGroups');
        return colorGroups;
    } catch (error) {
        return Promise.reject(`Error fetching color groups: ${error}`);
    }
};

// update
export const updateColorGroup = async (id, updatedColorGroup) => {
    await ensureDBInitialized();

    const {
        name, hex_color, notes, description
    } = updatedColorGroup;

    if (!updatedColorGroup) {
        return Promise.reject("Invalid color group data");
    }

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync(
            `
                UPDATE ColorGroups
                SET name = ?, hex_color =?, notes = ?, description = ?,
                    updated_at = datetime('now')
                WHERE id = ?
            `, [
                updatedColorGroup.name, updatedColorGroup.hex_color,
                updatedColorGroup.notes, updatedColorGroup.description, id
        ]
        );
    } catch (error) {
        return Promise.reject(`Error updating color group: ${error}`);
    }
};

// delete
export const deleteColorGroup = async (id) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    try {
        const result = await db.runAsync('DELETE FROM ColorGroups WHERE id = ?', id);
        return result.changes;
    } catch (error) {
        return Promise.reject(`Error deleting color groups: ${error}`);
    }
};