import winston from 'winston';

const logger = new winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    ],
    exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;
