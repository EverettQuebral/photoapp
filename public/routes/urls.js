var connection = require("../connection");

photos = function(req, res){
	connection.getPhotos(req, res, 1);
};

photospage = function(req, res){
	connection.getPhotos(req, res);
}

photo = function(req, res){
	res.render('photo', {
			farm 	: req.param('farm'), 
			server 	: req.param('server'), 
			id 		: req.param('id'),
			secret 	: req.param('secret')
		});
};




exports = module.exports = function(app){
	//app.get('/', index);
	//app.get('/ug/photos/:photosetid', photos);
	//app.get('/ug/photos', photos);
	app.get('/ug/photos/:photosetid', photospage);
	app.get('/ug/photos/:photosetid/:page', photospage);
	app.get('/ug/photo/:farm/:server/:id/:secret', photo);

	//(href="/photo/#{photo.farm}/#{photo.server}/#{photo.id}/#{photo.secret}")
}