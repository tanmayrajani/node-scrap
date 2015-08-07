var request = require("request"),
	cheerio = require("cheerio");
var url = "http://fuckinghomepage.com/random";
var MongoClient = require('mongodb').MongoClient;

function fuckingHomepageDataBitches () {
	request(url, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body);
			var page = response.request.uri.path.split('/');
			page = page[page.length-1];
			var imgurl = $(".PostBody p:nth-child(17) a").attr("href");
			console.log(imgurl);
			console.log(page);
			MongoClient.connect('mongodb://localhost:27017/fh', function(err, db) {
	    		if(err) throw err;
	    		db.collection('iah').find({"date": page}).each(function (err,doc) {
	    			if (doc != null && page!="random" && page!="undefined") {
						console.dir("Hit!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					} else {
						db.collection('iah').insert({"date":page,"url":imgurl}, function (err, result) {
							console.log("Inserted!");
						})
					}
	    		})
	       	});
		}
	});

	setTimeout(fuckingHomepageDataBitches, 86);
}

fuckingHomepageDataBitches();