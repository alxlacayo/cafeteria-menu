import createError from 'http-errors';

export default (req, res, next) => {
    const dinnerMenu = req.query.dinner_menu;

    if (dinnerMenu && dinnerMenu !== 'true') {
        throw new createError(400, 'Invalid "dinner_menu" value, set to "true" or omit.');
    }
    
    req.showDinnerMenu = dinnerMenu === 'true' || false;
    
    next();
}
