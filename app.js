var express = require('express');

var Joystick = function(app, router) {

	app.use('/joystick_public', express.static(__dirname + '/public'));

	router.get('/joystick/:sessid', function(req, res, next) {
		res.render(__dirname + '/public/index.html');
	});

}

module.exports = Joystick;