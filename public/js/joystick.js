var Joystick = function() {
	
	var exports = {};

	var socket;

	// UI Helpers
	Object.prototype.show = function() {
		this.style.display = 'block';
	};
	Object.prototype.hide = function() {
		this.style.display = 'none';
	};

	// Selectors
	var $loading = document.querySelector('#loading');
	var $home = document.querySelector('#home');
	var $homeGo = document.querySelector('#home #button_go');
	var $player_id = document.querySelector('#home #player_id');
	var $session_id = document.querySelector('#home #session_id');
	var $joystick = document.querySelector('#joystick');
	var $buttons = document.querySelectorAll('#joystick div');
	var $finish = document.querySelector('#finish');

	// Sockets Methods
	var joinRoom = function(id, player) {
		socket.emit( 'joinRoom', { 
            roomId: id,
            userId: player,
            isPlayer: true,
            playerName: player
        });
	};

	var fireEvents = function( id ) {
		socket.emit('joystick', { roomId: $session_id.value, button: id });
	};

	// Events
	$homeGo.onclick = function() {
		joinRoom($session_id.value, $player_id.value);
		$home.hide();
		$loading.show();
		socket.on('gameReady', function( data ){
			$loading.hide();
			$joystick.show();
		});
		socket.on('raceFinished', function(){
			$joystick.hide();
			$finish.show();
		})
	};

	for (var i = $buttons.length - 1; i >= 0; i--) {
		$buttons[i].onclick = function() {
			fireEvents(this.getAttribute('id'));
		};
	};

	// Init
	exports.init = function() {
		$session_id.value = window.location.href.split( '/' ).pop();
		// Show home
		$home.show();
		socket = io();
	};

	return exports;
};

document.addEventListener('DOMContentLoaded', function() {
	var joy = new Joystick();
	joy.init();
});