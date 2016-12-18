console.log('server is starting');
var fs = require('fs');
var data = fs.readFileSync("words.json");
var words = JSON.parse(data);

console.log(words);

var express = require('express');

var app = express();

var server = app.listen(8888, listening);

function listening() {
	console.log('listening...');
}


// app.use(express.static('websites'));

app.get('/add/:word/:score?', addWord);

function addWord(req, res) {
	var data = req.params;
	var word = data.word;
	var num = Number(data.score);
	var reply = {};

	if (!num) {
		reply = {
		"status": "Please add score",
		"msg": "Thank you"
		}
		res.send(reply); 
	} else {
		words[word] = num;
		var data = JSON.stringify(words, null, 2);
		fs.writeFile('words.json', data, finished);

		function finished(err) {
			console.log('all set.');
			reply = {
				"status": "add successfuly",
				"msg": "Thank you",
				word: word,
				score: num
			}
			res.send(reply);
		}
		
	  }
	  
}

app.get('/search/:word/', searchWord);

function searchWord(req, res) {
	var word = req.params.word;
	var reply = {};
	if (words[word]) {
		reply = {
			"status": "word found",
			 word: word,
			 score: words[word]
		}
	} else {
		reply = {
			"status": "word not found"
		}
	}

	res.send(reply);
}
	
	


app.get('/all', sendAll);

function sendAll(request, response) {
	response.send(words);
}
