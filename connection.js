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
	var request = require('request');
	var jsonOut = "";

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
				page = '&page=' +  req.param('page') || 1,
				perPage = '&per_page=100',
				photosetId = '&photoset_id=' + req.param('photosetid');

				
			console.log('params ', req.params);
			console.log("Getting results");
			// options.path = options.path + method + callback + photosetId + page + perPage;

			path = path + method + callback + photosetId + page + perPage;

			console.log("path ", path);

			request('https://' + hostname + path, function(error, response, body){

				if (error) return res.json(error);
				// console.log(body);

				var data = JSON.parse(body);

				if (data.stat === 'fail') return res.json(data);

				var pages = [];
				var i = 1;
				for (i = 0; i <= (data.photoset.total / 100); ++i){
					pages.push(i + 1);
				}

				if (pages.length > 1){
					pages = pages;
				}
				else {
					pages = undefined;
				}

				res.render('photos', {
					photolist : data.photoset.photo, 
					pages : pages, 
					host: req.get('host'), 
					photosetId : req.param('photosetid'), 
					currentpage : req.param('page'),
					title : "Everett's Photoset - " + data.photoset.title
				});
			});
		},

		getAlbums : function(req, res){
			var method = "&method=flickr.photosets.getList",
				callback = '&nojsoncallback=1',
				page = "&page=" + req.param(page) || 1,
				perPage = "&per_page=100";

			path = path + method + callback + page + perPage;

			console.log("path ", path);

			request('https://' + hostname + path, function(error, response, body){
				if (error) return res.json(error);

				var data = JSON.parse(body);
				if (data.stat === 'fail') return res.json(data);

				var pages = [];
				var i = 1;
				for (i = 0; i <= (data.photosets.total / 100); ++i){
					pages.push(i + 1);
				}

				if (pages.length > 1){
					pages = pages;
				}
				else {
					pages = undefined;
				}

				res.render('albums', { 
					albums : data.photosets.photoset,
					pages : pages,
					currentPage : req.param('page') || 1,
					title : "Everett's Albums"
				});
			});
		}
	}
}();

exports = module.exports = Connection;