//Searches string input given from command line and gives related searches (if possible)
var request = require("request"),
	cheerio = require("cheerio"),
	fs = require("fs"),
	url = "http://www.google.co.in/search?q="+process.argv[2]+"&cad=h";
	
  	request(url, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body),
				score = $("div#res").next().find("._Bmc");
				console.log(score.text());
		} else {
			console.log("Errrrrrrrrrrr: " + error);
		}
	});
