import winston from 'winston';
import path from 'path';

const logPath = path.join(new URL('.', import.meta.url).pathname, '../logs');

//Custom formats

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: path.join(logPath, 'combined.log'),
        }),
    ],
});

// In dev, also log to console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;