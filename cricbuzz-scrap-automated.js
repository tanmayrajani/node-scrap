// Logs IPL match score from cricbuzz into a text file as well as on console.
//var x = 14600;
var request = require("request"),
	cheerio = require("cheerio"),
	fs = require('fs'),
	sc = [];

// following is IPL8 Timetable with cricbuzz match IDs.. 
// Now fully automated. Just run the script anytime before semifinals.. promptly get the score!
var timetable = [
		[13,4,8,14600],
		[13,4,8,14601],
		[14,4,8,14602],
		[15,4,8,14604],
		[16,4,8,14605],
		[17,4,8,14606],
		[18,4,4,14607],
		[18,4,8,14608],
		[19,4,4,14609],
		[19,4,8,14610],
		[20,4,8,14611],
		[21,4,8,14612],
		[22,4,4,14613],
		[22,4,8,14614],
		[23,4,8,14615],
		[24,4,8,14616],
		[25,4,4,14617],
		[25,4,8,14618],
		[26,4,4,14619],
		[26,4,8,14620],
		[27,4,8,14621],
		[28,4,8,14622],
		[29,4,8,14623],
		[30,4,8,14624],
		[1,5,4,14625],
		[1,5,8,14626],
		[2,5,4,14627],
		[2,5,8,14628],
		[3,5,4,14629],
		[3,5,8,14630],
		[4,5,4,14631],
		[4,5,8,14632],
		[5,5,8,14633],
		[6,5,8,14634],
		[7,5,8,14635],
		[8,5,8,14636],
		[9,5,4,14637],
		[9,5,8,14638],
		[10,5,4,14639],
		[10,5,8,14640],
		[11,5,8,14641],
		[12,5,8,14642],
		[13,5,8,14643],
		[14,5,8,14644],
		[15,5,8,14645],
		[16,5,4,14646],
		[16,5,8,14647],
		[17,5,4,14648],
		[17,5,8,14649]
		], x;

for (var i = 0; i < timetable.length; i++) {
	if(timetable[i][0]==new Date().getDate() && timetable[i][1]==new Date().getMonth()+1){
		if(new Date().getHours()>=20 && new Date().getHours()<=23){
			x = timetable[i+1][3];
			break;
		}

		if(new Date().getHours()>=16 && new Date().getHours()<=19){
			if(timetable[i][2]==4) x = timetable[i][3];
			else x = timetable[i-1][3];
			break;
		} 

		x = timetable[i-1][3];
	}
};
//console.log(x);
var url = "http://www.cricbuzz.com/live-cricket-scorecard/" + x;
	
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
