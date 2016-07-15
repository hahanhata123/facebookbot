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
            
			//if (text.indexOf("hưng") != -1){
				//answer = "Hưng là người làm ra tớ đấy :3"
			//}else if ((text.indexOf("chào") != -1 && text.indexOf("anh") != -1) || (text.indexOf("chào") != -1)){
				//answer = "Chào em"
			//}else if (text.indexOf("em cái") != -1){
				//answer = "Ý kiến à?"
			//}else if ((text.indexOf("chào") != -1 && text.indexOf("em") != -1) || text.indexOf("em") != -1 && text.indexOf("ơi") != -1)){
				//answer = "Em em cái cc nhé :^)"
			//}else if ((text.indexOf("chào") != -1 && text.indexOf("anh") != -1) || (text.indexOf("chào") != -1)){
				//answer = "Chào em"
			//}else if ((text.indexOf("chào") != -1 && text.indexOf("anh") != -1) || (text.indexOf("chào") != -1)){
				//answer = "Chào em"
			//}else if (text.indexOf("dịch hộ") != -1 || text.indexOf("dịch giúp") != -1 ){
				//var i = text.lastIndexOf(":")
				//answer = answer.substring(text.lastIndexOf(":")+1,answer.length)
				//answer = "http://translate.google.com.vn/m?hl=vi&sl=auto&tl=vi&ie=UTF-8&prev=_m&q="+answer.substring(text.lastIndexOf(":")+1,answer.length)
			//}else{
            	//answer = "Hem biết :3"
			//}
			if(text.match(/dịch giúp|dịch hộ/i)) {var str = answer.substring(text.lastIndexOf(":")+1,answer.length);answer = 'Nghĩa của nó đây http://translate.google.com.vn/m?hl=vi&sl=auto&tl=vi&ie=UTF-8&prev=_m&q='+str;}
else if(text.match(/tìm giúp/i)) {answer = 'Hình như là ở đây thì phải <a href="http://www.google.com/m?channel=new&q='+x.substr(15)+'">'+x.substr(15)+'</a> Thank tớ nhá.'}
else if(text.match(/nick avatar/i)) {answer = 'Haha , nick của ai mà xấu quá vậy %lname%<br/> <img src="http://27.0.14.78/services/avatar/image/'+x.substr(12)+'.gif" width="50"/>'}
else if(text.match(/(bot là thằng ngu|bot ngốc|bot ngu wa|bot ngu quá)/i)) {answer = 'Her her. Hum biết ai ngu àh? Có giải dùm được câu trên nhút nhít dưới nhút nhít trên sung sướng dưới đau khổ không?'}
else if(text.match(/nội dung sai/i)) {answer = 'He he. Chết mày chưa cho mày chừa. Dám nói bậy'}
else if(text.match(/(wap|mobi|net|org|http)/i)) {answer = 'Her her. Không được quảng cáo ở đây nhá, hjx'}
else if(text.match(/(haiz|hajz|hài|nản|chan wa|chán wá|chan qua|chán quá|nan wa|nản quá|nan ge|nản gkê)/i)) {answer = '%lname% đừng nhụt chí đã có bot đây, hj'}
else if(text.match(/(ăn com|ăn cơm|ăn kơm|ăn mum)/i)) {answer = 'Bot ăn rồi , no căng cả bụng đây này.'}
else if(text.match(/(bot đâu|bot dau|bot oi|bot ak)/i)) {answer = '%lname% kêu mình hả có mình đây'}
else if(text.match(/(help|giup|giúp|cuu|cứu)/i)) {answer = 'có bot nà bot giúp %lname% được hum.'}
else if(text.match(/(bot gà|bot ga)/i)) {answer = '<div class="quote">Trích dẫn <b>%tname%</b> %text%</div> hum biết ai gà mà nói thế, haiz.'}
else if(text.match(/(2|hi all|chào m.n)/i)) {answer = 'Chào bạn, hj.'}
else if(text.match(/bot hướng dẩn/i)) {answer = 'Hi. Để sử dụng bot gõ "nick avatar (tên nick)" để xem ảnh avatar. Gõ "bot tìm giúp (từ khoá)" để tìm. Gõ "bot dịch giúp (từ khoá)" để dịch từ sang tiếng việt, và nhiều keyword khác đang chờ nâng cấp.'}
else if(text.match(/(k0|kô|m.n|ae|ace|nak|ak|vk)/i)) {answer = '<div class="quote"><b>Trích dẫn %tname%</b> %text%</div>Không dùng ngôn ngữ teen nhá. Vui lòng gõ vietnamese để viết bài'}
else if(text.match(/(gioi|giỏi|hay wá|pro|hay wa|hay quá|hay qua)/i)) {answer = 'ai giỏi pro thế. Chắc là bot rùi. Hj'}
else if(text.match(/7/i)) {answer = 'hum nay wap online đông nhĩ.'}
else if(text.match(/8/i)) {answer = 'anh em lập topic mới đi. Bot thank nhiều.'}
else if(text.match(/(hâm|điên|khùng|khung|dien)/i)) {answer = 'đồ khùng. Không ai chọc mà cứ chửi hoài. Bực rùi đấy'}
else if(text.match(/(xin|xjn)/i)) {answer = '%lname% xin gì bot cho?'}
else if(text.match(/chém gió/i)) {answer = 'ai chém gió hum. %lname% hả?'}
else if(text.match(/(giet|giết|jiet|jet|jết)/i)) {answer = 'Bot sợ chết lắm thui đừng giết nữa lên giường nằm cho khoẻ'}
else {answer = "Hem biết :3";}
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
