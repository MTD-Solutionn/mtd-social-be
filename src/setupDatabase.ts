import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from './config';

const log: Logger = config.createLogger('setupDatabase');
console.log('src/setupDatabase.ts');

export default () => {
  const connect = async () => {
    try {
      await mongoose.connect(config.DATABASE_URL!);
      log.info('Success connect to database');
    } catch (error) {
      log.error('Fail to connect to database', error);
      return process.exit(1);
    }
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
