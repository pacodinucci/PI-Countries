

const initialState = {
	countries: [],
	allCountries: [],
	activities: [],
	details: {}
}

function rootReducer(state = initialState, action){
	switch(action.type){
	case 'GET_COUNTRIES':
		return{
			...state,
			countries: action.payload,
			allCountries: action.payload
		}
	case 'SORT_BY_NAME':
		const sortAlpha = action.payload === 'atoz'
				? state.countries.sort((a, b) => {
					if(a.name > b.name) return 1;
					if(a.name < b.name) return -1;
					return 0;
					}) 
				: state.countries.sort((a, b) => {
					if(a.name > b.name) return -1;
					if(a.name < b.name) return 1;
					return 0;
					}); 
		return{
			...state,
			countries: sortAlpha
		}
	case 'SORT_BY_POPULATION':
		let sortPopulation;
		if(action.payload === 'most'){
			sortPopulation = state.countries.sort(
					(a, b) => b.population - a.population
				)};
		if(action.payload === 'less'){
			sortPopulation = state.countries.sort(
					(a, b) => a.population - b.population
				)};
		return{
			...state,
			countries: sortPopulation
		};
	case 'FILTER_BY_CONTINENT':
		const countriesFull = state.allCountries;
		let continentFilt;
		if(action.payload === 'All') continentFilt = countriesFull;
		else continentFilt = countriesFull.filter(c => c.region === action.payload);
		return{
			...state,
			countries: continentFilt
		}
	case 'FILTER_BY_ACTIVITY':
		const countries = state.allCountries;
		let activityFilt = [];
		for(let i=0;i<countries.length;i++){
			if(countries[i].activities.length){
				for(let j=0;j<countries[i].activities.length;j++){
					if(countries[i].activities[j].name === action.payload){
						activityFilt.push(countries[i]);
					}
				}
			}
		}	
			return{
				...state,
				countries: activityFilt
			}
		
	case 'GET_ACTIVITIES':
		return{
			...state,
			activities: action.payload
		}
	case 'GET_COUNTRY_NAME':
		return{
			...state,
			countries: action.payload
		}
	case 'GET_DETAILS':
		return{
			...state,
			details: action.payload
		}
	default:
		return state;
	}
}

export default rootReducer;