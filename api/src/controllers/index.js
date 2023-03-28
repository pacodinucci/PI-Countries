const axios = require('axios');
const { Country, Activity } = require('../db');

const getAllCountries = async (req, res) => {
	let allCountries = await Country.findAll({
		include: [Activity]
	})
	const { name } = req.query;
	try{
		if(allCountries.length === 0){
		const apiInfo = await axios('https://restcountries.com/v3/all');
				const infoLoad = apiInfo.data.map( c => {
					return {
						id: c.cca3,
						name: c.name.common,
						flag: c.flags[0],
						region: c.region,
						capital: c.capital ? c.capital[0] : 'Undefined capital',
						subregion: c.subregion ? c.subregion : 'Undefined subregion',
						area: c.area,
						population: c.population
					};
				});
				infoLoad.forEach( async (c) => {
					await Country.findOrCreate({
						where: {id: c.id},
						defaults:{
								id: c.id,
			 					name: c.name,
								flag: c.flag,
								region: c.region,
								capital: c.capital,
								subregion: c.subregion,
								area: c.area,
								population: c.population
						}
					})
				});
				allCountries = await Country.findAll({
					include: [Activity]
				})
			return res.status(200).json(allCountries);
			}
			if(name){
				const countriesFound = allCountries.filter( c => 
						c.name.toUpperCase().includes(name.toUpperCase())
					)
				if(countriesFound.length) return res.json(countriesFound);
				else return res.status(404).json({error:'Country not found'});
			}
			
			res.status(200).json(allCountries);
	}
	catch(error){
		res.status(500).json({error: error.message})
	}
}; 

const countryById = async (req, res) => {
	try{
		const { countryId } = req.params;
		if(countryId){
			const response = await Country.findOne({
				where: {id: countryId.toUpperCase()},
				include: [{model: Activity, attributes: ['name','difficulty','duration','season'], through: {attributes: []}}]
			});
			if(!response){
				return res.status(404).json({msg:'Country not found'});
			}
			else{

				const showResponse = response;
				showResponse.activities = showResponse.activities.map( e => e.name);
				res.status(200).json(showResponse);
			} 

			
		}
	}
	catch(error){
		res.status(500).json({error: error.message});
	}
};

const getActivities = async (req, res) => {
	try{
		const allActivities = await Activity.findAll({
			include: [Country]
		});
		const showActivity = allActivities.map( a => {
			return{
				id: a.id,
				name: a.name,
				difficulty: a.difficulty,
				duration: a.duration,
				season: a.season,
				countries: a.countries.map( c => {
					return c.name;
				})
				
			}
		})
		res.json(showActivity);
	}
	catch(error){
		res.status(500).json({error: error.message});
	}
}


const addActivity = async function (req, res) {
	try {
		const { name, difficulty, duration, season, countries } = req.body;
		let newActivity = await Activity.findOrCreate({
			where: {
				name: name,
				difficulty: difficulty,
				duration: duration,
				season: season
			}
		});
		
		
		for (let i = 0; i < countries.length; i++) {
			const match = await Country.findOne({
				where: {
					 name: countries[i]
				}
			});

			await newActivity[0].addCountry(match);
		}
		res.json({ msg: 'Activity created' });
	} catch (error) {
		res.send({ msg: error.message });
	}
};




module.exports = {
	getAllCountries,
	countryById,
	getActivities,
	addActivity
};