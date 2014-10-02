/**
 * Helper for getting API
 */

var Connection = function(){
	"use strict";

	var https = require('https'),
		options = {
			hostname : 'api.flickr.com',
			method : 'GET',
			path : '/services/rest?api_key=' + process.env.API_KEY + '&user_id=' + process.env.USER_ID + '&format=json',
			headers : {
				'Content-Type' : 'application/json'
			}
		};

	return {
		getPhotos : function(req, res){
			var method = '&method=flickr.photosets.getPhotos',
				callback = '&nojsoncallback=1',
				page = '&page=' +  req.param('page'),
				perPage = '&per_page=100',
				photosetId = '&photoset_id=' + req.param('photosetid');
				

			console.log("Getting results");
			options.path = options.path + method + callback + photosetId + page + perPage;

			//options.path = options.path + '&method=flickr.people.getPublicPhotos&nojsoncallback=1' + page + perPage;


			var request = require('request'),
				jsonOut = "";


			console.log("OPTIONS" ,options);

			request('https://' + options.hostname + options.path, function(error, response, body){
				if (error) res.json(error);

				var data = JSON.parse(body);
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