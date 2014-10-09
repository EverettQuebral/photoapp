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




exports = module.exports = function(app, router){
	router.get('/:photosetid', photospage);
	router.get('/:photosetid/:page', photospage);
	router.get('/:farm/:server/:id/:secret', photo);

	app.use('/photos', router);

	//(href="/photo/#{photo.farm}/#{photo.server}/#{photo.id}/#{photo.secret}")
}