import React from "react";
import { Link } from "react-router-dom";

import styles from './Header.module.css';

const Header = ({ isLoggedIn }) => {
  return (
    <nav className={styles.nav} data-testid="header">
      <div className={styles.logoContainer} data-testid="header-logo-container">
        <div className={styles.logo} data-testid="header-logo">
          <Link to={"/"}>
            <p>
              c<span className={styles.firstLetter}>h</span>a
              <span className={styles.thin}>o</span>
              <span className={styles.lastLetter}>s</span>
            </p>
          </Link>
        </div>
      </div>

      <div className={styles.linksContainer} data-testid="header-links-container">
        <ul className={styles.links} data-testid="header-links">
          {isLoggedIn ? (
            <>
              <li data-testid="create-test-link">
                <Link to="/create-test">створити тест</Link>
              </li>
              <li data-testid="more-tests-link">
                <Link to="/more-tests">більше тестів</Link>
              </li>
              <li data-testid="my-page-link">
                <Link to="/me">моя сторінка</Link>
              </li>
            </>
          ) : (
            <>
              <li data-testid="login-link">
                <Link to="/auth/register">увійти</Link>
              </li>
              <li data-testid="test-link">
                <Link to={`/tests/${process.env.MAIN_TEST_ID}`}>тест</Link>
              </li>
            </>
          )}
        </ul>        
      </div>
    </nav>
  );
};

export default Header;
