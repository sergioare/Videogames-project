import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const Landing = () => {
    return (
        <div>

            <div className={styles.left}>
                <video src= '../../../assets/Assassin_video.mp4' autoplay="true" muted="false" loop="true" poster='../../../assets/Assassin_image.png'></video>
            </div>
    
            <div className={styles.right}>
                <div className={styles.rside}>
                    <div className={styles.containerText}>
                            
                        <h1> ¿Ready to get the bestof you with us? </h1>
                        <p>
                        #READYPLAYER
                        </p>
                
                    <div className={styles.description}>
                        <p>
                        We believe in a world of fast and better changes, for this reason we give you the best Videogames you can get.
                        </p>
                        <p>
                        Only if you dare, get closer to imagination and fantasy.
                        </p>
                        <div className={styles.socialmedia}>
                        <i class='fa-brands fa-facebook'/>
                        <i class='fa-brands fa-discord'/>
                        <i className='fa-brands fa-twitch'/>
                        <i class='fa-brands fa-mixer'/>
                    </div>
                </div>
                <div className={styles.border}>
                    <Link to="/videogames" className={styles.button}>
                    BECOME A CHALLENGER
                    </Link> 
                </div>
                </div>
            </div>
            </div>
        
        </div>
    );
};

export default Landing;