const Store = require("../models/Store");
const Reviews = require("../models/Reviews");
const jwt = require('jsonwebtoken');



module.exports.createStore_get = (req, res) => {
    res.render('createStore');
}

module.exports.createStore_post = async (req, res) => {
    let id = req.params.id
    const storename = req.body.name

    const store = new Store({
        storeName: storename
    })

    try {
        const newStore = await store.save()
        let id = req.params.id
        const stores = await Store.findById(id)
        console.log(newStore)
        res.redirect(`/showstore/${store.id}`)
    } catch (error) {
        res.redirect('/')
        console.log(error)
    }

}

module.exports.showStore_get = (req, res) => {
    res.render('showStore');
}

module.exports.createReviewId_put = async (req, res) =>{
    let id = req.params.id
    let store

    store = await Store.findById(id)

    try {
        const review = new Reviews({
            store:id,
            reviews: req.body.name
        })
        await review.save()
        console.log('saved' + review)
		res.redirect(`/showstore/${store.id}`)
	} catch(err){
		console.log(err)
        res.render('showStore')
	}

}

module.exports.showStoreId_get = async (req, res) => {
    const id = req.params.id
	try {
		const stores = await Store.findById(id)
        const reviews = await Reviews.find({store:[id]}, function(err, docs){}).sort({createdAt: -1})
		res.render('reviews', {
            stores : stores,
            reviews : reviews
        })
	} catch(err){
		console.log(err)
        res.render('showStore')
	}
}

module.exports.search_get = async (req, res) => {

    let searchOptions = {}
   
    if (req.query.name != null && req.query.name !== '') {
        
        searchOptions.name = new RegExp(req.query.name, 'i')
        
    }
  
    try {
        
        const stores = await Store.find({storeName:searchOptions.name})
        res.render('showStore', {
            stores : stores,
            searchOptions: req.query
        })
       

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}