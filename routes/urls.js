var connection = require("../connection");

photos = function(req, res){
	connection.getPhotos(req, res, 1);
};

photospage = function(req, res){
	connection.getPhotos(req, res);
}

photo = function(req, res){
	res.render('photo', {
			farm 	: req.params('farm'), 
			server 	: req.params('server'), 
			id 		: req.params('id'),
			secret 	: req.params('secret')
		});
};

albums = function(req, res){
	connection.getAlbums(req, res);
}


module.exports = function(app, router){
	router.get('/:photosetid', photospage);
	router.get('/:photosetid/:page', photospage);
	router.get('/:farm/:server/:id/:secret', photo);
	router.get('/', albums);

	app.use('/photos', router);
}