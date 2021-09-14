import {
    lunchMenuItemDb,
    dinnerMenuItemDb
} from '../database/index.js';
import dateUtils from '../utils/date.js';

async function getMenu() {
    const date = new Date();
    const timeToShowDinnerMenu = process.env.TIME_TO_SHOW_DINNER_MENU || 16;
    let showDinnerMenu = date.getHours() >= timeToShowDinnerMenu;
    let menu = await getMenuByDate(date, showDinnerMenu);

    /**
     * If no items are found on the lunch menu
     * then load the dinner menu, and vice versa.
     * The idea is to try to always show a menu
     * for the current day if one exists.
     */
    if (Object.keys(menu.sections).length === 0) {
        showDinnerMenu = !showDinnerMenu;
        menu = await getMenuByDate(date, showDinnerMenu);
    }

    return menu;
}

async function getMenuByDate(date, showDinnerMenu) {
    const dateString = dateUtils.toDateString(date);
    const items = showDinnerMenu
        ? await dinnerMenuItemDb.getByDate(dateString)
        : await lunchMenuItemDb.getByDate(dateString);
    return {
        date,
        sections: items,
        isDinnerMenu: showDinnerMenu
    };
}

export default { getMenu, getMenuByDate };
