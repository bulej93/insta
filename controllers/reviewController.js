const Store = require("../models/Store");
const jwt = require('jsonwebtoken');



module.exports.createStore_get = (req, res) => {
    res.render('createStore');
}

module.exports.createStore_post = (req, res) => {

}

module.exports.showStore_get = (req, res) => {
    res.render('showStore');
}

module.exports.createReview_post = (req, res) =>{

}

module.exports.home_get = async (req, res) => {
    let query = Store.find()
    
    if(req.query.search != null && req.query.search != ''){
        query = query.regex('store', new RegExp(req.query.search, 'i'))
        
    }

    console.log('this is the query ' + req.query.search) 
    try {
        const store = await query.exec()
        
        res.render('home', {
        name:store,
        searchOptions:req.query
        })
        console.log('searching..')
        
    } catch (err){
        console.log(err)
        res.redirect('login')
    }
    
}