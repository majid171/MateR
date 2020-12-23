const Image = require('../models/image-model');

const VALID_TYPES = ['jpg', 'jpeg', 'png'];

exports.getImages = async (req, res) => {
    
    const id = req.user._id;
    let images = await Image.find({userId: id});

    return res.json(images);
}

exports.uploadImage = async (req, res) => {
    
    let imgList = [];

    for(var i = 0; i < req.body.length; i++){
        
        const fileName = req.body[i].fileName;
        const ext = fileName.split('.')[1];
        const data = req.body[i].data;

        if(!VALID_TYPES.includes(ext)) continue;

        let img = new Image({
            userId: req.user._id,
            fileName: fileName,
            created: Date.now(),
            data: data
        }).save().catch(err => {
            console.log(err);
        });

        imgList.push(img);
    }

    res.json({imgList});
}