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


			var request,
				jsonOut = "";


			console.log("OPTIONS" ,options);


			request = https.request(options, function(result){
				result.setEncoding('utf8');
				result.on('data', function(d){
					jsonOut += d;
				});
				result.on('end', function(){
					if (jsonOut.length > 0){
						try {
							var data = JSON.parse(jsonOut);
							var photos = data.photoset.photo;
							var paging = {
								page : data.photoset.page,
								perpage : data.photoset.per_page,
								total : data.photoset.total
							};
							var pages = [];
							var i = 1;
							for (i = 0; i <= (paging.total/100); ++i){
								pages.push(i + 1);
							}


							console.log("pages", pages);
							console.log("paging", paging);
							//console.log(data);
							//console.log(photos);
							res.render('photos', {photolist : photos, pages : pages, host: req.get('host'), photosetId : req.param('photosetid'), currentpage : req.param('page')});
						}
						catch (e){
							console.log(e);
							res.send('Sorry, the server encountered an error.  Please try again later ' + e);
						}
						
					}
					else {
						res.json({
							error : 'Error encountered',
							description : 'error eh'
						});
					}
				});
			}).on('error', function(e){
				console.log(e);
			}).end();
		}
	}
}();

exports = module.exports = Connection;