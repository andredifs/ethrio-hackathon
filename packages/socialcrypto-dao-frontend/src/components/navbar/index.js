import styles from "./navbar.module.css";
import { Link } from "react-router-dom";
import { Mainnet, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { getMarketContract, getTokenContract } from "./api/blockchainService";


export default function NavBar() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const userBalance = useEtherBalance(account)
  
    return (
      <div className={styles.all}>
        <div className={styles.navbar}>
          <h1 className={styles.title}>
            <Link className={styles.navbarLink} to="/">
                <img src="/logo.png" width={140} height={70} quality={100} alt="" priority={true}></img>
            </Link>
          </h1>
          <nav>
            <ul className={styles.list}>
              <li>
                  <Link className={styles.navbarLink} to="/projects">
                    <div className={styles.link}>Projetos e comunidades</div>
                  </Link>
              </li>
              <li>
                  <Link className={styles.navbarLink} to="/mint">
                    <div className={styles.link}>Lance sua nft</div>
                  </Link>
              </li>
              <li>
                {!account && <button className={styles.button} onClick={activateBrowserWallet}> Conecte sua Wallet </button>}
                {account && <button className={styles.button} onClick={deactivate}> Disconnect </button>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
