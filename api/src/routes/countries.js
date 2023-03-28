const { Router } = require('express');
const { countryById, getAllCountries } = require('../controllers');

const router = Router();

router.get('/countries', getAllCountries);

router.get('/countries/:countryId', countryById);

module.exports = router;