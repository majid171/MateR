const aws = require('aws-sdk');
const uuid = require('uuid');

exports.getPreSignedURL = async (type, fileName) => {
    
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        ContentType: type,
        Expires: 100
    }

    const options = {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        signatureVersion: 'v4',
        region: process.env.AWS_REGION
    }

    const s3 = new aws.S3(options);

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) {
                return reject(err);
            }

            return resolve(url);
        });
    });
}