import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';


export default function LandingPage() {
  return (
    <div className={styles.content}>
      <div className={styles.quoteContinent}>
      	<h1 className={styles.title}>COUNTRIES</h1>
      	<h2 className={styles.quote}>“The world is a book and those who do not travel read only one page...”</h2>
        
      </div>
      <div className={styles.banner}>
        <Link to='/home'>
          <button className={styles.btn}>START JOURNEY</button>
        </Link>
      </div>

      
      
    </div>
  )
}