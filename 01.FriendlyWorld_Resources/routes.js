const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const {isAuthenticated} = require('./middleware/authMiddleware')
const crudController = require('./controllers/crudController')
//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)

router.get('/dashboard', homeController.getDashboardPage)

//create
router.get('/add-animal',isAuthenticated,crudController.getCreatePage)
router.post('/add-animal',isAuthenticated,crudController.postCreatePage)

router.get('/details/:animalId', crudController.getDetailsPage)
router.get('/donate/:animalId',isAuthenticated,crudController.getDonate)

router.get('/edit/:animalId',isAuthenticated,crudController.getEditPage)
router.post('/edit/:animalId',isAuthenticated,crudController.postEditPage)
router.get('/delete/:animalId',isAuthenticated,crudController.getDelete)

//bonus
router.get('/search',homeController.getSearch)







router.use('*',homeController.getErrorPage)

module.exports = router