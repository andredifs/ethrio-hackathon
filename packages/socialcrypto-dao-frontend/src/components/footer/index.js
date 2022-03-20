import React from 'react';
import styles from './footer.module.css'
import {Link} from 'react-router-dom'

function Footer (){
    return(
        <>
            <footer className={styles.allFooter}>
                <div className={styles.logo}>
                    <div>social</div>
                    <div>crypto</div>
                    <div>.art</div>
                </div>
                <div className={styles.contacts}>
                    <div className={styles.rows}>
                        <div className={styles.linkContainer}><a className={styles.footerLink} href=' https://wa.me/5535991144451'>fale conosco</a></div>
                        <div className={styles.linkContainer}><a className={styles.footerLink} href=' https://wa.me/5535991144451'>nossos artistas</a></div>
                    </div>
                    <div className={styles.rows}>
                        <div className={styles.linkContainer}>
                            <Link className={styles.footerLink} to="/projects">
                                projetos
                            </Link>
                        </div>
                        <div className={styles.linkContainer}>
                            <Link className={styles.footerLink} to="/mint">
                                lance sua coleção
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;