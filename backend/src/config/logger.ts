import bunyan from 'bunyan';

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const logger = bunyan.createLogger({
  name: 'duty-app',
  level,
  serializers: bunyan.stdSerializers,
})

export default logger;