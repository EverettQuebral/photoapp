function ideal(req, res){
	res.render('test/index', {});
}

module.exports = function(app, router){
	router.get('/test', ideal);
	app.use('/ideal', router);
}