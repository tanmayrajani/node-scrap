var request = require("request"),
	cheerio = require("cheerio");
var url = "http://fuckinghomepage.com/page/";
var MongoClient = require('mongodb').MongoClient;
var i=1349;
function fuckingHomepageDataBitches () {
	j=''+i;
	i--;
	url1=url.concat(j);
	if(i<100) return;
	//console.log(url1);
	request(url1, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body);
			var page2 = $(".Post .Text a").attr("href");
			if(isRealValue(page2)){
				var page = page2.split('/');
				page = page[page.length-1];
				//console.log(page2);
				var quote = $(".PostBody p:nth-child(3)").text();
				console.log(j+""+page+" >> "+quote);
				MongoClient.connect('mongodb://localhost:27017/fh', function(err, db) {
		    		if(err) throw err;
		    		db.collection('quotes').find({"date": page}).each(function (err,doc) {
		    			if (doc != null && page!="random" && page!="undefined") {
							db.collection('quotes').update({"date": page},{"page":j},{upsert: true});
						} else {
							db.collection('quotes').insert({"date":page,"quote":quote}, function (err, result) {
								//console.log("Inserting..");	
							})
						}
		    		})
		       	});	
			}
		}
	});
	setTimeout(fuckingHomepageDataBitches, 86);
}
fuckingHomepageDataBitches();
function isRealValue(obj){
 return obj && obj !== "null" && obj!== "undefined";
}