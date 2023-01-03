import { DataTypes } from 'sequelize';
import {sequelize} from '../db/db.js';
import {Videogame} from './Videogame.js';
// Define the model (Genre) to initialized in our DB "VideoGames"

export const Genre = sequelize.define('genre',{

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  }

);
    
         
Videogame.belongsToMany(Genre, {through: 'videogame_genre'});
Genre.belongsToMany(Videogame, {through: 'videogame_genre'});