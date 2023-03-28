import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Country.module.css';

export default function Country({flag, name, region, id}){
	return(
		
			<div className={styles.card}>
				<img className={styles.image} src={flag} alt='flag not found' width='200px' height='200px' />
				<h3 className={styles.title}>{name}</h3>
				<h4 className={styles.item}>{region}</h4>
				<a className={styles.link} href={`/home/${id}`}>See Country Details</a>
			</div>
		
		
	);
};