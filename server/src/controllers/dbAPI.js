import axios from 'axios';
import { Videogame } from "../models/Videogame.js";
import { Genre } from "../models/Genre.js";

const key = process.env.API_KEY;

const getApiVideogames = async ()=>{
    try {
        const firstPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=1`);

        // const nextPage = await axios.get(firstPage.data.next)

        // const allGames = firstPage.data.results.concat(nextPage.data.results)

        const secondPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=2`);
        const thirdPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=3`);
        const fourthPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=4`);
        const fifthPage = await axios.get(`https://api.rawg.io/api/games?key=${key}&page=5`);
        
        let apiGames = firstPage.data.results.concat(
            secondPage.data.results,
            thirdPage.data.results,
            fourthPage.data.results,
            fifthPage.data.results
        );

        // const infoVideogames = await Promise.all(allGames.map(async(videogame)=>{
            let infoVideogames = apiGames.map((videogame) =>{
                
                return {
                    id:videogame.id,
                    name:videogame.name,
                    released:videogame.released,
                    rating:videogame.rating,
                    platforms:videogame.platforms.map((platform)=>platform.platform.name),
                    genre:videogame.genres.map((genre)=> genre.name),
                    image: videogame.background_image
    
                }
            });
                
        return infoVideogames;
    } catch (error) {
        return error.message;
    }
    
};

const getDbGames = async ()=>{
    try {
        return await  Videogame.findAll({
            include:[Genre],
            // attributes:['name']
        });
        
        // let responseGames = dbIncludesGame?.map(game=>{
        //     return{
        //     id:game.id,
        //     name: game.name,
        //     description: game.description, 
        //     released: game.released,
        //     rating: game.rating,
        //     platform : game.platform,
        //     image: game.background_image,
        //     genre:game.genres.map((genre)=> genre.name)
        //     }
        // })
    } catch (error) {
        return error.message
        
    }
     
};

export const putGame = async(
    name,
    description,
    rating,
    platforms,
    genre,
    image,
    released)=>{
        try {
            const game = await Videogame.findByPk(id)
            if (game) {
                await game.update({
                    name,
                    description,
                    rating,
                    platforms,
                    image,
                    released
                },
                {where:{id:id}})

                const genreDB = await Genre.findAll({
                    where:{
                        name:genre}
                })

                await game.setGenres([]);
                res.status(200).send('Videogame was successfully changed');
            }
            return { error: 'Videogame not found' };
        } catch (error) {
            return { error: error.message };
        }
    };

    export const GameById = async(id)=>{
        try {
            if(id.length === 36){
                const dbGame = await Videogame.findByPk(id, {
                    include: {
                        model: Genre,
                        attributes: ['name'],
                        through: {
                            attributes: []
                        }
                    }
                }) 
        
                if(dbGame) {
                    return dbGame
                   
                }else{
                    return { error: 'Videogame not found' }
                }
            }else{
                const apiGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${key}`)
                .then(res=>{
                    return {
                        name:res.data.name,
                        description: res.data.description,
                        released: res.data.released,
                        image: res.data.background_image,
                        rating: res.data.rating,
                        platforms: res.data.platforms.map(platform => platform.platform.name),
                        genres: res.data.genres.map(genre=>genre.name)
                    }
                })
                return apiGame
            }
        } catch (error) {
            return error.message;
        }
    };

    export const getApiAndDBGames = async ()=>{
    const apiInfo = await getApiVideogames();
    const dbInfo= await getDbGames();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
};

