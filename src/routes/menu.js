import express from 'express';
import controller from '../controllers/menu-controller.js';
import setMenuDate from '../middlewares/set-menu-date.js';
import setMenuType from '../middlewares/set-menu-type.js';

const router = express.Router();

router.get('/', controller.index);

router.get(
    '/preview',
    setMenuDate,
    setMenuType,
    controller.preview
);

export default router;
