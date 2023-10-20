const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const {isAuthenticated} = require('./middleware/authMiddleware')
const crudController = require('./controllers/crudController')
//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)

router.get('/trips',homeController.getTripsPage)
router.get('/details/:tripId',crudController.getDetailsPage)
//crud
router.get('/offertrip',isAuthenticated,crudController.getCreatePage)
router.post('/offertrip',isAuthenticated,crudController.postCreatePage)

router.get('/join/:tripId',isAuthenticated,crudController.getJoin)

router.get('/edit/:tripId',isAuthenticated,crudController.getEditPage)
router.post('/edit/:tripId',isAuthenticated,crudController.postEditPage)

router.get('/delete/:tripId',isAuthenticated,crudController.getDelete)

//:Bonus
router.get('/profile/:profileId',isAuthenticated,homeController.getProfilePage)



router.use('*',homeController.getErrorPage)

module.exports = router