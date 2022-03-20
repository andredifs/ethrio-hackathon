import React from 'react';
import styles from './artist.module.css'

function ArtistCard ({image, name}){
    return(
        <>
            <div className={styles.allCard}>
                <img src={image} alt=''/>
                <div className={styles.text}>{name}</div>
            </div>
        </>
    );
}

export default ArtistCard;