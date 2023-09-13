const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const crudController = require('./controllers/crudController')
router.get('/',homeController.getHomePage)
router.use('/', authController)

router.get('/allgames', homeController.getCatalogPage)
router.get('/search', homeController.getSearchPage)

router.get('/createoffer', crudController.getCreatePage)
router.post('/createoffer', crudController.postCreatePage)

router.get('/details/:gameId', crudController.getDetailsPage)
router.get('/buy/:gameId',crudController.getBuy)


router.get('/edit/:gameId', crudController.getEditPage)
router.post('/edit/:gameId', crudController.postEditPage)

router.get('/delete/:gameId', crudController.getDelete)






router.use('*',homeController.getErrorPage)

module.exports = router