const { Router } = require('express');
const reviewController = require('../controllers/reviewController');

const router = Router();
// get to the page that you can create a store
 router.get ('/createStore', reviewController.createStore_get);

//  //actually create the store
 router.post('/createStore', reviewController.createStore_post);

// get store from search results
router.get('/showStore', reviewController.showStore_get);

// get store with ._id where you can post reviews
router.get('/showStore/:id', reviewController.showStoreId_get);

// //post reviews
router.get('/reviews/:id', reviewController.createReviewId_put);

router.get('/search', reviewController.search_get);

module.exports = router;