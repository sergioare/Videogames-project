import express  from "express"
import {Genre} from '../models/Genre.js'
import { GENRES_NAME } from "./types.js"
import axios from "axios"
const {API_KEY} = process.env

 export const getGenres = async (req, res)=>{
    try {
      
        const genreAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresNames = genreAPI.data.results;

        genresNames.forEach(async (element) => {
            await Genre.findOrCreate({
                where: {
                    name: element.name
                }
            })
        });

        const allGenres = await Genre.findAll();
        res.status(200).json(allGenres)

    //    await Genre.findAll()
    //         .then((response)=>{
    //             if(response.length > 0){
    //                 res.status(200).json(response)
    //             }else{
    //                 Genre.bulkCreate(GENRES_NAME)
    //                 .then((response)=>{
    //                 res.status(200).json(response)
    //                 })
    //             }
    //         })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

