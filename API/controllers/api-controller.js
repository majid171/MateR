const Image = require('../models/image-model');

exports.uploadImage = async(req, res) => {
    // console.log(req.body);
    const images = req.body;

    for(let i = 0; i < images.length; i++){
        
    }

    res.json('ok');
}