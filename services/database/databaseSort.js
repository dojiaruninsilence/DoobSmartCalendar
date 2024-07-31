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

export const getSortedRows = async (tableName, columnName, sortOrder) => {
    await ensureDBInitialized();

    if (!db) {
        return Promise.reject("Database is not initialized");
    }

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tableName} ORDER BY ${columnName} ${sortOrder}`;
        db.transaction(tx => {
            tx.executeSql(query, [], (_, { rows }) => {
                resolve(rows._array); // resolve with sorted data
            }, (_, error) => {
                reject(error); // reject on error
            });
        });
    });
};