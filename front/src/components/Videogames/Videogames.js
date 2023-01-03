import { useEffect} from "react" // Similar to componentDidMount + componentDidUpdate:
import VideoGame from "../Videogame/Videogame"
import { getAllGames, getGenres } from "../../redux/actions/actions"
import {useSelector, useDispatch} from 'react-redux'
import { Link } from "react-router-dom"
import styles from './Videogames.module.css'


 function VideoGames (){
    const dispatch = useDispatch()
    const showVideogames = useSelector(state=> state.showVideogames)
    const videogameDetail = useSelector(state=> state.videogameDetail)
    const genreList = useSelector(state=>state.genreList)

   
    // You tell React that your component needs to do something after render.
    useEffect(()=>{
      dispatch(getAllGames())
      dispatch(getGenres())
    },[dispatch])

    return(
        <div>
           { 
            actualVideogame.map(({image, name, platforms, raiting, released, genres, id})=>{
                return(
                    <div className={styles.background} key={name}>
                        <Link to={'/videogames/' + id}>
                            <VideoGame
                            id={id} 
                            image={image}
                            name={name}
                            key={name}
                            platforms= {platforms}
                            raiting= {raiting}
                            released= {released}
                            genre={genres}                    
                            />
                        </Link>
                    </div>
                    )   
                })
            }
        </div>
    )
}

export default VideoGames

