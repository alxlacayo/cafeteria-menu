import menuService from '../services/get-menu.js';
import settingsService from '../services/get-settings.js';

async function index(req, res, next) {
    try {
        const menu = await menuService.getMenu();
        const settings = await settingsService.getSettings();

        // Respond with JSON during testing
        if (req.get('Accept') === 'application/json') {
            return res.json({ menu, settings });
        }

        res.render('index', { menu, settings });
    } catch (err) {
        next(err);
    }
}

async function preview(req, res, next) {
    try {
        const date = req.date;
        const showDinnerMenu = req.showDinnerMenu;
        const menu = await menuService.getMenuByDate(date, showDinnerMenu);
        const settings = await settingsService.getSettings();

        // Respond with JSON during testing
        if (req.get('Accept') === 'application/json') {
            return res.json({ menu, settings });
        }

        res.render('index', { menu, settings });
    } catch (err) {
        next(err);
    }
}

export default { index, preview };
