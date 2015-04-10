// Logs IPL match score from cricbuzz into a text file as well as on console.
var x = 14595;
var request = require("request"),
	cheerio = require("cheerio"),
	fs = require('fs'),
	sc = [],
	url = "http://www.cricbuzz.com/live-cricket-scorecard/" + x;
	
setInterval(function () {
  	request(url, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body),
			score = $("table.col-md-12 thead h4").text();
			//score = $(".batteamdesc").text();
			var index = score.indexOf("Match Info");
			if(index != -1) score = score.substr(0, index); // removing Match Info form score text
			var index2 = score.indexOf("20 overs)");
			if(index2 != -1) score = score.substr(index2+9); // while second innings, removing first innings' score
			if(sc.indexOf(score)>-1){
				//we don't need repeated score.
			}
			else{
				sc.push(score);
				console.log(score);
				fs.appendFile(""+x+".txt", score+"\n", function(err) {
				    if(err) {
				        return console.log(err);
				    }
				});
			}
			$ = "";
			score="";
			index="";
		} else {
			console.log("Rain stopped Play: " + error);
		}
	});
	request.shouldKeepAlive = false;
}, 5000);
