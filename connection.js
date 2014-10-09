/**
 * Helper for getting API
 */

var Connection = function(){
	"use strict";

	var hostname = "api.flickr.com";
	var path = "/services/rest?api_key=" + process.env.API_KEY + "&user_id=" + process.env.USER_ID + "&format=json";
	var headers = {
		"Content-Type" : "application/json"
	};

	// var options = {
	// 		hostname : 'api.flickr.com',
	// 		method : 'GET',
	// 		path : '/services/rest?api_key=' + process.env.API_KEY + '&user_id=' + process.env.USER_ID + '&format=json',
	// 		headers : {
	// 			'Content-Type' : 'application/json'
	// 		}
	// 	};

	return {
		getPhotos : function(req, res){
			var method = '&method=flickr.photosets.getPhotos',
				callback = '&nojsoncallback=1',
				page = '&page=' +  req.param('page'),
				perPage = '&per_page=100',
				photosetId = '&photoset_id=' + req.param('photosetid');

				
			console.log('params ', req.params);
			console.log("Getting results");
			// options.path = options.path + method + callback + photosetId + page + perPage;

			path = path + method + callback + photosetId + page + perPage;

			console.log("path ", path);

			var request = require('request'),
				jsonOut = "";

			request('https://' + hostname + path, function(error, response, body){

				if (error) return res.json(error);
				console.log(body);

				var data = JSON.parse(body);

				if (data.stat === 'fail') return res.json(data);

				var pages = [];
				var i = 1;
				for (i = 0; i <= (data.photoset.total / 100); ++i){
					pages.push(i + 1);
				}

				res.render('photos', {photolist : data.photoset.photo, pages : pages, host: req.get('host'), photosetId : req.param('photosetid'), currentpage : req.param('page')});
			});
		}
	}
}();

exports = module.exports = Connection;