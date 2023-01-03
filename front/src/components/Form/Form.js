import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getGenres, postVideogame, getPlatforms } from '../../redux/actions/actions.js';
import styles from './Form.module.css'

const validate = (input) => {
    let errors = {};

        if(!input.name) {
            errors.name = 'Name is required'

        }else if(input.name.length > 36){
            errors.name = 'Videogame´s name is too long'
        }
        else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
            errors.name = 'Name may contain only letters, numbers and the dash characters'
        }


        if(!input.description) {
          errors.description = 'Description is required';
        } else if (input.description.length > 500) {
          errors.description = 'Description may contain max 500 characters'
        }
            
        
        if(!input.released){
            errors.released = 'Videogame require a released'
        }
        

        if(!input.rating) {
            errors.rating = 'Rating is required'
        } else if(input.rating > 5) {
            errors.rating = 'Rating cannot be higher than 5'
        } else if(input.rating < 0) {
            errors.rating = 'Rating cannot be lower than 0'
        }

        
        if(!input.platforms){
            errors.platforms = 'Videogame must containt at least one platform'
        }
        
        if(!input.image.length || !/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)/.test(input.image)
        ){
          errors.image='Invalid URL, must contain(png, gif, jpg...) format'
        }

        if(!input.genres){
            errors.genres ='Videogame must containt at least one genre'
        }

    return errors;
}


const Form = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const platforms = useSelector(state=> state.platforms)
    const genreList = useSelector(state=>state.genreList)
    const showVideogames = useSelector(state=> state.showVideogames)


    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: [],
   })

   const [errors, setErrors] = useState({})

   useEffect(()=>{
    dispatch(getGenres())
    dispatch(getPlatforms())
   },[dispatch])


   const handleChange = event =>{
    setInput({
        ...input,
        [event.target.name]: event.target.value,
        })

    setErrors(
        validate({
            ...input,
            [event.target.name]: event.target.value, 
             })
    )
  }

  
  const handleGenreChange = event =>{
    setInput({
        ...input,
        genres:[...new Set([ ...input.genres, event.target.value]) ]
    })
  }

  const handleDeleteGenre = event =>{
    setInput({
        ...input,
        genres: input.genres.filter(genre=> genre !== event)
    })
  }

    
  const handlePlatformChange = event =>{
    setInput({
        ...input,
        platforms:[...new Set([ ...input.platforms, event.target.value])]
    })
  }

  const handleDeletePlatform = event =>{
    setInput({
        ...input,
        platforms: input.platforms.filter(platform => platform !== event)
    })
  }


  const handleSubmit = event =>{
    event.preventDefault()
    let repeat = showVideogames.filter(name=> name.name === input.name)

        if(repeat.length){
            alert('A record already exist with this name')
            errors.name = 'A videogame already exist with this name'
        }else{
           let someError = Object.keys(validate(input))
            if(someError.length) alert('Please, you need to fill in all the required fields ')
            else{
               dispatch(postVideogame(input))
               alert('Videogame was created successfully') 

               setInput({
                    name: "",
                    description: "",
                    released: "",
                    rating: "",
                    platforms: [],
                    image: "",
                    genres: [],
               })
               navigate.push('/videogames')
            } 
        }

  }

    return (
        <div className={styles.background}>
            <Link className={styles.back} to='/videogames'>
            <i className='fa-solid fa-circle-arrow-left' /> BACK TO HOME
            </Link>
            <div className={styles.createBox}>
                <div className={styles.createVideogame}>
                <h2>JOIN TO CREATE A NEW VIDEOGAME</h2>
                <i className='fa-solid fa-gamepad'/>
                </div>

                <form className={styles.form} onSubmit={event=> handleSubmit(event)}>

                    <div className={styles.dataBox}>
                        <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        value={input.name} 
                        onChange={event=>handleChange(event)} 
                        required/>

                        <label for='name'>Videogame name:</label>
                        {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                    </div>


                    <div className={styles.dataBox}>
                        <textarea 
                            type='text'
                            name='description'
                            id='description'
                            value={input.description}
                            onChange={(event) => handleChange(event)}
                            required/>

                            <label for='description'>Videogame description</label>
                        {errors.description && (<p className={styles.error}>{errors.description}</p>)}
                    </div>


                    <div className={styles.dataBox}>
                        <input 
                        type='date' 
                        name='released' 
                        id='released' 
                        placeholder='dd-mm-yyyy'
                        value={input.released} 
                        onChange={event=>handleChange(event)} 
                        required/>

                        <label for='released'>Release at:</label>
                        {errors.released && (<p className={styles.error}>{errors.released}</p>)}
                    </div>


                    <div className={styles.dataBox}>
                        <input 
                        type='number' 
                        name='rating' 
                        id='rating'
                        placeholder='0 to 5,max 2 decimals' 
                        value={input.rating} 
                        onChange={event=>handleChange(event)} 
                        required/>

                        <label for='rating'>Videogame Rating:</label>
                        {errors.name && (<p className={styles.error}>{errors.rating}</p>)}
                    </div>


                    <div className={styles.dataBox}>
                        <label for='platforms'>Videogame platforms:</label>
                        <select 
                        name='platforms' 
                        id='platforms' 
                        onChange={event=>handlePlatformChange(event)} 
                        required>

                            <option value="select-platform">---Select Platforms---</option>
                            {platforms?.map((platform, index)=>{
                                return(
                                    <option key={index} value={platform}>{platform}</option>
                                )
                            })}
                        </select>
                        {input.platforms.map(platform=>(
                            <ul>
                                <li>{platform}</li>
                                <button
                                    onClick={()=>handleDeletePlatform(platform)}
                                    key={platform.id}
                                    id={platform.id}
                                    value={platform.name}>
                                    <span>Delete</span>
                                </button> 
                            </ul>
                        ))}
                        {errors.platforms && (<p className={styles.error}>{errors.platforms}</p>)}
                    </div>


                    <div className={styles.dataBox}>
                        <input 
                        type='text' 
                        name='image' 
                        id='image'
                        value={input.image} 
                        onChange={event=>handleChange(event)} 
                        required/>

                        <label for='image'>URL videogame image:</label>
                        {errors.image && (<p className={styles.error}>{errors.image}</p>)}
                    </div>


                    <div className={styles.dataBox}>
                        <label for='genres'>Videogame genres:</label>
                        <select 
                        name='genres' 
                        id='genres' 
                        onChange={event=>handleGenreChange(event)} 
                        required>

                            <option value="select-genres">---Select Genres---</option>
                            {genreList?.map((genre, index)=>{
                                return(
                                    <option key={index} value={genre}>{genre}</option>
                                )
                            })}
                        </select>
                        {input.genres.map(genre=>(
                            <ul>
                                <li>{genre}</li>
                                <button
                                    onClick={()=>handleDeleteGenre(genre)}
                                    key={genre.id}
                                    id={genre.id}
                                    value={genre.name}>
                                    <span>Delete</span>
                                </button> 
                            </ul>
                        ))}
                        {errors.genres && (<p className={styles.error}>{errors.genres}</p>)}
                    </div>
                    
                       
                    {Object.keys(errors).length 
                    
                    ? (<div className={styles.submit}>
                        
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                        <input 
                            type='submit'
                            value='Send Form'
                            disabled/>

                            

                       </div>) 

                    : (<div className={styles.submit}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        
                        <input 
                            type='submit'
                            value='Send Form'/>


                        </div>)}

                </form>
            </div>
                
        </div>
    );
};

export default Form;