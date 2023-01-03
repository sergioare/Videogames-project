import axios from 'axios'
import { 
    GET_ALL_VIDEOGAMES, 
    SEARCH, 
    GET_DETAIL_VIDEOGAME,
    POST_VIDEOGAME,
    GET_GENRES,
    ORDER_BY_RATING,
    ORDER_BY_NAME,
    FILTER_BY_CREATED,
    FILTER_BY_GENRES,
    GET_PLATFORMS,
    DELETE_GAME,
    urlBase,
    urlByName,
    urlGenres 
} from "../../utils"


export function getAllGames(){
    return async function (dispatch){
      axios.get(urlBase)
      .then(res=>
        dispatch({type:GET_ALL_VIDEOGAMES, payload: res.data}))
    }
}

export function getByName (name){
    return async function(dispatch){
        axios.get(`${urlByName}` + name)
        .then(res=>
          dispatch({type:SEARCH, payload: res.data}))
    }
}

export function getDetail (id){
    return async function(dispatch){
        axios.get(`${urlBase}/${id}`)
        .then(res=>
            dispatch({type:GET_DETAIL_VIDEOGAME, payload: res.data}))
    }
}

export function postVideogame (game){
    return async function(dispatch){
        axios.post(urlBase,game)
        .then(res=>
            dispatch({type:POST_VIDEOGAME, payload: res.data}))
        
    }
}

export function getGenres (){
    return async function (dispatch){
        axios.get(urlGenres)
        .then(res=>
            dispatch({type:GET_GENRES, payload: res.data}))
    }
}

export function getPlatforms(payload){
    return async function(dispatch){
        axios.get(urlBase)
        .then(res=>
            dispatch({type: GET_PLATFORMS, payload: res.data.map(platform=> platform.platforms)})
        
        
        )
    }
}
export function deleteGame(id){
    return async function(dispatch){
        axios.delete(`${urlBase}/${id}`)
        .then(res=>
            dispatch({type:DELETE_GAME, payload: res.data}))
    }
}

export function orderByRating(payload){
    return {
        type: ORDER_BY_RATING,
        payload,
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}
export function filterByGenres(payload){
    return {
        type: FILTER_BY_GENRES,
        payload,
    }
}

export function filterByCreated(payload){
    return{
        type: FILTER_BY_CREATED,
        payload,
    }
}
