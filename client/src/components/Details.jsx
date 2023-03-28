import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryById } from '../actions';
import { Link } from 'react-router-dom';
import styles from './Details.module.css';

export default function Details(props){
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCountryById(props.match.params.id));
	},[dispatch]);

	const country = useSelector((state) => state.details);

	return(
		<div className={styles.content}>
			<img className={styles.flag} src={country.flag} alt={country.name}/>
			<h1 className={styles.title}>{country.name}</h1>
			<h2 className={styles.id}>#{country.id}</h2>
			<h2 className={styles.region}>{country.region}</h2>
			<h2 className={styles.subregion}>{country.subregion}</h2>
			<h2 className={styles.area}>Area: {country.area} km&#178;</h2>
			<h2 className={styles.pop}>Population: {country.population}</h2>
			
			<ul>
				{
					country.activities?.map( a => {
						return(
							<li className={styles.acti}>
								<h2>{a.name}</h2>
								<div className={styles.items}>
									<h3>Difficulty: {a.difficulty}</h3>
									<h3>Duration: {a.duration} hours</h3>
									<h3>Season: {a.season}</h3>
									<h3>Equipment: {a.equipment}</h3>

								</div>
							</li>
						)
					})
				}
			</ul>
			<Link to='/home'><a className={styles.back}>Back to Home</a></Link>
		</div>
	)
}