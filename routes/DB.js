const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose')
const Posts = require('../models/postModel.js');
require('dotenv').config()
// db
const connectionURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lvu1w.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(connectionURI)

//styling
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    Posts.find((err, data) => {
        res.render('data', {
            posts: data
        })
    })

});


router.get('/data' , (req,res) => {
    Posts.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

router.post('/data' , (req, res) => {
    const newPost = new Posts({
        user: req.body.user,
        content: req.body.content
    })
    newPost.save();
    res.redirect('/DB')
})


module.exports = router;