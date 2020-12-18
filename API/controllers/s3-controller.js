const s3 = require('../utilities/s3-config');

exports.getPreSignedURL = async(req, res) => {
    
    const type = req.query.type;

    const signedURL = await s3.getPreSignedURL(type)
        .catch(err => {
            console.log(err);
        });

    res.json({signedURL});
}