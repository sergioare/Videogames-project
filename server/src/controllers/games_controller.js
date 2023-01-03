import axios from 'axios';
import express from 'express';
import { Genre } from '../models/Genre.js';
import { Videogame } from '../models/Videogame.js';
import {
    getApiAndDBGames, 
    putGame, 
    GameById} from './dbAPI.js';
const {API_KEY} = process.env;

export const getAllVideogames = async (req, res) => {
    const { name } = req.query;
    try {
        const allinfo = await getApiAndDBGames();

        if (name) {
            const getByName = allinfo.filter((element) => {
                element.name.toLowerCase().includes(name.toLowerCase())
            });
            getByName.length
                ? res.status(200).json(getByName.splice(0, 14))
                : res.status(404).json({ message: 'VideoGame Not Found' });
        } else {
            res.status(200).json(allinfo);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

export const getGameById = async (req, res)=>{
    const {id} = req.params
    try {
       if(id.includes("-")){
        const gameInDB = await Videogame.findOne({
            where: {id},
            include: [Genre],
        });
        return res.json(gameInDB);
       }
       const  gameFromAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
       res.json(gameFromAPI.data);
    } catch (error) {
        res.status(500).json({message: "Id not found"});
        
    }
};

export const createGame = async (req, res)=>{
    try {
        let{
            name,
            description,
            rating,
            platforms,
            genre,
            image,
            released
        }= req.body

        let newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating: rating || 3,
            platforms,
            image,
        });

        let genreDB= await Genre.findAll({
            where: {name: genre},
        });

        newVideogame.addGenres(genreDB);
        res.status(200).send('Videogame was created successfully');
    } catch (error) {
        res.status(400).send({ error: error.message });
        
    }
}
export const updateGame = async (req, res)=>{
    const {id} =req.params;
    const{name,
        description,
        rating,
        platforms,
        genre,
        image,
        released
    }= req.body;
    try {
        const game = await putGame(id, name,description, rating, platforms, genre, image, released)
        if(game){
            res.status(200).json(game);
        }else{
            return res.status(404).json({ message: 'Videogame not found' });
        }

    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}
export const deleteGame = async (req, res)=>{
    const {id} = req.params;
    try {
      const game = await GameById(id);
      if(game){
        await game.destroy();
        return res.status(200).send('Videogame was removed correctly');
      }else{
        return res.status(404).json({ message: 'Videogame not found' });
      }
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}
