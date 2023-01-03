import {useState} from 'react'
import styles from './Filter.module.css'


const Filter = ({filterName, filterOrder, filterFunction}) => {
    const [enabled, setEnabled] = useState(false)
    
    const handleSelectClick = event =>{
        event.preventDefault()
        filterFunction(event)
        setEnabled(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.select}>
                <div 
                className={styles.btn} 
                onClick={event => 
                    setEnabled(!enabled)}
                >
                {filterName}
                </div>

                {enabled &&(<div className={styles.options}>
                    {filterOrder.map((optionSelected, index)=>(
                        <input
                            className={styles.option}
                            type='button'
                            key={index}
                            value={optionSelected}
                            onClick={handleSelectClick}
                        />
                    ))}
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Filter;

// <i class="fa-duotone fa-grid-2-plus"></i>
// <i class="fa-duotone fa-arrow-up-z-a"></i>

