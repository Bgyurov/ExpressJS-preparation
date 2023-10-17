const router = require('express').Router()
const homeController = require('./controllers/homeController')
const authController = require('./controllers/authController')
const {isAuthenticated} = require('./middleware/authMiddleware')
const crudController = require('./controllers/crudController.js')
const profileController = require('./controllers/profileController.js')

//isAuthenticated middleware before loged in user like create/edit/delete/profile
router.get('/',homeController.getHomePage)
router.use('/', authController)

router.get('/gallery', homeController.getGalleryPage)

router.get('/createpublication',isAuthenticated,crudController.getCreatePage)
router.post('/createpublication',isAuthenticated,crudController.postCreatePage)

router.get('/details/:publicationId', crudController.getDetailsPage)

router.get('/share/:publicationId', isAuthenticated,crudController.getShared)

router.get('/edit/:publicationId', isAuthenticated,crudController.getEditPage)
router.post('/edit/:publicationId',isAuthenticated, crudController.postEditPage)

router.get('/delete/:profileId',isAuthenticated,crudController.getDelete)

router.get('/profile/:profileId', isAuthenticated,profileController.getProfilePage)



router.use('*',homeController.getErrorPage)

module.exports = router