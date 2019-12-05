
const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;
