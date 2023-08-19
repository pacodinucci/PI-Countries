import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, sortByName, sortByPopulation, filterByContinent, getActivities, filterByActivity } from '../actions';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './Nav.module.css';

function Nav() {
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);
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

    function handleClick(e){
		e.preventDefault();
		dispatch(getCountries());
	};

	function handleSortByName(e){
		dispatch(sortByName(e.target.value));
		setCurrentPage(1);
		setOrder(`order ${order}`);
	}

	function handleSortByPopulation(e){
		e.preventDefault();
		dispatch(sortByPopulation(e.target.value));
		setCurrentPage(1);
		setOrder(`order ${order}`);
	}

	function handleFilterByContinent(e){
		e.preventDefault();
		dispatch(filterByContinent(e.target.value));
		setCurrentPage(1);
	}

	function handleFilterByActivity(e){
		e.preventDefault();
		dispatch(filterByActivity(e.target.value))
		setCurrentPage(1);
	}

  return (
        <div className={styles.nav}>
            <div className={styles.title}>
                <h1 onClick={e => {handleClick(e)}}>COUNTRIES OF THE WORLD 🌐</h1>
            </div>
            <div className={styles.menus}>
                <div className={styles.container_menu1}>
                    <Link className={styles.btnacont} to='/activity'>
                        <button className={styles.btna}>Create Activity</button>
                    </Link>
                    <div className={styles.acti}>
                    <select onChange={e => handleFilterByActivity(e)}>
                        <option>Search by Activity</option>
                            {
                            activities.map( a => (
                            <option value={a.name} key={a.id}>{a.name}</option>))
                            }
                    </select>
                    </div>
                </div>
                <div className={styles.container_menu2}>
                    <div className={styles.bar}>
                        <SearchBar/>
                    </div>
                    <div className={styles.alpha}>
                        <select onChange={e => handleSortByName(e)}>
                            <option default>Sort by Name</option>
                            <option value='atoz'>A to Z</option>
                            <option value='ztoa'>Z to A</option>
                        </select>
                    </div>
                    <div className={styles.pop}>
                        <select onChange={e => handleSortByPopulation(e)}>
                            <option default>Sort by Population</option>
                            <option value='most'>Most population</option>
                            <option value='less'>Less population</option>
                        </select>
                    </div>
                    <div className={styles.conti}>	
                        <select onChange={e => handleFilterByContinent(e)}>
                            <option value='All'>All Continents</option>
                            <option value='Americas'>America</option>
                            <option value='Africa'>Africa</option>
                            <option value='Europe'>Europe</option>
                            <option value='Asia'>Asia</option>
                            <option value='Oceania'>Oceania</option>
                            <option value='Antarctic'>Antarctic</option>
                        </select>
                    </div>
                </div>
            </div>
						
					
		</div>
  )
}

export default Nav