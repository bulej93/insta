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
        res.render('createStore')
        console.log(error)
    }

}

module.exports.showStore_get = (req, res) => {
    res.render('showStore');
}

module.exports.createReview_post = (req, res) =>{

}

module.exports.search_get = async (req, res, hasErrors = false) => {

    let query = Store.find()

    if (req.query.search != null || req.query.search != '') {

        query = query.regex('name', new RegExp(req.query.search, 'i'))
        
    }
  
    try {
        
        const stores = await query.exec()
        if (stores == '') {
            console.log('no stores available')
            res.redirect('createStore')
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