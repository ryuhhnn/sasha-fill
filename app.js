const express = require('express')
const app = express()
const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-2'
})

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: 'elasticbeanstalk-us-east-2-192235711219'
    }
})

let photos = []

app.get('/', (req, res) => {
    s3.listObjects({ Delimiter: '/photos' }, function (err, data) {
        if (err) res.send(err, err.stack)
        else photos = data.Contents

        res.send(photos[Math.floor(Math.random() * photos.length)])
    })
})

app.listen(process.env.PORT, () => console.log(`Sasha Fill is now running on port ${process.env.PORT}!`))
