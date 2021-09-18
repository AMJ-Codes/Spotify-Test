const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

// hard coding the clientId and namely the clientSecret = BAD. Store in an ENV file.
app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyAPI = new SpotifyWebApi({
        redirectUri: 'http:localhost:3000',
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
        res.sendStatus(400);
    })
})