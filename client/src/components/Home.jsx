import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, sortByName, sortByPopulation, filterByContinent, getActivities, filterByActivity } from '../actions';
import Country from './Country';
import Paged from './Paged';
import Nav from './Nav';
import styles from './Home.module.css';

export default function Home(){
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.countries);
	
	const [currentPage, setCurrentPage] = useState(1);
	const [countriesPerPage, setCountriesPerPage] = useState(10);
	const indexOfLastCountry = currentPage * countriesPerPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
	const currentCountries = allCountries.slice(
    	(currentPage === 1 ? indexOfFirstCountry : indexOfFirstCountry - 1),
    	indexOfLastCountry - 1);
	const [order, setOrder] = useState('');

	const paged = (pageNumber) => {
		setCurrentPage(pageNumber)
	};

	useEffect(()=>{
		dispatch(getCountries())
		dispatch(getActivities())
	},[dispatch])

	

	return(
			<div className={styles.content}>
				<Nav />
				<div className={styles.elementos}>
				<Paged 
				countriesPerPage={countriesPerPage} 
				allCountries={allCountries.length}
				paged={paged}
				/>
				<ul className={styles.countriesCards}>
				{
					currentCountries?.map( c => {
						return (
							<fragment>
								<Country name={c.name.toUpperCase()} region={c.region} flag={c.flag} key={c.id} id={c.id} />
							</fragment>
						)
					})
				}
				</ul>
				</div>
			</div>
			)
		}