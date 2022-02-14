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

module.exports.createReview_post = (req, res) =>{

}

module.exports.search_get = async (req, res) => {

    let searchOptions = {}
   
    if (req.query.name != null && req.query.name !== '') {
        
        searchOptions.name = new RegExp(req.query.name, 'i')
        
    }
  
    try {
        
        const stores = await Store.find({storeName:searchOptions.name})
        console.log('this is stores alone' + stores)
        res.render('createStore', {
            stores : stores,
            searchOptions: req.query
        })
       

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}