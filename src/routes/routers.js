const express = require('express');
const router = express.Router();

const movieRouter = require('./movies')
const genderRouter = require('./genders')
const countryRouter = require('./contries')
const classifyRouter = require('./classifies')
const packRouter = require('./packs')
const billRouter = require('./bills')
const userRouter = require('./users')
const actorRouter = require('./actors')
const dashboardRouter = require('./dashboard');

// [DASHBOARD]
router.use('/dashboard', dashboardRouter);
// [ACTORS] index
router.use('/actor', actorRouter);
// [USER]
router.use('/user', userRouter)
// [BILL]
router.use('/bill', billRouter)
// [PACK]
router.use('/pack', packRouter)
// [CLASSIFY]
router.use('/classify', classifyRouter )
// [COUNTRY]
router.use('/country', countryRouter )
// [GENDER]
router.use('/gender', genderRouter )
// [MOVIE] index
router.use('/movie', movieRouter);

module.exports = router;
