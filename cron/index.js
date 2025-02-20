const cron = require('node-cron');
const { sendQuotes } = require('./sendQuotes');

if (process.env.NODE_ENV !== 'test') {
  cron.schedule("0 */6 * * *", sendQuotes);
}

module.exports = cron;