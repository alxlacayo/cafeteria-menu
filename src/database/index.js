import { GoogleSpreadsheet } from 'google-spreadsheet';
import createLunchMenuItemDb from './lunch-menu-item-db.js';
import createDinnerMenuItemDb from './dinner-menu-item-db.js';
import createSettingsDb from './settings-db.js';

const doc = new GoogleSpreadsheet(process.env.GOOGLE_DOCUMENT_ID);

await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_API_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n')
});

await doc.loadInfo();

const lunchMenuItemDb = createLunchMenuItemDb({
    db: doc.sheetsById[process.env.GOOGLE_LUNCH_SHEET_ID]
});

const dinnerMenuItemDb = createDinnerMenuItemDb({
    db: doc.sheetsById[process.env.GOOGLE_DINNER_SHEET_ID]
});

const settingsDb = createSettingsDb({
    db: doc.sheetsById[process.env.GOOGLE_SETTINGS_SHEET_ID]
});

export {
    lunchMenuItemDb,
    dinnerMenuItemDb,
    settingsDb
};
