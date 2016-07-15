'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id

        if (event.message && event.message.text) {
			var answer;
            let text = event.message.text.toLowerCase();
			if (text.indexOf("hưng") != -1){
				answer = "Hưng là người làm ra tớ đấy :3"
			}else if ((text.indexOf("chào") != -1 && text.indexOf("anh") != -1) || (text.indexOf("chào") != -1)){
				answer = "Chào em"
			}else if (text.indexOf("em cái") != -1){
				answer = "Ý kiến à?"
			}else if ((text.indexOf("chào") != -1 && text.indexOf("em") != -1) || text.indexOf("em") != -1 && text.indexOf("ơi") != -1)){
				answer = "Em em cái cc nhé :^)"
			}else if ((text.indexOf("chào") != -1 && text.indexOf("anh") != -1) || (text.indexOf("chào") != -1)){
				answer = "Chào em"
			}else if ((text.indexOf("chào") != -1 && text.indexOf("anh") != -1) || (text.indexOf("chào") != -1)){
				answer = "Chào em"
			}else if (text.indexOf("dịch hộ") != -1 || text.indexOf("dịch giúp") != -1 ){
				var i = text.indexOf(":");
				answer = answer.substring(i+1,answer.length);
				answer = "http://translate.google.com.vn/m?hl=vi&sl=auto&tl=vi&ie=UTF-8&prev=_m&q="+answer;
			}else{
            	answer = "Hem biết :3"
			}
			sendTextMessage(sender, answer)        
		}
    }
    res.sendStatus(200)
})


var token = "EAAY7XUPxKToBAOtZAbMmZBZCZCJoUBQvbaG2ebegPDEHaY5aGdnklR7dttvhepiwppRLBQojGNZCpoN2rK6KMymah2xP30EtKz8dRPUoC6UltC3xF9avIMAt1WVGK6mhjFTdt5dfgyPOWPYPMfKDk9ROTEmKSBeEZA62QZBWxshJQZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
