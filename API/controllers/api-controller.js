const Image = require('../models/image-model');

exports.persistImage = async (req, res) => {

    const fileName = req.body.fileName;

    let img = new Image({
        userId: req.user._id,
        fileName: fileName,
        created: Date.now()
    }).save()
        .catch(e => {
            console.log(e);
        });

    res.json(img);
}