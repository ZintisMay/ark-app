// Dependencies
// =============================================================
var JSONdata = require(__dirname + "/../assets/themoviedb_data.json");
var MDB = require("moviedb")('59d365f961809c4cbe7f346086fb2f03');

// Routes
// =============================================================
module.exports = function(app){

		app.get('/api/themoviedb_data', function(req, res){
			// console.log('JSONdata from ./themoviedb_data.json');
			res.json(JSONdata);

		});

		app.post('/api/custom', function(req, res){

			customReq = req.body.name;

			MDB.searchPerson({query: customReq }, function(err, res1){

  				if (err) throw err;

  			  	res.json(res1);

			});

		}); 

}
