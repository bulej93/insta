const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const router = Router();
// get to the page that you can create a store
 router.get ('/createStore', reviewController.createStore_get);

//  //actually create the store
 router.post('/createStore', reviewController.createStore_post);

// //get store and show current reviews
router.get('/showStore', reviewController.showStore_get);

// //post reviews
router.post('/createReview', reviewController.createReview_post);

router.get('/', reviewController.home_get);

module.exports = router;