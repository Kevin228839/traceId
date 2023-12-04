const {getTraceId} = require('./traceId')

const logger = (f) => {
  const traceId = getTraceId();
  console.log(`${f}, ${traceId}`);
}

module.exports = logger