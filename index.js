const express = require('express');
const app = express();
const port = 8000;
const {traceIdContext, setTraceId} = require('./traceId');
const logger = require('./logger');

app.use(traceIdContext);
app.use(setTraceId);

app.use((_req, _res, next) => {
  logger('middleware1');
  next();
});

app.use(async(_req, _res, next) => {
  const wait = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        logger('setTimeout');
        resolve();
      }, time * 1000);
    })
  }
  logger('middleware2');
  await wait(2);
  next();
});

app.use('/', (_req, res, next) => {
  res.status(200).json({message: "success"});
  next();
})

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message);
  res.status(statusCode).json({message: "Server Error"});
})

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
})