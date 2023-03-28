import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { postActivity, getActivities, getCountries } from '../actions';
import styles from './CreateActivity.module.css';

export default function CreateActivity(){
	const dispatch = useDispatch();
	const history = useHistory();
	const countriesAll = useSelector((state) => state.allCountries);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		difficulty: '',
		duration: '',
		season: '',
		equipment: '',
		countries: []
	})

	useEffect(() => {
		dispatch(getCountries());
	}, []);

	const countriesAlpha = countriesAll.sort((a, b) => {
		if(a.name > b.name) return 1;
		if(a.name < b.name) return -1;
		return 0;
	})

	function validate(input){
  		const errors = {};
  		if(!input.name) errors.name = 'An activity name is required';
  		if(!input.duration) errors.duration = "Duration is required";
  		if(!input.difficulty) errors.difficulty = 'Please select difficulty level';
 			if(!input.season) errors.season = "Please select a season";
  		if(!input.countries.length) errors.countries = "At least one country is required";
  		return errors;
	}
	
	function handleSelect(e){
		setInput({
			...input,
			countries: [...input.countries, e.target.value]
		})
		setErrors(validate({
			...input,
			countries: e.target.value
		}))
	}

	function handleChange(e){
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}));
		console.log(input);
	}

	function handleRadio(e) {
    if(e.target.checked) {
      setInput({
        ...input,
        season: e.target.value
      })
    }
      setErrors(validate({
      ...input,
      season: e.target.value
    }))
  	}

	function handleSubmit(e){
		if(input.season 
			&& input.difficulty 
			&& input.duration 
			&& input.name
			&& input.countries){
			e.preventDefault();
			console.log(input);
			dispatch(postActivity(input))
			alert("Activity created succesfully!")
			setInput({
				name: '',
				difficulty: '',
				duration: '',
				season: '',
				countries: []
		})
		history.push('/home');
		} else {
			e.preventDefault();
			alert('All fields must be completed')
			}
		
	}

	const handleRemove = e => {
		e.preventDefault();
		setInput({
			...input,
			countries: input.countries.filter( c => c !== e.target.id)
		})
	};

	return(
		<div className={styles.content}>
			<Link className={styles.backbtn} to='/home'><button>Back to Home</button></Link>
			<h1 className={styles.title}>COUNTRIES PI</h1>
			<h1 className={styles.subtitle}>CREATE ACTIVITY</h1>
			<form className={styles.fields} onSubmit={e => handleSubmit(e)}>
				<div className={styles.name}>
					<label>Activity name: </label>
					<input 
						type='text'
						value={input.name}
						name='name'
						onChange={e => handleChange(e)}
					/>
					{errors.name&&<p>{errors.name}</p>}
				</div>
				
				<div className={styles.diff}>
					<label>Difficulty: </label>
					<select name='difficulty' onChange={e => handleChange(e)}>
						<option value=''>Select a difficulty level</option>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
						<option value='4'>4</option>
						<option value='5'>5</option>
					</select>
					{errors.difficulty&&<p>{errors.difficulty}</p>}
				</div>
				
				<div className={styles.dur}>
					<label>Activity duration in hours: </label>
					<input 
						type='number'
						min='1'
						value={input.duration}
						name='duration'
						onChange={e => handleChange(e)}
					/>
					{errors.duration&&<p>{errors.duration}</p>}
				</div>
				
				<div className={styles.season}>
					<label>Season: </label>
					<div className={styles.radios}>
						<label><input 
							type='radio'
							name='season'
							value='Summer'
							onChange={e => handleRadio(e)}
						/>Summer</label>
						
						<label><input 
							type='radio'
							name='season'
							value='Winter'
							onChange={e => handleRadio(e)}
						/>  Winter</label>
						
						<label><input 
							type='radio'
							name='season'
							value='Spring'
							onChange={e => handleRadio(e)}
						/>  Spring</label>
						
						<label><input 
							type='radio'
							name='season'
							value='Autumn'
							onChange={e => handleRadio(e)}
						/>  Autumn</label>
						{errors.season&&<p>{errors.season}</p>}
					</div>
				</div>
				<div>
					<label>Equipment requiered:</label>
					<input
						type='text'
						name='equipment'
						value={input.equipment}
						onChange={ e => handleChange(e)}
						/>
				</div>
				
				<label className={styles.choose}>Choose countries: </label>
				<div className={styles.cou}>
					<select
						name='countries'
						id={input.countries}
						onChange={e => handleSelect(e)}>
						{countriesAlpha.map(c => (
							<option value={c.name} key={c.id}>{c.name}</option>
							))}
					</select>
						
						{errors.countries&&<p>{errors.countries}</p>}
				</div>
				<ul className={styles.screen}>
					{input.countries.map(e =>
						<div className={styles.screencou}>
							<button className={styles.rembtn} onClick={handleRemove} id={e}>x</button>
							<li className={styles.countryList}>{e}</li>
						</div>
						
					)}
				</ul>
				<button className={styles.sub} type='submit'> Create </button>
			</form>
			
		</div>
	)

}