import React from 'react';
import styles from './projectCard.module.css'

function ProjCard ({image, name, description, price}){
    return(
        <>
            <div className={styles.allCard}>
                <img src={image} alt=''/>
                <div className={styles.descWrapper}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.text}>{description}</div>
                </div>
                <div className={styles.priceColumn}>
                    <label className={styles.priceLabel}>Preço</label>
                    <div className={styles.price}><span className={styles.purpleText}>{price}</span> ONE</div>
                    <button className={styles.button}> Comprar </button>
                </div>
            </div>
        </>
    );
}

export default ProjCard;