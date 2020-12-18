const uuid = require('uuid');

const s3 = require('../utilities/s3-config');

exports.getPreSignedURL = async (req, res) => {

    const type = req.query.type;
    const fileName = uuid.v4() + '.' + type;

    const signedURL = await s3.getPreSignedURL(type, fileName)
        .catch(err => {
            console.log(err);
        });

    const ret = {
        url: signedURL,
        fileName: fileName
    }

    res.json(ret);
}