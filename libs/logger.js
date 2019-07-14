require('dotenv').config();
const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = process.env.LOG_PATH;

const filename = path.join(logDir, 'results.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD'
})

const logger = createLogger({
  level: 'verbose',
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    }),
    new transports.File({
      filename,
      format: format.combine(
        format.label({ label: path.basename(process.mainModule.filename) }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
          info =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});

module.exports = logger;
