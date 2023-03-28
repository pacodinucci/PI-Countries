import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryName } from '../actions';

export default function SearchBar(){
	const dispatch = useDispatch();
	const [name, setName] = useState();

	function handleInputChange(e){
		setName(e.target.value)
	};

	function handleSubmit(e){
		e.preventDefault();
		dispatch(getCountryName(name));
		setName('');
	}

	return(
		<form>
			<div>
				<input 
					type='text' 
					placeholder='Search Country...' 
					value={name} onChange={e => handleInputChange(e)} 
				/>
				<button type='submit' onClick={e => handleSubmit(e)}>Search</button>
			</div>
		</form>
	)
}