import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import createError from 'http-errors';
import logger from './utils/winston.js';
import menuRouter from './routes/menu.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Load third party middleware.
app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Load menu routes.
app.use('/', menuRouter);

// Handle page not found.
app.use((req, res, next) => {
    next(createError(404));
});

// Handle all errors.
app.use((err, req, res, next) => {
    logger.error(`${req.method} - ${err.message} - ${err.stack}  - ${req.originalUrl} - ${req.ip}`);

    let error = req.app.get('env') === 'production'
        ? `${err.name}: ${err.message}`
        : err.stack;

    res.status(err.status || 500)
        .send(`<pre>${error}</pre>`);
});

export default app;
