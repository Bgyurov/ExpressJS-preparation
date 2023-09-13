const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const {isAuthenticated} = require('./middleware/authMiddleware')
const crudController = require('./controllers/crudController')
//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)

router.get('/all-ads',homeController.getAllAds)

router.get('/createad',isAuthenticated, crudController.getCreatePage)
router.post('/createad',isAuthenticated, crudController.postCreatePage)
router.get('/apply/:adId',isAuthenticated,crudController.getApply)

router.get('/edit/:adId',isAuthenticated, crudController.getEditPage)
router.post('/edit/:adId',isAuthenticated, crudController.postEditPage)
router.get('/delete/:adId',isAuthenticated, crudController.getDelete)


router.get('/details/:adId', crudController.getDetailsPage)
router.get('/search', homeController.getSeacrchPage)


router.use('*',homeController.getErrorPage)

module.exports = router