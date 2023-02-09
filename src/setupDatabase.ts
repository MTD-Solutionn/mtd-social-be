import mongoose from 'mongoose';

export default () => {
  const connect = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/chatty');
      console.log('Success connect to database');
    } catch (error) {
      console.log('Fail to connect to database', error);
      return process.exit(1);
    }
  };
  connect();
  mongoose.connection.on('disconnected', connect);
};
