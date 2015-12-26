var request = require("request"),
	cheerio = require("cheerio"),
	fs = require('fs'),
	sc = '',
	url = "https://yts.ag/movie/victoria-2015";

var x = 0;
setInterval(function () {
  	request(url, function (error, response, body) {
		if (!error) {
			if(x==0) {
				sc = body;
				//console.log(sc)
			}
			else{
				var z = body;
				if(z.length != sc.length){
					console.log("fuck! It\'s uploaded (maybe) :D")
					var $ = cheerio.load(body);
					console.log($("p.hidden-sm a").attr("href"));
				}
				else{
					console.log("checked. nothing much.")
				} 
			}
			x++;
		}
	})
}, 60000);