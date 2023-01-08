import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar.js'
import Filter from '../Filter/Filter.js'
import Loading from '../Loading/Loading.js'
import Videogames from '../Videogames/Videogames.js'
import { Link } from 'react-router-dom'
import headerImage from '../../assets/header.png'
import { 
    orderByRating,
    orderByName,
    filterByGenres,
    filterByCreated
 } from '../../redux/actions/actions.js'
import styles from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch()

    const allVideogames = useSelector(state=>state.videogames)
    const allGenres = useSelector(state=>state.genreList)
    const loading = useSelector(state=>state.loading)

    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)

    const lastVideogameIndex = currentPage * videogamesPerPage
    const firstVideogameIndex = lastVideogameIndex - videogamesPerPage

    const actualVideogame = allVideogames.slice(firstVideogameIndex, lastVideogameIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

        if(allVideogames.length !== 0){
            loading= false
        }

    const pageNumbers =[]

        for(let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage);i++)
        pageNumbers.push(i)

    const handlePrevPage= ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
        }
    }

    const handleNextPage = () =>{
        if(currentPage < pageNumbers.length){
            setCurrentPage(currentPage + 1)
        }
    }

    const handleOrderByRating = event =>{
        event.preventDefault()
        dispatch(orderByRating(event.target.value))
        setCurrentPage(1)
        setOrder(`Sorted ${event.target.value}`) //let render page again
    }

    const handleOrderByName = event =>{
        event.preventDefault()
        dispatch(orderByName(event.target.value))
        setCurrentPage(1)
        setOrder(`Sorted ${event.target.value}`)
    }

    const handleFilterByGenres = event =>{
        event.preventDefault()
        dispatch(filterByGenres(event.target.value))
        setCurrentPage(1)
        setOrder(`Sorted ${event.target.value}`)
    }

    const handleFilterByCreated = event =>{
        event.preventDefault()
        dispatch(filterByCreated(event.target.value))
        setCurrentPage(1)
        setOrder(`Sorted ${event.target.value}`)
    }

    const aToZ = ['A-Z', 'Z-A']
    const ratingSelect = ['By Lowest Score', 'By Highest Score']
    const gameStore = ['ALL', 'Created in Database']


    return (
        <div className={styles.container}>

            <div className={styles.search}>
                <SearchBar />
            </div>

            <div className={styles.wrapper}>

                <div className={styles.navBar}>
                    <Filter
                        filterName={'Alphabetical Order'}
                        filterOrder={aToZ}
                        filterFunction={handleOrderByName}
                    />
                    <Filter
                        filterName={'Order by Rating'}
                        filterOrder={ratingSelect}
                        filterFunction={handleOrderByRating}
                    />
                    <Filter
                        filterName={'Show all Genres'}
                        filterOrder={allGenres}
                        filterFunction={handleFilterByGenres}
                    />
                    <Filter
                        filterName={'Videogames Store '}
                        filterOrder={gameStore}
                        filterFunction={handleFilterByCreated}
                    />
                </div>


                
                <div className={styles.home}>

                    <div className={styles.header}>

                        <img 
                            className={styles.headerImage} 
                            src={headerImage}
                            alt='background header'
                        />

                        <h1>VIDEOGAMES HOME</h1>
    
                    </div>

                    <div className={styles.body}>
                        <h2>All Games</h2>
                        <Link 
                            to={'/create'} 
                            className={styles.btn}>
                                CREATE A VIDEOGAME
                        </Link>

                        <div className={styles.paginate}>
                            <ul className={styles.pageNumbers}>
                                
                                <li>
                                    <button 
                                        onClick={handlePrevPage}>
                                        <i className='fa-solid fa-square-arrow-left'/>  
                                    </button>
                                </li>

                                {pageNumbers.map((number, index)=>(
                                    <li 
                                        key={index}
                                        id={number}
                                        onClick={()=>paginate(number)}
                                        className={
                                            currentPage === number
                                            ?styles.active
                                            :null
                                        }
                                    >
                                        {number}
                                    </li>
                                ))}

                                <li>
                                    <button 
                                        onClick={handleNextPage}>
                                        <i className='fa-solid fa-square-arrow-right'/> 
                                    </button>
                                </li>

                            </ul>
                        </div>

                        <div className={styles.containerGames}>
                            { loading
                                ? <Loading />
                                : <Videogames  
                                    actualVideogame={actualVideogame}/>                             
                            }
                        </div>

                    </div>

                
                </div>

            </div>
            

            
        </div>
    );
};

export default Home;

//listgames = videogames
//videogamesF = showVideogames 

//videogames = videogames
//allVideogames = showVideogames
