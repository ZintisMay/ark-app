// Dependencies
// =============================================================
var JSONdata = require(__dirname + "/../assets/themoviedb_data.json");
var MDB = require("moviedb")('59d365f961809c4cbe7f346086fb2f03');
var rp = require('request-promise');
var co = require('co');

//missing actor name
var url1 = "https://api.tmdb.org/3/search/person?api_key=59d365f961809c4cbe7f346086fb2f03&query=";
//missing actor id#
var url2 = 'https://api.themoviedb.org/3/discover/movie?api_key=59d365f961809c4cbe7f346086fb2f03&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_cast=';

// Routes
// =============================================================
module.exports = function(app){

		app.get('/api/themoviedb_data', function(req, res){
			
			res.json(JSONdata);

		});

		app.post('/api/custom', function(req, res){

			customReq = req.body.name;

			MDB.searchPerson({query: customReq }, function(err, res1){

  				if (err) throw err;

  			  	res.json(res1);

			});

		}); 

		app.post('/api/moviesByActorName', function(req, res){

			actorName = "";

			var actorName = req.body.name;

			co(function*(){

			  var response;

			  response = yield rp(url1 + actorName);

			  var parsedData = JSON.parse(response);

			  var targetID = parsedData.results[0].id;

			  var targetName = parsedData.results[0].name;

			  if(parsedData.results.length == 0){
				  res.status(500).send('Something broke!');
				  throw "error";
			  }

			  response = yield rp(url2 + targetID);

			  var parsedData2 = JSON.parse(response);

			  //this adds the name to a 2nd best guess actor
			  parsedData2.nameForTheImageField = targetName;

			  res.send(parsedData2);

			}).catch(function(err){

			});

		});

		app.post('/api/actorImage', function(req, res){

			actorName = "";

			var actorName = req.body.name;

			co(function*(){

			  response = yield rp(url1 + actorName);

			  response = JSON.parse(response);

			  res.send(response.results[0].profile_path);

			}).catch(function(err){

			});

		});

}
