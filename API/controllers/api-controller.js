const Image = require('../models/image-model');

exports.uploadImages = async(req, res) => {
    // console.log(req.body);
    // const images = req.body;

    // console.log(req.user);

    // for(let i = 0; i < images.length; i++){
    //     new Image({
    //         userId: req.user._id,
    //         url: images[i],
    //         createdDate: Date.now()
    //     }).save().catch(err => {
    //         console.log(err);
    //     })
    // }

    res.json('ok');
}