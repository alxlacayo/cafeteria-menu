import { settingsDb } from '../database/index.js';

async function getSettings() {
    return await settingsDb.getAll();
}

export default { getSettings };
