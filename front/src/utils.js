//ACTIONS TYPES
export const GET_ALL_VIDEOGAMES = 'GET_ALL'
export const SEARCH = 'SEARCH'
export const GET_DETAIL_VIDEOGAME = 'DETAIL'
export const GET_GENRES = 'GET_GENRES'
export const POST_VIDEOGAME = 'POST_VIDEOGAME'
export const ORDER_BY_RATING = 'SORT_BY_RATING'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const FILTER_BY_CREATED = 'ORDER_BY_CREATED'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const GET_PLATFORMS = 'GET_PLATFORMS'
export const DELETE_GAME = 'DELETE_GAME'

//URLS API

export const urlBase = 'http://localhost:3001/videogames'
export const urlByName ='http://localhost:3001/videogames?name='
export const urlGenres = 'http://localhost:3001/genres'