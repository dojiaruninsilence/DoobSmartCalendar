import * as SQLite from 'expo-sqlite';

const oldDatabaseName = "doob_calendar_v_1_2.db";
const newDatabaseName = "doob_calendar_v_1_3.db";

const copyTableData = async (oldDb, newDb, tableName) => {
    const data = await oldDb.getAllAsync(`SELECT * FROM ${tableName}`);
    for (const row of data) {
        const columns = Object.keys(row).join(", ");
        const placeholders = Object.keys(row).map(() => "?").join(", ");
        const values = Object.values(row);
        await newDb.runAsync(
            `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`,
            values
        );
    }
};

export const migrateDatabase = async () => {
    const oldDb = await SQLite.openDatabaseAsync(oldDatabaseName);
    const newDb = await SQLite.openDatabaseAsync(newDatabaseName);

    const tables = ["Events", "Users", "Groups", "UserGroups", "RandomReminders", "ColorGroups"];
    for (const table of tables) {
        await copyTableData(oldDb, newDb, table);
    }

    await oldDb.closeAsync();
    console.log(`Database migrated from ${oldDatabaseName} to ${newDatabaseName}`);
};