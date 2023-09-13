const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const crudController = require('./controllers/crudController')
const profileController = require('./controllers/profileController')
const {isAuthenticated} = require('./middleware/authMiddleware')

router.get('/',homeController.getHomePage)
router.use('/', authController)
//if we dont have a acount we dont have accsess to open create page
router.get('/create',isAuthenticated,crudController.getCreatePage)
router.post('/create',isAuthenticated,crudController.postCreatePage)


router.get('/catalog',homeController.getCatalogPage)
router.get('/details/:creatureId',crudController.getDetailsPage)
router.get('/vote/:creatureId',crudController.getVoted)

//edit
router.get('/edit/:creatureId',isAuthenticated,crudController.getEditPage)
router.post('/edit/:creatureId',isAuthenticated,crudController.postEditPage)
//delete
router.get('/delete/:creatureId',isAuthenticated,crudController.getDelete)
//profile :Bonus
router.get('/profile/:profileId',profileController.getProfilePage)


router.use('*',homeController.getErrorPage)

module.exports = router