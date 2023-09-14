const winston = require('winston');

module.exports = winston.createLogger({
  exitOnError: false,
  handleExceptions: true,
  handleRejections: true,
  transports: [
    new winston.transports.File({
      filename: 'logs/all.log',
    }),
    new winston.transports.File({
      level: 'error',
      format: winston.format.combine(
        winston.format.label({ label: process.env.NODE_ENV }),
        winston.format.timestamp(),
        winston.format.printf(
          ({
            level, message, label, timestamp,
          }) => `${timestamp} [${label}] ${level}: ${message}`,
        ),
      ),
      filename: 'logs/error.log',
    }),
  ],
});
