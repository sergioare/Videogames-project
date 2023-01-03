import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { sequelize} from './db/db.js';
import gameRoutes from './routes/games_routes.js';
import genresRoutes from './routes/genres_routes.js';

import "./models/Videogame.js";
import "./models/Genre.js";

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(cookieParser());

server.use(gameRoutes);
server.use(genresRoutes);

// server.use('/', routes);

(async function seqSync(){
  try {
    sequelize
      .sync()
      .then(() => {
        console.log('Postgres sync has been established successfully.')
      })
  } catch (error) {
    console.error('Unable to sync to the database:', error)
  }
})();
  
export default server;