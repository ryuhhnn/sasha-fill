const express = require('express')
const app = express()
const AWS = require('aws-sdk')
let request = require('request').defaults({ encoding: null })

app.use(express.static('public'))

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

app.get('/random', (req, res) => {
    s3.listObjects({ Delimiter: '/', Prefix: 'photos/' }, function (err, data) {
        if (err) res.send(err, err.stack)
        else photos = data.Contents

        request.get(`https://s3.us-east-2.amazonaws.com/elasticbeanstalk-us-east-2-192235711219/${photos[Math.floor(Math.random() * photos.length)].Key}`, (e, r, body) => {
            res.header('Content-Type', r.headers['content-type'])
            res.send(r.body)
        })
    })
})

app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

app.listen(process.env.PORT, () => console.log(`Sasha Fill is now running on port ${process.env.PORT}!`))
