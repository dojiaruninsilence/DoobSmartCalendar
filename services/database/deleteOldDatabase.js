import * as FileSystem from 'expo-file-system';

const oldDatabaseName = "test_calendar.db";

export const deleteOldDatabase = async () => {
    try {
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/${oldDatabaseName}`);
        console.log(`Old database ${oldDatabaseName} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete old database: ${error}`);
    }
};