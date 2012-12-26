//= require_tree .

function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

(function($){

	// Global vars
	var waveLength = 366;
	var playedLength = 200;

	// Append each single bars to div to create full wave
	for ( var i = 0; i < waveLength; i++ ) {
		var rand = randomFromTo(40, 80);
		var mTop = 80 - rand;
		$('.wave').append('<div class="bar" style="height:' + rand + 'px; margin-top: ' + mTop + 'px"></div>');
	}

	// Added played class to bars
	for ( var p = 0; p < playedLength; p++ ) {
		$('.bar:eq(' + p + ')').addClass('played');
	}

	$('.play-btn').click(function(){
		
	});

})(jQuery);