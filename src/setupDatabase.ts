import mongoose from 'mongoose';
import Logger from 'bunyan';
import { config } from '@/config';
import { redisConnection } from '@shared/services/redis/redis.connection';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = async () => {
    try {
      await mongoose.connect(config.DATABASE_URL!, { family: 4 });

      log.info('Success connect to MongoDB database');

      await redisConnection.connect();

      log.info('Success connect to Redis database');
    } catch (error) {
      log.error('Fail to connect to database', error);
      return process.exit(1);
    }
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
