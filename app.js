const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const params = {
    Bucket: 'elasticbeanstalk-us-east-2-192235711219'
}

app.get('/', (req, res) => {
    AWS.S3.listObjects(params, function(err, data) {
        if (err) res.return(err, err.stack)
        else res.return(data)
    })
})

app.listen(process.env.PORT, () => console.log(`Sasha Fill is now running on port ${process.env.PORT}!`))
