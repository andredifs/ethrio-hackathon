import React from 'react';
import styles from './home.module.css'
import { Link } from 'react-router-dom'
import ArtistCard from '../../components/artistCard/index'

function Home (){
    return(
        <>
            <div className={styles.allWindow}>
                <div className={styles.textContent}>
                    <div className={styles.title}>socialcrypto.art</div>
                    <div className={styles.description}>
                        Dê protagonismo a artistas periféricos e apoie ações sociais de impacto através da arte e tenocnologia.
                    </div>
                    <div className={styles.buttonRow}>
                        <button className={styles.button}><a href='http://olerj.camara.leg.br/retratos-da-intervencao/favelas-cariocas' target="_blank">Nossas Comunidades</a></button>
                        <button className={styles.button2}><a href='https://nftmaster.com.br/?ref=S68237767G&gclid=CjwKCAjwoduRBhA4EiwACL5RPyatUayMY2Lue8-WngCmiB2lwY3l1RwCnaeTszX4dbNP6gDONzP_4xoCzycQAvD_BwE' target="_blank">Aprenda sobre NFTs</a></button>
                    </div>
                </div>
            </div>
            <div className={styles.diferenceWindow}>
                <img className={styles.pic1} src='circles.png' alt=''/>
                <img className={styles.pic2} src='circles.png' alt=''/>
                <img className={styles.pic3} src='circles.png' alt=''/>
                <img className={styles.pic4} src='triangles.png' alt=''/>
                <img className={styles.pic5} src='triangles.png' alt=''/>
                <div className={styles.textWrapper}>
                    <div className={styles.title2}>Você <span className={styles.purpleText}>pode</span> fazer a diferença</div>
                    <div className={styles.description2}>
                        Através dos NFTs, participe de organizações descentralizadas e ajude a transformar  realidades sociais de vulnerabilidade.
                    </div>
                </div>
                <div className={styles.redirectLink}><Link className={styles.redirectText} to="/projects">Conheça nossos Projetos</Link></div>
            </div>
            <div className={styles.nftWindow}>
                <div className={styles.rowInfo}>
                   <div>
                        <img className={styles.menor} src='menor.gif' alt=''/>
                   </div>
                    <div>
                        <div className={styles.title3}>Sinta.</div>
                        <div className={styles.title3}>Inspire.</div>
                        <div className={styles.title3}>Transfome.</div>
                        <div className={styles.description}>Exibindo a  realidade em arte e Transformando-a através da tecnologia.</div>
                        <div className={styles.redirect2}><Link className={styles.redirectText2} to="/mint">Publique sua nft</Link></div>
                    </div>
                    
                </div>
                
            </div>
            <div className={styles.artistsWindow}>
                <div className={styles.title4}>Alguns de nossos <span className={styles.purpleText}>artistas:</span></div>
                <div className={styles.rowInfo}>
                    <ArtistCard
                        image="art1.png"
                        name="cas.candido"
                    />
                    <ArtistCard
                        image="art2.png"
                        name="Rxbisco.ttk"
                    />
                    <ArtistCard
                        image="art3.png"
                        name="geancg"
                    />
                    <ArtistCard
                        image="art4.png"
                        name="louquai"
                    />
                </div>
            </div>
        </>
    );
}

export default Home;