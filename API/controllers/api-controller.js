const Image = require('../models/image-model');

exports.persistImage = async (req, res) => {

    const fileName = req.body.fileName;

    let img = await new Image({
        userId: req.user._id,
        fileName: fileName,
        created: Date.now()
    }).save()
        .catch(e => {
            console.log(e);
        });

    res.json(img);
}

exports.getImages = async (req, res) => {
    
    const id = req.user._id;
    let images = await Image.find({userId: id});

    res.json(images);
}