const router = require('express').Router()
const homeController = require('./controllers/homeController')
const crudController = require('./controllers/crudController')
const authController = require('./controllers/authController')
const profileController = require('./controllers/profileController')

router.get('/',homeController.getHomePage)
router.get('/catalog',homeController.getCatalogPage)
router.use('/', authController)

router.get('/create',crudController.getCreatePage)
router.post('/create',crudController.postCreatePage)

router.get('/details/:bookId' , crudController.getDetailsPage)
router.get('/wish/:bookId' , crudController.getWish) 

router.get('/edit/:bookId',crudController.getEditPage)
router.post('/edit/:bookId',crudController.postEditPage)

router.get('/delete/:bookId', crudController.getDelete)

router.get('/profile/:profileId',profileController.getProfilePage)
router.use('*',homeController.getErrorPage)

module.exports = router