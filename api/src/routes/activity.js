const { Router } = require('express');
const { getActivities, createActivity, addActivity} = require('../controllers');

const router = Router();

router.get('/activity', getActivities);
router.post('/activity', addActivity);

module.exports = router;