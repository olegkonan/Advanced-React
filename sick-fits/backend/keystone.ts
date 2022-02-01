import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone';

console.log(process.env.DATABASE_URL);
const sessionConfig = {
  maxAge: 30 * 24 * 60 * 60,
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
  },
  lists: createSchema({
    User,
  }),
  ui: {
    isAccessAllowed: () => true,
  },
});
