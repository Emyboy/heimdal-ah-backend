import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';

import {
  auth,
  profiles,
  user,
  password,
  twitterRouter,
  articles,
  comment,
  bookmarks,
  ratings,
  highlights,
  readStats,
  reports,
  likes,
  search,
  notifications,
  admin,
  replies
} from './routes';

import logger from './config/logger';
import passportAuth from './config/passportAuth';
import events from './events';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', auth);
app.use('/api/v1/auth_twitter', twitterRouter);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/password', password);
app.use('/api/v1/users', user);
app.use('/api/v1/users', notifications);
app.use('/api/v1/articles', articles);
app.use('/api/v1/articles', bookmarks);
app.use('/api/v1/articles', reports);
app.use('/api/v1/articles', comment);
app.use('/api/v1/articles_search', search);
app.use('/api/v1/ratings', ratings);
app.use('/api/v1/articles', highlights);
app.use('/api/v1/users', readStats);
app.use('/api/v1/articles', likes);
app.use('/api/v1/admin', admin);
app.use('/api/v1/comments', replies);
passportAuth();


// Default to here when an invalid endpoint is entered

app.use('/*', (req, res) => res.status(404).json({ message: 'This endpoint does not exist' }));

const server = app.listen(PORT, () => {
  logger.log(`connected on port ${PORT}`);
  events.start(server);
});

export default app;
