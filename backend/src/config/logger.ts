import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'duty-app',
  level: 'info',
  serializers: bunyan.stdSerializers,
})

export default logger;