import axios from 'axios';

export function getCountries(){
	return async function(dispatch){
		var json = await axios('http://localhost:3001/countries',{});
		return dispatch({
			type: 'GET_COUNTRIES',
			payload: json.data
		})
	}
}

export function getActivities(){
	return async function(dispatch){
		var activities = await axios('http://localhost:3001/activity');
		return dispatch({
			type: 'GET_ACTIVITIES',
			payload: activities.data
		});
	};
};

export function getCountryById(id){
	return async function(dispatch){
		var countryDetails = await axios(`http://localhost:3001/countries/${id}`);
		return dispatch({
			type: 'GET_DETAILS',
			payload: countryDetails.data
		});
	};
};

export function createActivity(payload){
	return async function(dispatch){
		const newActivity = await axios.post('http://localhost:3001/activity', payload);
		console.log(newActivity);
		return newActivity;
	};
};

export function sortByName(payload){
	return({
			type: 'SORT_BY_NAME',
			payload
		});
};

export function sortByPopulation(payload){
	return({
		type: 'SORT_BY_POPULATION',
		payload
	});
};

export function filterByContinent(payload){
	return({
		type: 'FILTER_BY_CONTINENT',
		payload
	});
};

export function filterByActivity(payload){
	return({
		type: 'FILTER_BY_ACTIVITY',
		payload
	})
}

export function getCountryName(payload){
	return async function(dispatch){
		try{
			var json = await axios('http://localhost:3001/countries?name=' + payload);
			return dispatch({
				type: 'GET_COUNTRY_NAME',
				payload: json.data
			})
		} 
		catch (error) {
			return dispatch({
				type: 'GET_COUNTRY_NAME',
				payload: [
						{
							id: '404',
							name: 'Country Not Found',
							flag: 'https://http2.mlstatic.com/D_NQ_NP_724542-MLA48645105129_122021-O.jpg',
							region: '',
							population: ''
						}
					]
			})
		}
		
	}
}

export function postActivity(payload){
	return async function(dispatch){
		const response = await axios.post('http://localhost:3001/activity', payload);
		return response;
	}
}

