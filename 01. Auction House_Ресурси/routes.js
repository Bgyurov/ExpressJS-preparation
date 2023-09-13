const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const crudController = require('./controllers/crudController')
router.get('/',homeController.getHomePage)
router.use('/', authController)
router.get('/browse',homeController.getBrowsePage)
router.get('/details/:auctionId',crudController.getDetailsPage)



router.get('/publish',crudController.getPublishPage)
router.post('/publish',crudController.postPublishPage)


router.use('*',homeController.getErrorPage)
module.exports = router