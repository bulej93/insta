const Store = require("../models/Store");
const jwt = require('jsonwebtoken');



module.exports.createStore_get = (req, res) => {
    res.render('createStore');
}

module.exports.createStore_post = async (req, res) => {
   
    const storename = req.body.name
    const store = new Store({
        storeName: storename
    })

    try {
        const newStore = await store.save()
        console.log(newStore)
        res.render('showStore', {
            storeId: newStore._id
        })
    } catch (error) {
        res.render('/')
        console.log(error)
    }

}

module.exports.showStore_get = (req, res) => {
    res.render('showStore');
}

module.exports.createReviewId_put = async (req, res) =>{
    const id = req.params.id
    let stores

    try {
		const stores = await Store.findById(id)
        stores.reviews = req.body.name
        console.log(stores.reviews)
        await stores.save()
        console.log('saved')
		res.render('reviews', {stores : stores})
	} catch(err){
		console.log(err)
        res.render('showStore')
	}

}

module.exports.showStoreId_get = async (req, res) => {
    const id = req.params.id
	try {
		const stores = await Store.findById(id)
		res.render('reviews', {stores : stores})
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