import createError from 'http-errors';
import dateUtils from '../utils/date.js';

export default (req, res, next) => {
    const dateString = req.query.date;

    if (!dateString) {
        throw new createError(400, 'Must include "date" parameter with value in MM-DD-YYYY format.');
    }

    const date = dateUtils.parseDateString(dateString);
    
    if (isNaN(date)) {
        throw new createError(400, 'Must include "date" parameter with value in MM-DD-YYYY format.');
    }

    req.date = date;
    
    next();
}
