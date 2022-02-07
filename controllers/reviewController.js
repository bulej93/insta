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

module.exports.search_get = async (req, res, hasErrors = false) => {

    let query = Store.find()

    if (req.query.search != null && req.query.search != '') {

        query = query.regex('name', new RegExp(req.query.search, 'i'))
        
    }
  
    try {
        
        const stores = await query.exec()
        if (stores == '') {
            console.log('no stores available')
            res.render('createStore')
        } else {
                console.log( stores)
                res.render('ShowStore',  {
                stores:stores
            })
        }
       

    } catch (error) {
        console.log(error)
    }
}