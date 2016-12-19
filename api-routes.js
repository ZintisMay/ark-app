var JSONdata = require("./themoviedb_data.json");
var MDB = require("moviedb")('59d365f961809c4cbe7f346086fb2f03');

// Routes
// =============================================================
module.exports = function(app){


		app.get('/api/themoviedb_data', function(req, res){
			console.log(JSONdata);
			// console.log(JSONdata);
			res.json(JSONdata);

		});
// http://api.themoviedb.org/3/search/person?query=brad+pitt&api_key=59d365f961809c4cbe7f346086fb2f03


		app.post('/api/custom', function(req, res){

			console.log("req", req.body.name);

			var qString = req.body.name;
			console.log(qString);

			// qString.replace(' ', '%20');

			console.log(qString);

			var customReq = "https://api.themoviedb.org/3/search/person?api_key=59d365f961809c4cbe7f346086fb2f03&language=en-US&query=" +qString+ "&page=1&include_adult=false";

				// customReq = req.body;

			customReq = req.body.name;

			MDB.searchPerson({query: customReq }, function(err, res1){
			  // console.log(typeof res1);
  				if (err) throw err;

  			  	res.json(res1);
			  	// console.log(res1);

			  	// MDB.personCredits({query: '3084'}, function(err, res2){
	  			// 	if (err) throw err;
			  	// 	res.json(res2);
			  	// })
			});

		}); 
}
