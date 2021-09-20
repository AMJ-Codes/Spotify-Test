const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'd5939a6c88b14b0a9416f80d88506c04',
        clientSecret: '22d107f46b4e43dfb4c640d0057c1192'
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
          console.log(data.body);
          spotifyApi.setAccessToken(data.body['access_token']);
        }).catch(() => {
            res.sendStatus(400)
        })
})

// hard coding the clientId and namely the clientSecret = BAD. Store in an ENV file.

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'd5939a6c88b14b0a9416f80d88506c04',
        clientSecret: '22d107f46b4e43dfb4c640d0057c1192'
    })

    spotifyAPI.authorizationCodeGrant (code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        console.log(err)
        res.sendStatus(400);
    })
})

app.listen(3001)