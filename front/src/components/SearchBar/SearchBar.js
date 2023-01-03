import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { getByName } from '../../redux/actions/actions'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    const handleInputChange= event =>{
        event.preventDefault()
        setSearch(event.target.value)
    }

    const handleSubmit = event =>{
        event.preventDefault()
        dispatch(getByName(search))
        setSearch('')
    }

    return (
        <div className={styles.container}>

            <input 
            className={styles.search}
            type='text'
            placeholder='Search your favorite Videogame'
            value={search}
            onChange={event=> handleInputChange(event)}
            />
            
            <button 
                className={styles.btn}
                type='submit'
                onClick={event=>handleSubmit(event)}
            >
            <i class='fa-duotone fa-magnifying-glass'/>
            </button>
        </div>
    );
};

export default SearchBar;