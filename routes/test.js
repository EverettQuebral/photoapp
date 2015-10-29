module.exports = function(app, router){
	router.get('/:state/:altpayid', function(req, res){
		res.render('test', { 
			status : req.params('state'), 
			id : req.params('altpayid') 
		});
	});


	app.use('/ideal', router);
}