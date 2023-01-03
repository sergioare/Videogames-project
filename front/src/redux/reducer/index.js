import { 
    GET_ALL_VIDEOGAMES, 
    SEARCH, 
    GET_DETAIL_VIDEOGAME,
    GET_GENRES,
    POST_VIDEOGAME,
    ORDER_BY_RATING,
    ORDER_BY_NAME,
    FILTER_BY_CREATED,
    FILTER_BY_GENRES,
    GET_PLATFORMS,
    DELETE_GAME,
 } from "../../utils"


const initialState = {
    showVideogames: [],
    videogames:[],
    videogameDetail:[],
    genreList: [],
    platforms:[],
    loading: true,

}

export default function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                showVideogames: action.payload,
                videogames: action.payload,
            }
        
        case SEARCH:
            return{
                ...state,
                videogames: action.payload
            }
        
        case GET_DETAIL_VIDEOGAME:
            return{
                ...state,
                videogameDetail: action.payload
            }
        
        case GET_GENRES:
            return{
                ...state,
                genreList: action.payload.map(genre=>genre.name)
            }
        
        case POST_VIDEOGAME:
            return{
                ...state,
                showVideogames: [...state.showVideogames, action.payload]
            }

        case DELETE_GAME:
            return{
                ...state
            }   
        
        case GET_PLATFORMS:
            return{
                ...state,
                platforms: action.payload
            }
        
        case FILTER_BY_GENRES:
            const filter = state.showVideogames

        
        case ORDER_BY_NAME:
            let filterName = action.payload === 'A-Z'
            ?state.videogames.sort((a,b)=>{
                if(a.name.toUpperCase() > b.name.toUpperCase()) return 1
                if(b.name.toUpperCase() > a.name.toUpperCase()) return -1
            
            return 0
            })
            :state.videogames.sort((a,b)=>{
                if(a.name.toUpperCase() > b.name.toUpperCase()) return -1
                if(a.name.toUpperCase() > b.name.toUpperCase()) return 1
            
            return 0
            })
            return{
                ...state,
                videogames:filterName
            }

        case ORDER_BY_RATING:
            let filterRating = action.payload === 'By Highest Score'
            ?state.videogames.sort((a,b)=> b.rating - a.rating)
            :state.videogames.sort((a,b)=> a.rating - b.rating)
            
            return {
                ...state,
                videogames: filterRating
            }
        
        case FILTER_BY_CREATED:
            let filterDB = action.payload === 'ALL'
            ?state.videogames
            :state.videogames.filter(game=>game.create === true)

            return {
                ...state,
                videogames: filterDB
            }
        default: 
            return state 
    }
}