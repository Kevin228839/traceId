const cls = require('cls-hooked');
const myNamespace = cls.createNamespace('my-namespace');
const { v4: uuidv4 } = require('uuid');

const traceIdContext = (_req, _res, next) => {
  myNamespace.run(() => next());
}

const setTraceId = (req, res, next) => {
  const existingTraceId = req.header('X-Trace-Id');
  const traceId = existingTraceId || uuidv4();
  myNamespace.set('traceId', traceId);
  res.setHeader('X-Trace-Id', traceId);
  next();
}

const getTraceId = () => {
  return myNamespace.get('traceId');
}

module.exports = {
  traceIdContext,
  setTraceId,
  getTraceId
}