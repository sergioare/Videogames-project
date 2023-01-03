import styles from './Videogame.module.css'

 function VideoGame({image, name, platforms, raiting, released, genres, id}){
     
    return(
        <div 
            id={id} 
            key={name}
            className={styles.container}>
            
            <img loading="lazy" src={image} alt="Videogame Image"/>
            <div className={styles.card}>
                <h2>{name}</h2>
                <div>{platforms.join('-')}</div>
                <p><strong>Raiting:</strong>{raiting}</p>
                <p><strong>Released:</strong>{released}</p>
                <p><strong>Genre:</strong>{genres.join('-')}</p>
            </div>
        </div>
    )
}
export default VideoGame