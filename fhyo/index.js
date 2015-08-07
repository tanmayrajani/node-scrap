var request = require("request"),
	cheerio = require("cheerio");
var url = "http://fuckinghomepage.com/random";

request(url, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body);
			var imgurl = $(".PostBody p:nth-child(17) a").attr("href");
			console.log(imgurl);
			console.log(response.request.uri);
		}
	});